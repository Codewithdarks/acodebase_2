//Menu Icon
$(document).ready(function () {
	$(".menuIcon").click(function () {
		$(this).toggleClass("active");
		$('.main-nav').toggleClass("toggle");
	});
});