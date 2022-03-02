export interface VerificationResponse {
  success: 'true' | 'false';
  score: number;
  action: string;
  // eslint-disable-next-line camelcase
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}
