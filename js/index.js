const MOVIE_API_URL 	= `https://api.themoviedb.org/3/tv/popular?api_key=${MOVIE_API_KEY}&language=fr&page=1`;
const urlImgPrefix 		= 'https://image.tmdb.org/t/p/w500';

const options = {
	isClickAnimation: true,
	isPositionRandom: true,
	durationOut: 300,
	durationIn: 200,
	easingOut: "easeInOutBack",
	easingIn: "easeOutBounce",
	moveLeft: 250,
	moveTop: 150,
	opacityOut: 0.6,
	opacityIn: 1,
	delay: 10,
	direction: "next",
	callback: function() {}
};

$(window).bind("load", function() {
    "use strict";

	// jStack
	const jstack = $("#jstack-image-box").jStack(options);
	$("#next").click(function() {
		jstack.next();
	});
	$("#prev").click(function() {
		jstack.prev();
	});
	$("#shuffle").click(function() {
		jstack.shuffle();
	});

	lightbox.option({
		wrapAround: true,
		albumLabel: "%1/%2"
	});

	// slick

	const $slickSection = $("#slick-section");

	function initSlickSlider() {
		$slickSection.slick({
			lazyLoad: 'ondemand',
		});
	}

	function writeHTMLInSlickSlider(arrayOfImages) {
		
		let sliderInnerHTML = "";
		arrayOfImages.forEach(image => {
			sliderInnerHTML += `<div>
				<img src="${image}" alt="">
			</div>`
		});
		
		$slickSection.html(sliderInnerHTML);
		initSlickSlider();
	}

	

	function getMovieData() {
		$.get(MOVIE_API_URL, null, function(data){
			const movies = data.results;
			const arrayOfImages = movies.map(movie => urlImgPrefix + movie.poster_path);
			writeHTMLInSlickSlider(arrayOfImages);
		});
	}

	getMovieData();
});
