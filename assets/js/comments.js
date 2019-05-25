$(function() {

    //获取所有数据
    function render(obj = {}) {
        $.ajax({
            type: 'get',
            url: '/getCommentsList',
            dataType: 'json',
            success(res) {
                console.log(res);
            }
        })
    }
    render()
})