/*
 * Controller: Messagery (Messagery)
 * ************************ */

const { pagination } = require('../util/pagination'),
      { sendMail } =require('../util/nodemailer');

exports.messagery = async (req, res) => {
    let pagiMessagery = await pagination({
        numItem: 10,
        page: req.query.messagery,
        table: 'messagery'
    });

    console.log(pagiMessagery);
    
    try {
        const messagery = await db.query(`SELECT * FROM messagery ORDER BY num_messagery DESC LIMIT ${pagiMessagery.limit};`);
        
        res.render('messagery', {
            layout: 'adminLayout',
            messagery,
            paginate: pagiMessagery.page
        });
    } catch (err) {
        throw err;
    }
}

exports.sendEmail = async (req, res) => {

    const { name, email, subject, message } = req.body;

    console.log(email);

    try {
        let result = await sendMail({toEmail: email, subject, message: `${message} Cordialement, ${name}`, validate: 'Email, envoyer'});

        // res.render('messagery', {flash: result.flash});
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}

exports.deleteMessage = async (req, res) => {

    const { id } = req.params;
    
    try {
        const deleteMessage = await db.query('DELETE FROM messagery WHERE num_messagery= :id;', {id});
        
        res.redirect('back');
    } catch (err) {
        throw err;
    }
}