import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      "SMTP configuration is incomplete. Ensure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD are set.",
    );
  }

  const port = Number(SMTP_PORT);
  const secure = port === 465;

  const transportOptions: SMTPTransport.Options = {
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: secure
      ? undefined
      : {
          // When using STARTTLS - validate certificate
          servername: SMTP_HOST,
        },
  };

  transporter = nodemailer.createTransport(transportOptions);

  return transporter;
}

export async function sendContactEmail(payload: ContactPayload) {
  const transporterInstance = getTransporter();

  const toAddress = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;

  if (!toAddress) {
    throw new Error(
      "CONTACT_TO_EMAIL must be set to receive contact form submissions.",
    );
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

  if (!fromAddress) {
    throw new Error(
      "CONTACT_FROM_EMAIL or SMTP_USER must be set to send contact form submissions.",
    );
  }

  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "[Portfolio]";

  await transporterInstance.sendMail({
    from: fromAddress,
    to: toAddress,
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

