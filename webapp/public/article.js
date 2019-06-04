var article_id = window.location.href;
article_id = article_id.match(/\S+\?article_id=(\d+)/)[1];
var user_id = '';
var supportFlag = false;

if (getCookie('user_id')) user_id = getCookie('user_id');
else{
    window.location.href="https://github.com/login/oauth/authorize?client_id=8bf81a16134ffeef7284&redirect_uri=http://denoer.cn/login"
}

$.ajax({
    type: 'POST',
    url: '/api/article/update',
    data: JSON.stringify({
        article_id: article_id,
        read_num: 1
    }),
    dataType: 'json'
});

// 加载评论
$('#comments-container').comments({
    profilePictureURL: 'https://avatars0.githubusercontent.com/u/33910674?s=64&v=4',
    enableNavigation: false,
    enableEditing: false,
    fieldMappings: {
        id: 'comment_id',
        created: 'create_time',
        content: 'content',
        fullname: 'user_name',
        upvoteCount: 'support_num',
        parent: 'parent_id',
        profilePictureURL: 'user_img'
    },
    getComments: function (success, error) {
        var commentsArray = [];
        $.get("/api/selectComment", { article_id: article_id },
            function (data) {
                commentsArray = data.result;
                success(commentsArray);

            });
    },
    postComment: function (commentJSON, success, error) {
        var commentJSON = $.extend(commentJSON, {
            article_id: article_id,
            user_id: user_id
        })
        $.ajax({
            type: 'POST',
            url: '/api/insertCommit',
            data: JSON.stringify(commentJSON),
            success: success,
            dataType: 'json'
        });
        success(commentJSON);
    },
    upvoteComment: function (commentJSON, success, error) {
        var commentJSON = $.extend(commentJSON, {
            article_id: article_id,
            user_id: user_id
        })
        $.ajax({
            type: 'POST',
            url: '/api/comment/clicksupport',
            data: JSON.stringify(commentJSON),
            success: success,
            dataType: 'json'
        });
        success(commentJSON);
    }
});

$(".comment-wrapper .name").click(function (e) {
    window.open('https://github.com/' + e.target.innerText)
});

$("#clickSupportArea").click(function () {

    $.ajax({
        type: 'POST',
        url: '/api/article/clicksupport',
        data: JSON.stringify({
            user_id: user_id,
            article_id: article_id
        }),
        success: function (data) {
            if(supportFlag){
                $('#support').removeClass('support_hover');
                $('#support_num').text($('#support_num').text()-0-1);
            }else{
                $('#support').addClass('support_hover');
                $('#support_num').text($('#support_num').text()-0+1);
            }
            supportFlag = !supportFlag;
        },
        dataType: 'json'
    });
})
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}