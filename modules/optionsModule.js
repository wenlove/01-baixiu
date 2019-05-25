var connection = require('./common')


module.exports = {
    //获取所有导航数据
    getMenusList(callback) {
        this.getData(9, callback)
    },
    //获取轮播图数据
    getSliderList(callback) {
        this.getData(10, callback)
    },
    //获取最新评论
    getCommentsList(callback) {
        var sql = `select comments.id,comments.author,comments.created,comments.content,posts.feature
                from comments 
                inner join posts on comments.post_id = posts.id 
                order by comments.created desc`
            // var sql = 'select * from comments order by created desc'
        connection.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null, results)
        })
    },
    //添加单条导航数据
    addMenu(obj, callback) {
        var sql = 'select value from options where id = 9'
        connection.query(sql, (err, results) => {
            if (err) return callback(err)

            var menus;
            //判断results是否为空
            if (results[0]) {
                menus = JSON.parse(results[0].value || '[]')
            } else {
                menus = []
            }

            //将添加的数据追加到数组中
            menus.push(obj)

            //将数组转换成json字符串
            var str = JSON.stringify(menus)

            //将数据更新回数据库
            sql = `update options set value = '${str}' where id =9 `
            connection.query(sql, (err) => {
                if (err) return callback(err)
                callback(null)
            })
        })
    },
    //删除单条导航数据
    delMenuByIndex(obj, callback) {
        var sql = 'select value from options where id = 9'
        connection.query(sql, (err, results) => {
            if (err) return callback(err)

            var menus;
            //判断results是否为空
            if (results[0]) {
                menus = JSON.parse(results[0].value || '[]')
            } else {
                menus = []
            }

            //filter遍历数组过滤要删除的数据
            var arr = menus.filter((item, index) => {
                if (!(index == obj.index)) {
                    return true;
                }
            })

            // console.log(arr);

            //将数组转换成json字符串
            var str = JSON.stringify(arr)

            //将数据更新回数据库
            sql = `update options set value = '${str}' where id =9 `
            connection.query(sql, (err) => {
                if (err) return callback(err)
                callback(null)
            })
        })
    },
    delsMenusByIndex(arr, callback) {
        var sql = 'select value from options where id = 9'
        connection.query(sql, (err, results) => {
            if (err) return callback(err)

            var menus;
            //判断results是否为空
            if (results[0]) {
                menus = JSON.parse(results[0].value || '[]')
            } else {
                menus = []
            }


            // console.log(arr.length);
            // //filter遍历数组过滤要删除的数据
            for (var i = arr.length - 1; i >= 0; i--) {
                var newArr = menus.filter((item, index) => {
                    // console.log(index != arr[i]);
                    if (index != arr[i]) {
                        return true
                    }
                })
                menus = newArr
            }
            // console.log(newArr);

            //将数组转换成json字符串
            var str = JSON.stringify(newArr);
            // console.log(str);

            // 将数据更新回数据库
            sql = `update options set value = '${str}' where id =9 `
            connection.query(sql, (err) => {
                if (err) return callback(err)
                callback(null)
            })
        })
    },
    //获取所有文章数据
    getPosts(callback) {
        var sql = `select posts.*,users.nickname,categories.name
                from posts 
                inner join users on posts.user_id = users.id
                inner join categories on posts.category_id = categories.id 
                where 1=1 order by posts.id desc`
        connection.query(sql, (err, results) => {

            if (err) return callback(err)
            callback(null, results)
        })
    },
    //获取数据
    getData(id, callback) {
        var sql = 'select value from options where id = ' + id
        connection.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null, results[0].value)
        })
    }
}