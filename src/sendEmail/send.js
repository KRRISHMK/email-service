var nodemailer = require("nodemailer");
export default async ( req, res, next) => {
    console.log(req)
    let fromEmail = req.body.fromEmail;
    let toEmail = req.body.toEmail;
    let message = req.body.message;
    let subject = req.body.subject;
  
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muthukrrish333@gmail.com",
        pass: "txexqyxljuhhifyo",
      },
    });
  
    var mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send("Done");
}