require('dotenv').config();

const nodemailer = require('nodemailer'),
      transporter = nodemailer.createTransport({
        host:  process.env.MAILER_HOST,
        service: process.env.MAILER_SERVICE,
        port: process.env.MAILER_PORT,
        secure: process.env.MAILER_SECURE,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

exports.sendMail = (data) => {
    return new Promise((resolved, rejected) => {
        const {
            toEmail,
            subject,
            message
        } = data;

        console.log(data);

        let mailOptions = {
            from: process.env.MAILER_USER,
            to: toEmail,
            subject: subject,
            text: message
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) rejected({
                flash: `Erreur email send:${err}`
            });
            else {
                resolved({
                    flash: `email send: ${info.response}`
                });
            }
        });
    });
};