const crypto = require('crypto');

module.exports = {
    hash: (data) => {

        let hash = crypto.createHash('sha256');
        try {
            hash.update(data);

            return hash.digest('hex');
        } catch (err) {
            return err;
        }
    }
}