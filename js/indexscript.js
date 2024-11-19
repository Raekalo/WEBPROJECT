$(document).ready(function () {
    
        let images = [
            'images/HomeImages/Al-Aqsa.jfif',
            'images/SignInImages/protest3.jpg',
            'images/SignInImages/Protest.jpg',
        ];
        let currentIndex = 0;
    
        setInterval(function () {
            currentIndex = (currentIndex + 1) % images.length;
            $('.center').css('background-image', `url('${images[currentIndex]}')`);
        }, 5000);
    let text = "A social platform where you can say The TRUTH.";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            $('.CenterText p').append(text.charAt(index));
            index++;
            setTimeout(typeWriter, 75);
        }
    }
    typeWriter();
   
        let index1 = 0; 
        const testimonials = $('.testimonial');
        testimonials.eq(index1).addClass('active');
    
        setInterval(function () {
            testimonials.eq(index1).removeClass('active');
            index1 = (index1 + 1) % testimonials.length;
            testimonials.eq(index1).addClass('active');
        }, 3000);

        let userName = localStorage.getItem('active');
        
        if (localStorage.getItem("loggedIn")==1) {
            $('#signup-btn').remove();
            $('#join-btn').remove();
            $('.CenterText').append('<span>Welcome, ' + userName + '!</span>');
        } else {
            $('#signup-btn').attr('href', 'signin.html');
            $('#join-btn').attr('href', 'signin.html');
        } 
});
