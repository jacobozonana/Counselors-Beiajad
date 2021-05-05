const sgMail = require("@sendgrid/mail");

module.exports = {
  sendmail: async (email, subject, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "BeiajadCounselors@gmail.com",
      subject: subject,
      html: text,
    };
    try {
      await sgMail.send(msg);
      // console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  },
  sendfuturemail: async (future, email, subject, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      send_at: future,
      from: "BeiajadCounselors@gmail.com",
      subject: subject,
      html: text,
    };
    try {
      await sgMail.send(msg);
      // console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  },
  sendreport: async (req, res) => {
    const { email, attachment } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const n = Date.now();
    const future = Math.floor(Date.now() / 1000) + 60 * 1;
    const msg = {
      to: email,
      send_at: future,
      from: "BeiajadCounselors@gmail.com",
      subject: "Reporte",
      attachments: [
        {
          content: attachment,
          filename: "Reporte.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
      html: ` 
      <!DOCTYPE html>
        <html>
          <head>
            <style>
              h1 {
                  text-align: center;
                 }
              .img-container {
                              display: block;
                              margin-left: auto;
                              margin-right: auto;
                              height: 90px;
                              width: auto;
                              border-radius: 30%;
                             }
            </style>
          </head>
          <body>
            <img class="img-container" alt="Logo" src="http://drive.google.com/uc?export=view&id=1ZStbt9J-8SQhcCB71hT744TO5PRLb1Mt" />              
            <h1>Hola, adjuntamos tu reporte</h1>
          </body>
        </html>
      `,
    };
    try {
      await sgMail.send(msg);
      // console.log("Email sent");
      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },
};
