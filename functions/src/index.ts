import * as functions from 'firebase-functions';

export const verifyRecaptcha = functions.https.onRequest(
  async (request, response): Promise<void> => {
    await (await import('./verifyRecaptcha')).verify(request, response);
  }
);

export const sendContactMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(
    async (snapshot): Promise<void> => {
      await (await import('./sendEmail')).sendEmail(snapshot);
    }
  );

export const processFormSubmission = functions.https.onRequest(
  async (request, response): Promise<void> => {
    await (await import('./processForm')).processFormSubmission(
      request,
      response
    );
  }
);
