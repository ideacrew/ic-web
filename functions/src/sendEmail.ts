import { MailDataRequired, send, setApiKey } from '@sendgrid/mail';
import * as functions from 'firebase-functions';

import { ContactMessage } from './contactMessage';

export async function sendEmail(
  snapshot: functions.firestore.QueryDocumentSnapshot
): Promise<FirebaseFirestore.WriteResult | void> {
  // Sets the SendGrid API key, accessed from cloud functions secret store
  setApiKey(functions.config().sendgrid.key);

  const mailData = prepareEmail(snapshot.data() as ContactMessage);

  try {
    await send(mailData);
    return snapshot.ref.update({ sent: true });
  } catch (e) {
    console.error('Unable to send email');
    return Promise.resolve();
  }
}

function prepareEmail(contactMessage: ContactMessage): MailDataRequired {
  const { contactName, company, email, message } = contactMessage;

  const mailData: MailDataRequired = {
    to: 'mark.goho@ideacrew.com',
    // cc: "mark.goho@ideacrew.com",
    from: email,
    subject: 'Contact Form Submission',
    html: `<div>Name: ${contactName}</div>
    <div>Company: ${company}</div>
    <div>Email: ${email}</div>
    <p>${message}</p>`,
  };

  return mailData;
}
