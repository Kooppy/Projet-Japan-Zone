exports.selectID = (params, table, value) => {
    return new Promise(async (resolved, rejected) => {
        try {
            const userID = await db.query(`SELECT ${params} FROM ${table} WHERE ${params}= '${value}'`);
            resolved(userID[0]);
        } catch (err) {
            rejected(err);
        }   
    });
};