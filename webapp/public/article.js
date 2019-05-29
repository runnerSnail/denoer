$('#comments-container').comments({
    profilePictureURL: 'https://avatars0.githubusercontent.com/u/33910674?s=64&v=4',
    enableNavigation:false,
    
    fieldMappings:{
        id:'commment_id',
        created:'create_time',
        content:'content',
        fullname:'user_name',
        upvoteCount:'support_num',
        parent:'parent_id',
        profilePictureURL:'user_img'
    },
    getComments: function(success, error) {
        var commentsArray = [{
            commment_id: 1,
            create_time: '2015-10-01',
            content: 'Lorem ipsum dolort sit amet',
            user_name: 'runnerSnail',
            support_num: 2,
            user_has_upvoted: false,
            parent_id:0,
            user_img: 'https://avatars0.githubusercontent.com/u/33910674?s=64&v=4'
        },{
            commment_id: 2,
            create_time: '2015-10-01',
            content: 'Lorem ipsum dolort sit amet',
            user_name: 'runnerSnail',
            support_num: 2,
            user_has_upvoted: false,
            parent_id:1,
            user_img: 'https://avatars0.githubusercontent.com/u/33910674?s=64&v=4'
        }];
        success(commentsArray);
    },
    postComment:function(commentJSON,success,error){
        var gitlab_id;
        var commentJSON = $.extend(commentJSON,{
            article_id:200
        })
        console.log(commentJSON);
        // /api/insertCreate
        // /api/selectCommit?article_id=xxx   get
        $.ajax({
            type: 'POST',
            url: '/api/insertCreate',
            data: JSON.stringify(commentJSON),
            success: success,
            dataType: 'json'
          });
          success(commentJSON);
    },
    upvoteComment: function (commentJSON, success, error) {
        var commentJSON = $.extend(commentJSON,{
            article_id:200
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

$(".comment-wrapper .name").click(function(e){
    window.open('https://github.com/'+ e.target.innerText)    
});
