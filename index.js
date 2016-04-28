$(document).ready(function(){
	$("div.wrapper div#main div#index").show();
	$("div.wrapper div#main div#acads").hide();
	$("div.wrapper div#main div#extra").hide();

	$("div.wrapper div#main div#menu a.index").click(function(){
		$("div.wrapper div#main div#index").show();
		$("div.wrapper div#main div#acads").hide();
		$("div.wrapper div#main div#extra").hide();
	});
	$("div.wrapper div#main div#menu a.acads").click(function(){
		$("div.wrapper div#main div#index").hide();
		$("div.wrapper div#main div#acads").show();
		$("div.wrapper div#main div#extra").hide();
	});
	$("div.wrapper div#main div#menu a.extra").click(function(){
		$("div.wrapper div#main div#index").hide();
		$("div.wrapper div#main div#acads").hide();
		$("div.wrapper div#main div#extra").show();
	});

});
