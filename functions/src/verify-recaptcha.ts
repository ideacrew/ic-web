import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { VerificationResponse } from './models';

/**
 *
 * @param {functions.https.Request} request http request
 * @param {functions.Response<unknown>} response http response
 */
export async function verify(
  request: functions.https.Request,
  response: functions.Response<unknown>
): Promise<void> {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET');

  // ReCaptcha Server-side Secret
  const secret = functions.config().recaptcha.server;

  // Client-side token passed via POST body
  const token = request.query.token;

  // ReCaptcha Verification
  const verificationResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: 'POST' }
  );
  const verification: VerificationResponse =
    (await verificationResponse.json()) as VerificationResponse;

  // Send verification in response to POST
  response.status(200).send(verification);
}
