const nodemailer = require('nodemailer');

exports.sendMail = (req, res) => {

    let test = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };

    console.log("Test 1 : ", test)
    
    let testAccount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport ({
        service: 'gmail',

        auth: {
            user: 'kooppy.op@gmail.com',
            pass: 'geoqbjteudxikqod'
        }
    });

    console.log('test 3 : ', req.body.email);

    let mailOptions = {
        from: req.body.email,
        to: 'kooppy.op@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    }

    console.log('test 4 : ', mailOptions);

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log('Erreur email send: ', err);
        else console.log('email send: ', + info.response);
    });

    res.redirect('back');

}