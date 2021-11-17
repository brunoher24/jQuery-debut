// $(window).on("load", function() {
    

    // function randomIntFromInterval(min, max) { // min and max included 
    //     return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    
    // $switchColorBtn = $("#switch-color-btn");
    // const $coloredSquare = $("div.colored-square");
    // console.log($coloredSquare)
    
    
    // function getRandomColor() {
    //     const colors = ["red", "yellow", "green", "blue"];
    //     return colors[randomIntFromInterval(0, colors.length-1)];
    // }
    
    // $switchColorBtn.click(function() {
    //     $coloredSquare.css("background-color", getRandomColor());  
    //     // $coloredSquare.style.backgroundColor = getRandomColor();
    // });

// });

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
	})

});




