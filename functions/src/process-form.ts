import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ContactMessage } from './models/contact-message';

admin.initializeApp();

/**
 * Processes a contact form submission
 * @param {functions.https.Request } request http request
 * @param {functions.Response<unknown> } response http response
 */
export async function processFormSubmission(
  request: functions.https.Request,
  response: functions.Response<unknown>
): Promise<void> {
  // Quick check to see if contactName is in body
  if (request.body.contactName !== undefined) {
    try {
      // Set the POST body as a  new document in the messages collection
      await addMessage(request.body as ContactMessage);

      // Send success status
      response.status(200).send('Okay');
    } catch (error) {
      // If this db action wasn't successful, send an error response
      response.status(500).send({ error: error });
    }
  } else {
    // If the POST body didn't include a contactName, send an error response
    response.status(400).send('Missing form inputs');
  }
}

/**
 * Adds the contact message as a new document
 * in the messages collection
 * @param {ContactMessage} message the contact message to add
 */
async function addMessage(message: ContactMessage): Promise<void> {
  const today = new Date().toISOString();

  // Add the contact message as a new document in the messages collection
  await admin
    .firestore()
    .collection('messages')
    .add({
      ...message,
      submitted: today,
    });
}
