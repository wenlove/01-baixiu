$(function() {
    var menu_posts = $('#menu-posts')
    var menu_settings = $('#menu-settings')
    var pathName = location.href
    var index = pathName.indexOf('?')
    var routerName

    if (index != -1) {
        routerName = pathName.slice(pathName.lastIndexOf('/') + 1, index)
    } else {
        routerName = pathName.slice(pathName.lastIndexOf('/') + 1)
    }
    // console.log(routerName);
    if (routerName == 'posts' || routerName == 'post-add' || routerName == 'categories') {
        menu_posts.addClass('in')
        menu_posts.attr('aria-expanded', true)
    } else if (routerName == 'nav-menus' || routerName == 'settings' || routerName == 'slides') {
        menu_settings.addClass('in')
        menu_settings.attr('aria-expanded', true)
    }

    $('li').removeClass('active')
    $('[data-id=' + routerName + ']').addClass('active')

})