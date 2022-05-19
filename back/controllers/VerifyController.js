/*
 * Controller: Verify (Verify)
 * ************************ */


exports.verifyUpdate = async (req, res) => {

    try {

        const updateVerify = await db.query(`UPDATE user_role SET isVerify= true WHERE num_user= :id;`, {
            id: req.session.verify.mangue
        })

        req.session.verify.mangue= '';

        req.session.msg = 'Votre compte est bien vérifier.';

        res.redirect('/');
    } catch (err) {
        throw err;
    }
}

