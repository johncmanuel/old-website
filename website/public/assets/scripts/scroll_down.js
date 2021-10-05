function SmoothScrollTo(id_or_Name, timelength) {
    var timelength = timelength || 1000;
    $('html, body').animate({
        scrollTop: $(id_or_Name).offset().top - 70
    }, timelength, function () {
        window.location.hash = id_or_Name;
    });
}

 $(function() {
     $('#scroll-anim').on("click", function() { SmoothScrollTo("#aboutme", 1000);}); 
 })