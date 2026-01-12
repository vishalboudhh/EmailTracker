import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve("E:/JobMailer/server/.env") });

// Import transporter after dotenv has loaded env vars to avoid ESM hoisting issues
const transporter = (await import("./nodemailer.js")).default;

async function test() {
  try {
    console.log("EMAIL_USER =", process.env.EMAIL_USER);
    console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

    await transporter.sendMail({ 
      from: process.env.EMAIL_USER,
      to: "vishalboudhh@gmail.com",
      subject: "Test Email",
      text: "Hello World!",
    });
    console.log("Email sent!");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

test();
