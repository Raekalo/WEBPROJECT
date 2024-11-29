$(document).ready(function () {
    let isPanelOpen = false;
    let username = localStorage.getItem('active');
    $("#trendclick").on("click", function () {
        if (!isPanelOpen) {
            $(".trending-panel").stop().slideDown(400); // Open with slide-down animation
            $(".right-panel").animate({ height: "52vh" }, 400); // Smoothly change height
            $(this).css("transform", "rotate(180deg)");
        } else {
            $(".trending-panel").stop().slideUp(400); // Close with slide-up animation
            $(".right-panel").animate({ height: "7vh" }, 400); // Smoothly change height back
            $(this).css("transform", "rotate(0deg)"); // Reset icon flip
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
    $("#Cards").on('click','.AddButton',function(){
        $(this).closest(".Card").hide(250);
        ++followers;
        user[i].followers=followers;
        localStorage.setItem("user", JSON.stringify(user));
        $("#Follower-count").html('<p>Friends: '+followers+'</p>')
    })
    $("#Cards").on('click','.Ignore',function(){
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
            $btn.css('background-color', '#146bc8');
            likes++;
        } else {
            $btn.text('Like');
            $btn.css('background-color', '#4792e3');
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
    fetch('js/Posts.json') 
    .then(response => { 
        if (!response.ok) { 
            throw new Error('Network response was not ok'); 
        } 
        return response.json();
    }) 
    .then(data => { 
        data.forEach(Post => { 
            let $PostCard= $('<div>').addClass('post'); 
            let $PostHeader = $('<div>')
                .addClass('post-header')
                .html(`
                  <img src="${Post.Profile}" alt="Raed Kalo" class="profile-pic"> 
                  <span class="name">${Post.Name}</span>
                `
                );
            let $PostContent=$('<div>')
            .addClass('post-content')
            .html(`
                <p>${Post.text}</p>
                <img src="${Post.image}" alt="Image" class="post-image">
                `);
            let $postfooter=$('<div>')
            .addClass('post-footer')
            .html(`
                <button class="like-btn">Like</button>
                <span class="like-count">0 Likes</span>
                <button class="comment-btn">Comment</button>
                <span class="comment-count">0 Comments</span>
                `);
            let $comments=$('<div>')
            .addClass('comments-section')
            .html(`
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <div class="comments-list"></div>
                `);
                $PostCard.append($PostHeader).append($PostContent).append($postfooter).append($comments);
                $('#Posts').append($PostCard);

        }); 
    }) 
    .catch(error => { 
        console.error('Error fetching flight data:', error); 
    });
    fetch('js/Cards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(Card => {
            let Cardd = $('<div>')
                .addClass('Card')
                .html(`
                    <img src="${Card.profile}" alt="Icon" class="profile-pic">
                    <div class="Info">
                        <p>${Card.Name}</p>
                        <div>
                            <button class="AddButton">Add Friend</button>
                            <button class="Ignore">Ignore</button>
                        </div>
                    </div>
                `);
            $("#Cards").append(Cardd);
        });
    })
    .catch(error => {
        console.error('Error fetching card data:', error);
    });

    fetch('js/Trends.json') 
    .then(response => { 
        if (!response.ok) { 
            throw new Error('Network response was not ok'); 
        } 
        return response.json();
    }) 
    .then(data => { 
        data.forEach(list => { 
            let TrendList=$('<li>')
            .html(`
                <div class="trend-category">${list.category}</div>
                <div class="trend-title">${list.title}</div>
                <div class="trend-details">${list.details}</div>
                `)
            $('#trending-list').append(TrendList);
        });  
    }) 
    .catch(error => { 
        console.error('Error fetching trend data:', error); 
    }); 

})