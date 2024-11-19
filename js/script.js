$(document).ready(function(){
    let decider=0
    if (localStorage.getItem("loggedIn") === null) {
        localStorage.setItem("loggedIn", "0");
    }
    function updateLinksBasedOnLogin() {
        let links = {
            Home: "index.html",
            Feed: "feed.html",
            Friends: "friends.html",
            Donate: "donate.html",
            Profile: "profile.html"
        };
    
        setInterval(() => {
            let loggedIn = localStorage.getItem("loggedIn");
            $.each(links, function (id, href) {
                linkElement = $("#" + id);
                if (loggedIn==="0") {
                   linkElement.attr("href", "signin.html");
                    
                } else {
                    linkElement.attr("href", href);
                }
            });
        }, 1000);
    }
        updateLinksBasedOnLogin();
    
    $(".arrow").click(function(){
        if(decider==0){
            decider=1;
            $(".SmallSizeNav").css("display","block");
            $(".arrow").css("transform","rotate(360deg)")
            
        }
        else{
            decider=0;
             $(".SmallSizeNav").css("display","none");
             $(".arrow").css("transform","rotate(180deg)")
        }
    })
    function HideSmallNav(){
        if($(".arrow").css("display")=="none")
            $(".SmallSizeNav").css("display","none");
    }
    setInterval(HideSmallNav,100);

    $('li').click(function () {
        const link = $(this).find('a').attr('href');
        if (link) {
            window.location.href = link;
        }
    });
    if (window.location.pathname.includes('signin.html')) {
        $('#SignUpButton').on('click', function () {
            let user = JSON.parse(localStorage.getItem('user')) || [];
            let name = $('#Name').val();
            let email = $('#SignUpEmail').val().trim();
            let password = $('#SignUpPassword').val();
            let choice = 1;
            if (name === '' || email === '' || password === '') {
                alert('You Are Missing Your Inputs');
            } else {
                let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                } else {
                    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!passwordRegex.test(password)) {
                        alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
                    } else {
                        for (let i = 0; i < user.length; i++) {
                            if (user[i].Email === email) {
                                choice = 0;
                                break;
                            }
                        }
                        if (choice === 1) {
                            let newUser = {
                                name: name,
                                Email: email,
                                password: password
                            };
                            user.push(newUser);
                            localStorage.setItem('user', JSON.stringify(user));
                            localStorage.setItem('active', name);
                            localStorage.setItem("loggedIn", "1");
                            window.location.assign('Feed.html');
    
                        } else {
                            alert('The Email is used before');
                        }
                    }
                }
            }
        });
        $('#SignInButton').on('click', function () {
            let email = $('#SignInEmail').val().trim();
            let password = $('#SignInPassword').val();
            if (email === '' || password === '') {
                alert('You are Missing some Information.');
            } else {
                let users = JSON.parse(localStorage.getItem('user')) || [];
                let found = false;
                for (let i = 0; i < users.length; i++) {
                    if (users[i].Email === email) {
                        found = true;
                        if (users[i].password === password) {
                            localStorage.setItem('active', users[i].name);
                            localStorage.setItem("loggedIn", "1");
                            window.location.assign('Feed.html');
                        } else {
                            alert('Wrong Password');
                        }   
                                
                        break;
                    }
                }
                if (!found) {
                    alert("Email wasn't Found!");
                }
            }
        });
    }
})