module.exports = {
    pagination: (data) => {
        return new Promise(async (resolve, reject) => {
            let {
                numItem,
                page,
                table
            } = data;

            page = parseInt(page, 10) || 1;

            let limit = ((page - 1) * numItem) + ',' + numItem;

            try {
                const numRows = await db.query(`SELECT count(*) as num FROM ${table};`);

                let numPages = Math.ceil(numRows[0].num / numItem);

                resolve({
                    limit: limit,
                    page: {
                        current: page,
                        previous: page > 0 ? page - 1 : undefined,
                        next: page < numPages ? page + 1 : undefined,
                        total: numPages
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}