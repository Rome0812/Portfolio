// emailTemplates.js
const generateEmailTemplate = (email, subject, message) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        }

        .wrapper {
          width: 100%;
          padding: 30px 0;
        }

        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .header {
          background: linear-gradient(135deg, #000000, #333333);
          color: #ffffff;
          padding: 25px;
          text-align: center;
        }

        .header h2 {
          margin: 0;
          font-weight: 500;
        }

        .content {
          padding: 30px;
          color: #333;
          line-height: 1.6;
        }

        .info {
          margin-bottom: 20px;
        }

        .label {
          font-size: 12px;
          text-transform: uppercase;
          color: #888;
          letter-spacing: 1px;
        }

        .value {
          font-size: 15px;
          font-weight: 600;
          margin-top: 3px;
        }

        .message-box {
          background: #f8f9fb;
          border-left: 4px solid #000;
          padding: 18px;
          border-radius: 6px;
          white-space: pre-wrap;
          margin-top: 15px;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #999;
          padding: 15px;
          background: #fafafa;
          border-top: 1px solid #eee;
        }
      </style>
    </head>

    <body>
      <div class="wrapper">
        <div class="container">

          <div class="header">
            <h2>📩 New Portfolio Message</h2>
          </div>

          <div class="content">

            <div class="info">
              <div class="label">Sender Email</div>
              <div class="value">${email}</div>
            </div>

            <div class="info">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>

            <div class="label">Message</div>
            <div class="message-box">
              ${message}
            </div>

          </div>

          <div class="footer">
            Sent from Portfolio Contact Form • ${new Date().toLocaleString()}
          </div>

        </div>
      </div>
    </body>
  </html>
  `;
};

module.exports = { generateEmailTemplate };