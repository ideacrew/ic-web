import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';
import { VerificationResponse } from './models';

/**
 *
 * @param {functions.https.Request} req http request
 * @param {functions.Response<unknown>} res http response
 */
export async function verify(
  req: functions.https.Request,
  res: functions.Response<unknown>
): Promise<void> {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');

  // ReCaptcha Server-side Secret
  const secret = functions.config().recaptcha.server;

  // Client-side token passed via POST body
  const token = req.query.token;

  // ReCaptcha Verification
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: 'POST' }
  );
  const verification: VerificationResponse = (await response.json()) as VerificationResponse;

  // Send verification in response to POST
  res.status(200).send(verification);
}
