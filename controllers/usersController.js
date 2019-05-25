//引入用户模块
const usersModule = require('../modules/usersModule')

module.exports = {
    login(req, res) {
        var obj = req.body
        usersModule.getUserByEmail(obj.email, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '服务器链接超时，请重试'
            })

            if (data) {
                if (data.password == obj.password) {
                    //记录登录的状态
                    req.session.isLogin = 'true';
                    req.session.currentUser = data;
                    // console.log(req.session);

                    res.json({
                        code: 0,
                        des: '登录成功'
                    })
                } else {
                    res.json({
                        code: 1,
                        des: '密码错误，请重新输入'
                    })
                }
            } else {
                res.json({
                    code: 1,
                    des: '邮箱错误，请重新输入'
                })
            }

        })

    }
}