const connection = require('./common')

module.exports = {
    //获取所有评论数据
    getCommentsList(callback) {
        var sql = 'select * from comments'
        connection.query(sql, (err, results) => {
            if (err) return callback(err)

            callback(null, results)
        })
    }
}