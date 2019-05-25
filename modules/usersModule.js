var conn = require('./common')

conn.connect()

module.exports = {
    getUserByEmail(email, callback) {
        var sql = 'select * from users where email=?'
        conn.query(sql, [email], (err, results) => {
            // console.log(results);
            if (err) return callback(err)
            callback(null, results[0])
        })
    }
}