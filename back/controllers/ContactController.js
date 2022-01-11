const nodemailer = require('nodemailer'),
      transporter = nodemailer.createTransport ({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'kooppy.op@gmail.com',
            pass: 'geoqbjteudxikqod'
        }
      });

exports.sendMail = (req, res) => {

    let mailOptions = {
        from: req.body.email,
        to: 'kooppy.op@gmail.com',
        subject: req.body.subject,
        text: req.body.message +' '+ req.body.email
    }

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log('Erreur email send: ', err);
        else {
            console.log('email send: ', + info.response);
        }
        res.redirect('back');
    });
}