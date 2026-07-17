import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendVerificationEmailProps {
  email: string;
  token: string;
  name: string;
}

export async function sendVerificationEmail({
  email,
  token,
  name,
}: SendVerificationEmailProps) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Ratnawad" <${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <div>
        <h2>Hello ${name},</h2>

        <p>
          Thank you for registering.
        </p>

        <p>
          Please click the button below to verify your email.
        </p>

        <a
          href="${verifyUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:black;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>
          This link will expire in 10 minutes.
        </p>
      </div>
    `,
  });
}