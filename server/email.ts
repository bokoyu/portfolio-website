import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

let resendClient: Resend | null = null;

function getResendClient() {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY must be set to send contact form submissions via Resend.",
    );
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

export async function sendContactEmail(payload: ContactPayload) {
  const resend = getResendClient();

  const toAddress = process.env.CONTACT_TO_EMAIL;
  if (!toAddress) {
    throw new Error(
      "CONTACT_TO_EMAIL must be set to receive contact form submissions.",
    );
  }

  const fromAddress =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "[Portfolio]";

  await resend.emails.send({
    from: fromAddress,
    to: [toAddress],
    replyTo: payload.email,
    subject: `${subjectPrefix} ${payload.subject}`,
    text: `Name: ${payload.name}
Email: ${payload.email}

${payload.message}`,
    html: `
      <div>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <hr />
        <p>${payload.message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });
}

