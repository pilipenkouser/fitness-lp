$(document).ready(function(){

	$('.slider__inner').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		dots: true,
		fade: true,
		appendArrows: $('.slider__arrows'),
		prevArrow: '<span class="slider__arrow-left"></span>',
		nextArrow: '<span class="slider__arrow-right"></span>'
	});

	$('.coach__inner').slick({
		
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		fade: false,
		responsive: [
			{
				breakpoint: 1165,
				settings: {
					arrows: true,
					slidesToShow: 3,
					variableWidth: true
				}
			},
			{
				breakpoint: 993,
				settings: {
					arrows: true,
					slidesToShow: 2,
					variableWidth: true
				}
			},
			{
				breakpoint: 769,
				settings: {
					arrows: false,
					slidesToShow: 1,
					variableWidth: true
				}
			},
			{
				breakpoint: 481,
				settings: {
					arrows: false,
					centerMode: false,
					slidesToShow: 1,
					variableWidth: true
				}
			}
		],
		appendArrows: $('.coach__slider'),
		prevArrow: '<span class="coach_slider__arrow-left"></span>',
		nextArrow: '<span class="coach_slider__arrow-right"></span>'
	});

	$('.gallery__inner').slick({
		
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		fade: false,
		responsive: [
			{
				breakpoint: 1165,
				settings: {
					arrows: true,
					slidesToShow: 3,
					variableWidth: true
				}
			},
			{
				breakpoint: 993,
				settings: {
					arrows: true,
					slidesToShow: 2,
					variableWidth: true
				}
			},
			{
				breakpoint: 769,
				settings: {
					arrows: false,
					slidesToShow: 1,
					variableWidth: true
				}
			},
			{
				breakpoint: 481,
				settings: {
					arrows: false,
					centerMode: false,
					slidesToShow: 1,
					variableWidth: true
				}
			}
		],
		appendArrows: $('.gallery__slider'),
		prevArrow: '<span class="coach_slider__arrow-left"></span>',
		nextArrow: '<span class="coach_slider__arrow-right"></span>'
	});

	$('#hamburger').on('click', function(e){

		$(this).toggle('ease');
		$('#left-menu').addClass('left-menu-open');
	});

	$('#wraper').on('click', function(e){
		
		if( $('#left-menu').hasClass('left-menu-open') ){

			$('#hamburger').toggle('ease');
			$('#left-menu').removeClass('left-menu-open'); 
			e.preventDefault();	
		}
	});

	$("#left-menu").on("click","a", function (event) {
        event.preventDefault();

        $('#hamburger').toggle('ease');
		$('#left-menu').removeClass('left-menu-open'); 
 
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
         
        $('body,html').animate({scrollTop: top}, 1500);
    });


    $("#menu").on("click","a", function (event) {
        event.preventDefault();
 
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
         
        $('body,html').animate({scrollTop: top}, 1500);
    });




	
	$('.open_modal').click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
        event.preventDefault(); // вырубaем стaндaртнoе пoведение
        var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
        $('.wraper').css('overflow', 'hidden');
        $('#overlay').fadeIn(400, //пoкaзывaем oверлэй
            function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
                $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                    .css('display', 'block') 
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем
         });
     });

    $('.modal__close, #overlay').click( function(){ // лoвим клик пo крестику или oверлэю
        $('.modal').animate({opacity: 0, top: '0%'}, 200, // плaвнo прячем
            function(){ // пoсле этoгo
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400); // прячем пoдлoжку
            }
        );
    });

});




ymaps.ready(init);
var myMap, 
myPlacemark;

function init(){ 
    myMap = new ymaps.Map("map", {
        center: [48.710335, 44.517095],
        zoom: 16,
    });

    myPlacemark = new ymaps.Placemark([48.711335, 44.516695], {
        hintContent: 'Комсомольская улица, 11',
        balloonContent: 'Комсомольская улица, 11'
    },
    {
    	iconLayout: 'default#image',
        iconImageHref: 'img/map-marker.png',
        iconImageSize: [30, 41],
        iconImageOffset: [-10, -39]
    });
    
    myMap.geoObjects.add(myPlacemark);
}