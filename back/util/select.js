exports.selectID = (params, table, condition, value, test) => {
    return new Promise(async (resolved, rejected) => {
        try {
            const selectID = await db.query(`SELECT ${params} FROM ${table} WHERE ${condition}`, {value});

            resolved(selectID[0])
        } catch (err) {
            rejected(err);
        }   
    });
};