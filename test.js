const crypto = require('crypto')

let password = '123456789'
//let key = crypto.scryptSync(password, 'tuto', 24);
let key = crypto.randomBytes(32);
console.log("ouiouioui",key);
let iv = crypto.randomBytes(16);

console.log("ouiouioui", iv);
let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
let crypted = cipher.update('bonjour', 'utf8', 'hex')
crypted += cipher.final('hex')
console.log("encrypt :", crypted);

let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
let dec = decipher.update(crypted, 'hex', 'utf8')
dec += decipher.final('utf8')
console.log("decrypt :", dec);

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