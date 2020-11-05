import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';

export async function verify(
  req: functions.https.Request,
  res: functions.Response<unknown>
): Promise<void> {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');

  const secret = functions.config().recaptcha.server;
  const token = req.query.token;

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  const response = await fetch(url, { method: 'POST' });
  const verification = await response.json();

  res.status(200).send(verification);
}
