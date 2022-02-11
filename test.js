// const crypto = require('crypto')

// let password = '123456789'
// //let key = crypto.scryptSync(password, 'tuto', 24);
// let key = crypto.randomBytes(32);
// console.log("ouiouioui",key);
// let iv = crypto.randomBytes(16);

// console.log("ouiouioui", iv);
// let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
// let crypted = cipher.update('bonjour', 'utf8', 'hex')
// crypted += cipher.final('hex')
// console.log("encrypt :", crypted);

// let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
// let dec = decipher.update(crypted, 'hex', 'utf8')
// dec += decipher.final('utf8')
// console.log("decrypt :", dec);

    // let blog = {}

    // fakeDB_blog.forEach(bl => {
    //     if (bl.title === req.params.id) {
    //         console.log("test ",bl);
            
    //         blog = bl
    //         console.log("test2 ",!blog);
    //     }
    // })

    // if (!blog.id) {
    //     res.redirect('/')
    // } else {
    //     res.render('item1', {blog})
    //     console.log("test 3", !blog);
    // }

//     module.exports = {
//         pagination: (data) => {
//             return new Promise(async (resolve, reject) => {
//                 let {
//                     numItem,
//                     page,
//                     table
//                 } = data;
    
//                 page = parseInt(page, 10) || 1;
    
//                 let limit = ((page - 1) * numItem) + ',' + numItem;
    
//                 try {
    
//                     const numRows = await db.query(`SELECT count(*) as num FROM ${table};`);
    
//                     let numPages = Math.ceil(numRows[0].num / numItem);
    
//                     resolve({
//                         limit: limit,
//                         page: {
//                             current: page,
//                             previous: page > 0 ? page - 1 : undefined,
//                             next: page < numPages ? page + 1 : undefined,
//                             total: numPages
//                         }
//                     })
//                 } catch (err) {
//                     reject(err)
//                 }
//             })
//         }
//     }




//     const userID = await db.query(`SELECT ${params} FROM ${table} WHERE ${params}= '${value}'`, (err, result) => {
//         if(err) rejected(err);
//         console.log("regregegreegergge", result[0]);
//         resolved(result[0]);
//     });



// const { validationResult, ValidationChain } = require('express-validator');

// exports.validate = (validations) => {
//     return async (req, res, next) => {
//       await Promise.all(validations.map(validation => validation.run(req)));
  
//       const errors = validationResult(req);
//       if (errors.isEmpty()) {
//         return next();
//       }
  
//       res.status(400).json({ errors: errors.array() });
//     };
//   };











// exports.loginUser = async (req, res) => {
//     const {pseudo, password} = req.body;
    
//     try {
//         const user = await db.query(`SELECT password FROM user WHERE (pseudo= '${ pseudo }' OR email= '${ pseudo }');`);

//         if(user[0] && hash(password) === user[0].password) {
//             const user_connect = await db.query(`SELECT user.num_user, user.email, user.pseudo, pictureBank.link_picture, user_role.isVerify, user_role.isAdmin, user_role.isBan FROM user INNER JOIN pictureBank ON pictureBank.num_user = user.num_user INNER JOIN user_role ON user_role.num_user = user.num_user WHERE (pseudo= '${ pseudo }' OR email= '${ pseudo }');`);
//             const session_kill = await db.query(`DELETE FROM sessions WHERE data LIKE '%"id":${user_connect[0].num_user}%';`);
//             req.session.user = {id: user_connect[0].num_user, email: user_connect[0].email, avatar: user_connect[0].link_picture, pseudo: user_connect[0].pseudo, isVerify: user_connect[0].isVerify, isAdmin: user_connect[0].isAdmin};
            
//             res.redirect('back');
//         } else {
//             res.render('index', { error: "votre pseudo / email ou votre mot de passe est faux" })
//         }
//     } catch (err) {
//         throw err;
//     }
// }



// case 'login':
//     return [check('pseudo').custom((async (value, { req } ) => {
//             const user = await selectID('password', 'user', `pseudo= '${ value }' OR email= '${ value }'`);
//             if ( !user || user.password !== hash(req.body.password) ) {
//                 throw new Error('Erreur de connexion login ou mot de passe faux !');
//             }
//             return true;
//         }))];

// case 'login':
//     return [check('pseudo').custom((async (value, { req } ) => {
//             const user = await db.query(`SELECT password FROM user WHERE pseudo= :value OR email= :value;`, {value});
//             if ( !user[0] || user[0].password !== hash(req.body.password) ) {
//                 throw new Error('Erreur de connexion login ou mot de passe faux !');
//             }
//             return true;
//         }))];


// const nodemailer = require('nodemailer'),
//       transporter = nodemailer.createTransport ({
//         host: 'smtp.gmail.com',
//         service: 'gmail',
//         port: 587,
//         secure: false,
//         auth: {
//             user: 'kooppy.op@gmail.com',
//             pass: 'geoqbjteudxikqod'
//         }
//       });

// exports.sendMail = (req, res) => {

//     let mailOptions = {
//         from: req.body.email,
//         to: 'kooppy.op@gmail.com',
//         subject: req.body.subject,
//         text: req.body.message +' '+ req.body.email
//     }

//     transporter.sendMail(mailOptions, function(err, info) {
//         if (err) console.log('Erreur email send: ', err);
//         else {
//             console.log('email send: ', + info.response);
//         }
//         res.redirect('back');
//     });
// }