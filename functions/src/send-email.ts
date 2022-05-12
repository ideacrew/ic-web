import sgMail, { MailDataRequired } from '@sendgrid/mail';
import * as functions from 'firebase-functions';

import { ContactMessage } from './models';

/**
 * Sends an Email using SendGrid
 * @param {functions.firestore.QueryDocumentSnapshot} snapshot a document snapshot
 * @return { Promise<FirebaseFirestore.WriteResult | void> }  a write result or void
 */
export async function sendEmail(
  snapshot: functions.firestore.QueryDocumentSnapshot
): Promise<FirebaseFirestore.WriteResult | void> {
  const apiKey: string = functions.config().sendgrid.key;

  sgMail.setApiKey(apiKey);

  // Prepare email for sending
  const mailData = prepareEmail(snapshot.data() as ContactMessage);

  let sent = false;

  try {
    functions.logger.info('Sending mail', { mailData });
    // Send email
    await sgMail.send(mailData);

    // If successful, update the sent flag
    sent = true;
  } catch (error) {
    // Database write failed?
    functions.logger.error('Unable to send email', {
      error,
    });
    return;
  }

  // Update message to reflect status
  return snapshot.ref.update({ sent });
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
