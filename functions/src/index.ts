import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { sendEmail } from './sendEmail';
import { verify } from './verifyRecaptcha';

export const verifyRecaptcha = functions.https.onRequest(verify);

export const sendContactMessage = functions.firestore
  .document('messages/{messageId}')
  .onCreate(sendEmail);

export const processFormSubmission = functions.https.onRequest(
  async (req: functions.https.Request, res: functions.Response<unknown>) => {
    if (req.body.contactName !== undefined) {
      try {
        const today = new Date().toISOString();

        await admin
          .firestore()
          .collection('messages')
          .add({
            ...req.body,
            submitted: today,
          });

        res.status(200).send('Okay');
      } catch (e) {
        res.status(500).send({ error: e });
      }
    } else {
      res.status(400).send('Missing form inputs');
    }
  }
);
