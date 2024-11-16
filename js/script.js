$(document).ready(function(){
    let decider=0
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
})