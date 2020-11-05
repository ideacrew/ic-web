import { MailDataRequired, send, setApiKey } from '@sendgrid/mail';
import * as functions from 'firebase-functions';

interface ContactMessage {
  company: string;
  contactName: string;
  email: string;
  message: string;
  submitted: string;
  sent?: boolean;
}

export async function sendEmail(
  snapshot: functions.firestore.QueryDocumentSnapshot
): Promise<FirebaseFirestore.WriteResult | void> {
  setApiKey(functions.config().sendgrid.key);

  const {
    contactName,
    company,
    email,
    message,
  } = snapshot.data() as ContactMessage;

  console.log(contactName, company, email, message);

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

  try {
    await send(mailData);
    return snapshot.ref.update({ sent: true });
  } catch (e) {
    console.error('Unable to send email');
    return Promise.resolve();
  }
}
