/*
 * Controller: Index (Home)
 * ************************ */

exports.home = async (req, res) => {

    const flash = req.session.reg_error;
    const backURL = req.session.backURL;
    const message = req.session.msg;

    req.session.backURL = '';
    req.session.reg_error = '';
    req.session.msg = '';
    
    try {
        const blog = await db.query(`SELECT blog.title, blog.description, blog.contents, blog.date, pictureBank.link_picture, category.name
                                     FROM blog 
                                     INNER JOIN user ON user.num_user = blog.num_user
                                     INNER JOIN pictureBank ON pictureBank.link_picture LIKE '%blog%' AND pictureBank.num_blog = blog.num_blog
                                     INNER JOIN category ON category.num_blog = blog.num_blog
                                     ORDER BY blog.num_blog DESC;`);

        const gallery = await db.query(`SELECT pictureBank.link_picture, pictureBank.title_picture, pictureBank.description_picture, category.name
                                        FROM pictureBank
                                        INNER JOIN category ON category.num_picture = pictureBank.num_picture
                                        WHERE pictureBank.link_picture LIKE '%gallery%'
                                        ORDER BY pictureBank.num_picture DESC
                                        LIMIT 4;`);
        
        switch (backURL) {
            case '/login':
                res.render('index', {namePage: 'Home', blog, gallery, modalLogin: flash});
                break;

            case '/register':
                res.render('index', {namePage: 'Home', blog, gallery, modalRegister: flash});
                break;
            
            case '/forgot':
                res.render('index', {namePage: 'Home', blog, gallery, modalForgot: flash});
                break;

            case '/contact':
                console.log('contact');
                res.render('index', {namePage: 'Home', blog, gallery, contact: flash});
                break;
        
            default:
                res.render('index', {namePage: 'Home', blog, gallery, message});
                break;
        }

    } catch (err) {
        throw err;
    }   
}