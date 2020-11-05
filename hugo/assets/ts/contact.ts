interface VerificationResponse {
  success: 'true' | 'false';
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let grecaptcha: any;

// Element Selectors
const submitButton: HTMLButtonElement = document.querySelector(
  '.submit-button'
);

// Attach function to click event
submitButton.addEventListener('click', submitForm, false);

async function submitForm(): Promise<void> {
  const contactName: string = (document.getElementById(
    'contact-name'
  ) as HTMLInputElement).value;
  const email: string = (document.getElementById(
    'contact-email'
  ) as HTMLInputElement).value;
  const company: string = (document.getElementById(
    'contact-company'
  ) as HTMLInputElement).value;
  const message: string = (document.getElementById(
    'contact-message'
  ) as HTMLTextAreaElement).value;

  if (contactName !== '' && company !== '' && email !== '' && message !== '') {
    const data = { contactName, email, company, message };
    const url = '/contact-form-submission';

    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error('This request could not be completed');
    }

    location.href = '/thank-you';
  }
}

async function checkRecaptcha(token: string): Promise<VerificationResponse> {
  const response = await fetch(`/verify-captcha?token=${token}`);
  const body = await response.json();

  return body as VerificationResponse;
}

grecaptcha.ready(async () => {
  const token: string = await grecaptcha.execute(
    '6LezZ98ZAAAAAP9dauh0WuNerMeRvRzhuP83rbL6',
    {
      action: 'contact',
    }
  );

  const { success, score, hostname } = await checkRecaptcha(token);

  if ((success && score > 0.5) || hostname === 'localhost') {
    submitButton.removeAttribute('disabled');
  }
});
