const sgMail = require("@sendgrid/mail");

module.exports = {
  sendmail: (recipient, subject, text) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: recipient,
      from: "beiajadcounselors@gmail.com",
      subject: subject,
      text: text,
      html: text,
    };
    sgMail.send(msg);
    try {
      // console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  },
};
