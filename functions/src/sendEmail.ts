import { MailDataRequired, send, setApiKey } from '@sendgrid/mail';
import * as functions from 'firebase-functions';

import { ContactMessage } from './contactMessage';

/**
 * Sends an Email using SendGrid
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot a document snapshot
 * @return { Promise<FirebaseFirestore.WriteResult | void> }  a write result or void
 */
export async function sendEmail(
  snapshot: functions.firestore.QueryDocumentSnapshot
): Promise<FirebaseFirestore.WriteResult | void> {
  // Sets the SendGrid API key, accessed from cloud functions secret store
  setApiKey(functions.config().sendgrid.key);

  // Prepare email for sending
  const mailData = prepareEmail(snapshot.data() as ContactMessage);

  try {
    // Send email
    await send(mailData);

    // Update message to reflect message was sent
    return snapshot.ref.update({ sent: true });
  } catch (e) {
    // Database write failed?
    console.error('Unable to send email');
    return Promise.resolve();
  }
}

/**
 * Prepares a contact message for emailing
 * @param {ContactMessage} contactMessage The contact message
 * @return {MailDataRequired} an object that can be used with SendGrid
 */
function prepareEmail(contactMessage: ContactMessage): MailDataRequired {
  const { contactName, company, email, message } = contactMessage;

  const mailData: MailDataRequired = {
    to: 'info@ideacrew.com',
    from: email,
    subject: 'Contact Form Submission',
    html: `<div>Name: ${contactName}</div>
    <div>Company: ${company}</div>
    <div>Email: ${email}</div>
    <p>${message}</p>`,
  };

  return mailData;
}
