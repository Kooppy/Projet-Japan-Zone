/*
 * Controller: Contact (Send)
 * ************************ */


exports.sendMessage = async (req, res) => {

    const { name, email, subject, message } = req.body;

    try {

        const send = await db.query('INSERT INTO messagery SET name= :name, email= :email, subject= :subject, message= :message, date= NOW();', {name, email, subject, message})
  
        res.redirect('back') 
    } catch (err) {
        throw err;
    }
}