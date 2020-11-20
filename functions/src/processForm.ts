import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ContactMessage } from './contactMessage';

admin.initializeApp();

/**
 * Processes a contact form submission
 * @param req http request
 * @param res http response
 */
export async function processFormSubmission(
  req: functions.https.Request,
  res: functions.Response<unknown>
): Promise<void> {
  // Quick check to see if contactName is in body
  if (req.body.contactName !== undefined) {
    try {
      // Set the POST body as a  new document in the messages collection
      await addMessage(req.body as ContactMessage);

      // Send success status
      res.status(200).send('Okay');
    } catch (e) {
      // If this db action wasn't successful, send an error response
      res.status(500).send({ error: e });
    }
  } else {
    // If the POST body didn't include a contactName, send an error response
    res.status(400).send('Missing form inputs');
  }
}

/**
 * Adds the contact message as a new document
 * in the messages collection
 * @param message the contact message to add
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
