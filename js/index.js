
// constanes globales
const MOVIE_API_URL 	= `https://api.themoviedb.org/3/tv/popular?api_key=${MOVIE_API_KEY}&language=fr&page=`;
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

// les méthodes manipulant le DOM sont éxécutées après le chargement de la page
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

	// lightbox

	const $lightboxSection = $("#lightbox-gallery-ctnr");

	lightbox.option({
		wrapAround: true,
		albumLabel: "%1/%2"
	});


	// Sur le même modèle que la fonction writeHTMLInSlickSlider,
	// ajout du contenu html de l'élément html lightboxSection
	// on alimente la lightbox avec le même contenu que le caroussel (séries chargées depuis l'API themoviedb) 
	function writeHTMLInLightbox(arrayOfItems) {
		let lightboxInnerHTML = "";
		arrayOfItems.forEach(item => {
			lightboxInnerHTML += 
			`<a href="${item.image}"
			data-lightbox="gallery-lightbox" data-title="${item.title}">
				<img src="${item.image}" alt="">
			</a>`;
		});
		
		$lightboxSection.html(lightboxInnerHTML);
	}

	// slick

	const $slickSection = $("#slick-ctnr");

	function initSlickSlider() {
		$slickSection.slick({
			lazyLoad: 'ondemand',
		});
	}

	// ajout du contenu html de l'élément html slickSection 
	function writeHTMLInSlickSlider(arrayOfItems) {
		let sliderInnerHTML = "";
		arrayOfItems.forEach(item => {
			sliderInnerHTML += `<div class='slick-movie-item'>
				<img src="${item.image}" alt="">
				<h3>${item.title}</h3>
			</div>`
		});
		
		$slickSection.html(sliderInnerHTML);
		// on ré-initialise le contenu du caroussel slick via ses méthodes en jQuery
		initSlickSlider();
	}

	// récupération des séries depuis l'API themoviedb
	function getMovieData(pageNumber) {
		// la méthode get() rattaché à l' objet JQuery permet de réaliser une requête AJAX de type GET
		// documentation : https://api.jquery.com/jQuery.get/
		$.get(MOVIE_API_URL+pageNumber, null, function(data){
			const movies = data.results;

			// on crée un nouveau tableau d'objets "simplifiés" 
			// ne contenant que 2 propriétés : "title" et "image"
			// documentation (méthode .map()): https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
			const arrayOfMovies = movies.map(movie => {
				const image = movie.poster_path ? urlImgPrefix + movie.poster_path : "./images/not-found.webp";
				return {image, title: movie.name};
			});

			// la data récupérée servira à alimenter à la fois la lightbox et le caroussel
			writeHTMLInSlickSlider(arrayOfMovies);
			writeHTMLInLightbox(arrayOfMovies);

			// à chaque nouvelle requête, la pagination et ré-initialisée
			setPagination(data.total_results, true);
		});
	}

	function setPagination(totalResults, doNotReload) {
		$('#tv-shows-slider-pagination').pagination({
			dataSource: new Array(totalResults),
			pageSize: 20,
			showGoInput: true,
			showGoButton: false,
			callback: function(data, pagination) {
				// l'argument booleéen "doNotReload" sert à ne pas éxécuter la fonction getMovie de façon recursive
				if(doNotReload) {
					doNotReload = false;
				} else {
					// la réinitialisation du caroussel et le rechargement de la data
					// n'a lieu que lors du click sur les items de pagination
					$slickSection.slick('unslick');
					getMovieData(pagination.pageNumber);
				}
				// en recréant la pagination, on définit le texte qui sera visible dans le placeholder
				// de l'input de recherche de page par numéro
				$('#tv-shows-slider-pagination input.J-paginationjs-go-pagenumber').attr("placeholder", "Chercher une page");
			}
		});
	}

	// chargement initial des séries + initialisation de la pagination et du contenu de la lightbox
	getMovieData(1);

});
