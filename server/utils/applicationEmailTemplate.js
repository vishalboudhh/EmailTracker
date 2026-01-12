export const applicationEmailTemplate = ({
  name,
  jobProfile,
  companyName,
  resumeLink,
  portfolioLink,
  email,
  phone,
  location,
  notes,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f3f4f6;
  font-family: Arial, sans-serif;
">

  <!-- Full width wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center">

        <!-- Main container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="
          max-width: 720px;
          background-color: #ffffff;
          border-left: 6px solid #2563eb;
        ">

          <!-- Header -->
          <tr>
            <td style="
              padding: 16px 20px;
              background: linear-gradient(135deg, #2563eb, #1e40af);
              color: #ffffff;
            ">
              <div style="
                font-size: 18px;
                font-weight: 600;
                line-height: 1.2;
                white-space: nowrap;
              ">
               Application for ${jobProfile} 
              </div>

              <div style="
                font-size: 13px;
                opacity: 0.9;
                margin-top: 4px;
              ">
                Company name - ${companyName}
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 18px 20px; color: #111827; font-size: 14px; line-height: 1.6;">

              <p style="margin: 0 0 10px;">Dear Hiring Team,</p>

              <p style="margin: 0 0 10px;">
                I’m <strong>${name}</strong>, writing to apply for the
                <strong>${jobProfile}</strong> role at <strong>${companyName}</strong>.
              </p>

              <p style="margin: 0 0 10px;">
                I am a <strong>B.Tech (CSE)</strong> graduate with hands-on experience in
                <strong>MongoDB, Express.js, React.js, and Node.js</strong>.
                I’ve worked on authentication systems, REST APIs, CRUD operations,
                and responsive UIs using <strong>React & Tailwind CSS</strong>.
              </p>

              <p style="margin: 0 0 10px;">
                I enjoy building scalable web applications and would love to contribute
                to your development team.
              </p>

              ${notes ? `<p style="margin: 0 0 10px;"><strong>Additional Notes:</strong><br/>${notes}</p>` : ''}

              <p style="margin: 0 0 16px;">
                Thank you for your time and consideration.
              </p>

              <p style="margin: 0;">
                Regards,<br/>
                <strong>${name}</strong>
              </p>

              <!-- Divider -->
              <div style="
                height: 1px;
                background-color: #e5e7eb;
                margin: 16px 0;
              "></div>

              <!-- Contact -->
              <p style="margin: 0 0 4px;"><strong>Contact Details</strong></p>
              <p style="margin: 0 0 4px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 4px;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 0 0 8px;"><strong>Location:</strong> ${location}</p>

              <!-- Buttons -->
              <a href="${resumeLink}" target="_blank" style="
                display: inline-block;
                padding: 8px 14px;
                background-color: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                font-size: 13px;
                margin-right: 8px;
              ">
                Resume
              </a>

              <a href="${portfolioLink}" target="_blank" style="
                display: inline-block;
                padding: 8px 14px;
                background-color: #ffffff;
                color: #2563eb;
                text-decoration: none;
                border-radius: 4px;
                font-size: 13px;
                border: 1px solid #2563eb;
              ">
                Portfolio
              </a>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
