const nodemailer = require('nodemailer');

exports.sendMail = (req, res) => {
    
    let testAccount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport ({
        service: 'gmail',

        auth: {
            user: testAccount.user,
            password: testAccount.pass
        }
    });

    let mailOptions = {
        from: req.body.email,
        to: '',
        subject: req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log('Erreur email send: ', error);
        else console.log('email send: ', +info.response);
    });

    let test = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };

    console.log("Test 1: ", test);
}