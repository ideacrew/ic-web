import * as functions from 'firebase-functions';

export const verifyRecaptcha = functions.https.onRequest(
  async (request, response): Promise<void> => {
    const { verify } = await import('./verify-recaptcha');
    await verify(request, response);
  }
);

export const sendContactMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snapshot): Promise<void> => {
    const { sendEmail } = await import('./send-email');
    await sendEmail(snapshot);
  });

export const processFormSubmission = functions.https.onRequest(
  async (request, response): Promise<void> => {
    const { processFormSubmission } = await import('./process-form');
    await processFormSubmission(request, response);
  }
);
