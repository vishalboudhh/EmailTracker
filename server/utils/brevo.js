import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async ({ to, subject, html }) => {
  const api = new SibApiV3Sdk.TransactionalEmailsApi();

  await api.sendTransacEmail({
    sender: { email: process.env.MAIL_FROM },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};
