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