// Executing all the functions required
fillDateFromMetaToBody()

/** write the date based on meta tag */
function fillDateFromMetaToBody() {
	var meta_tags = document.getElementsByTagName('meta');
	for (i = 0; i < meta_tags.length; i++) {
		if (meta_tags[i].getAttribute('name') == 'date') {
			console.log(document.getElementById('publishDate').innerHTML);
			document.getElementById('publishDate').innerHTML = "Date: " + meta_tags[i].getAttribute('content');
		}
	}
}

