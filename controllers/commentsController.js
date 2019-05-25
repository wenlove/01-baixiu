const commentsModule = require('../modules/commentsModule')

module.exports = {
    //获取所有评论数据
    getCommentsList(req, res) {
        commentsModule.getCommentsList((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            })
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    }
}