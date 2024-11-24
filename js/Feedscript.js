$(document).ready(function () {
    let isPanelOpen = false;
    let username = localStorage.getItem('active');
    $("#trendclick").on("click", function () {
        if (!isPanelOpen) {
            $(".trending-panel").css("display", "block");
            $(".right-panel").css("height", "52vh");
        } else {
            $(".trending-panel").css("display", "none");
            $(".right-panel").css("height", "7vh");
        }
        isPanelOpen = !isPanelOpen; 
    });
    $(window).on("resize", function(){
        if (window.innerWidth >= 768) {
            $(".trending-panel").css("display", "block");
            $(".rightpanel").css("height", "auto");
            isPanelOpen = false;
        } 
        else if (!isPanelOpen&&window.innerWidth < 768) {
            $(".trending-panel").css("display", "none");
            $(".right-panel").css("height", "7vh");
        }
    })
    $("#MyName").html('<p id="MyName">'+username+'</p>');
    let user=JSON.parse(localStorage.getItem('user'));
    let currUser=localStorage.getItem("active");
    let i=0;
    for(i;i<user.length;i++){
        if(user[i].name===currUser)
            break;
    }
    let followers=user[i].followers
    $("#Follower-count").html('<p>Friends: '+followers+'</p>')
    $(".AddButton").on('click',function(){
        $(this).closest(".Card").hide(250);
        ++followers;
        user[i].followers=followers;
        localStorage.setItem("user", JSON.stringify(user));
        $("#Follower-count").html('<p>Friends: '+followers+'</p>')
    })
    $(".Ignore").on('click',function(){
        $(this).closest(".Card").hide(250);
        $("#Follower-count").html('<p>Friends: '+followers+'</p>')
    })

    $('#submitPostBtn').on('click', function () {
        let postText = $('#newPostText').val().trim();
        let imageFile = $('#imageInput')[0].files[0];
        
        if (postText === '') {
            alert("Please fill out the post text.");
            return;
        }
        let $newPost = $('<div>').addClass('post');
        let $header = $('<div>').addClass('post-header');
        let username=localStorage.getItem('active');
        let profilepic="images/FeedImages/Palestine.jfif"
        $header.append('<img src='+ profilepic +' alt="User" class="profile-pic">');
        $header.append('<span class="name">'+ username +'</span>'); 
        let $content = $('<div>').addClass('post-content');
        $content.append('<p>' + postText + '</p>');
        if (imageFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var $img = $('<img>').addClass('post-image').attr('src', e.target.result);
                $content.append($img);
            }
            reader.readAsDataURL(imageFile);
        }
        var $footer = $('<div>').addClass('post-footer');
        $footer.append('<button class="like-btn">Like</button>');
        $footer.append('<span class="like-count">0 Likes</span>');
        $footer.append('<button class="comment-btn">Comment</button>');
        $footer.append('<span class="comment-count">0 Comments</span>');
        var $commentsSection = $('<div>').addClass('comments-section');
        $commentsSection.append('<input type="text" placeholder="Add a comment..." class="comment-input">');
        $commentsSection.append('<div class="comments-list"></div>');
        $newPost.append($header).append($content).append($footer).append($commentsSection);
        $('.Posts').prepend($newPost);
        $('#newPostText').val('');
        $('#imageInput').val('');
    });
    

    
    
    $('.Posts').on('click', '.like-btn', function () {
        let $btn = $(this);
        let $likeCount = $btn.siblings('.like-count');
        let likes = parseInt($likeCount.text()) || 0;
    
        if ($btn.text() === 'Like') {
            $btn.text('Liked');
            $btn.css('background-color', '#643a25');
            likes++;
        } else {
            $btn.text('Like');
            $btn.css('background-color', '#c91212');
            likes--;
        }
        
        $likeCount.text(`${likes} Likes`);
    });
    
    $('.Posts').on('click', '.comment-btn', function () {
        let $post = $(this).closest('.post');
        let $commentSection = $post.find('.comments-section');
        $commentSection.toggle();
    });
    
    $('.Posts').on('keypress', '.comment-input', function (e) {
        if (e.which === 13 && $(this).val().trim() !== '') { 
            var commentText = $(this).val().trim();
            var $post = $(this).closest('.post');
            var $commentList = $post.find('.comments-list');
            var $commentCount = $post.find('.comment-count');
    
            var commentHtml = `<div class="comment"><strong>${username}:</strong> ${commentText}</div>`;
            $commentList.append(commentHtml);
            var commentCount = $commentList.children().length;
            $commentCount.text(`${commentCount} Comments`);
            
            $(this).val('');
        }
    });
    
})