import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export async function processFormSubmission(
  req: functions.https.Request,
  res: functions.Response<unknown>
): Promise<void> {
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
