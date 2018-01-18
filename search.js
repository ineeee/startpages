/*
 * a script for a search bar
 *
 * how to use:
 *   1) include this script in your startpage
 *   2) add form with an input, and optionally a submit button:
 *       <form id="search">
 *           <input type="text">
 *           <button type="submit">Search</button>
 *       </form>
 *
 *   3) make sure <form> has the id "search"
 *   4) profit!
 *
 *   you can style however you'd like, and rearrange anything as long
 *   as there is a <form> with an <input> somewhere inside.
 *
 *
 * how to add a search engine:
 *   add your desired trigger in the `switch(tag)` block, and set the
 *   form's action attribute to your search engine's url. the following
 *   is an example:
 *       switch(tag) {
 *           case 'google':
 *               form.setAttribute('action', 'https://www.google.com/search')
 *               input.setAttribute('name', 'q')
 *               break;
 *
 *           case 'da':
 *           case 'deviantart':
 *               form.setAttribute('action', 'https://www.deviantart.com/')
 *               input.setAttribute('name', 'q')
 *               break;
 *       }
 *
 *  note: the `action` url is the page where your search engine receives
 *  queries, for some its /search (like google.com/search) and others
 *  use the root page, like deviantart (deviantart.com).
 *  what comes after the question mark is called `query`, and it contains
 *  the words we searched. an example if we search "dank memes" on google:
 *      google.com/search?q=dank+memes
 *      ^                 ^     ^-- (its a plus because its url encoded)
 *      |                 |
 *      |                 +-- the `query`, what contains our search
 *      +-- the `action` url, where we sent the query
 *
 *  as you can see, the part of the query that contains our "dank memes"
 *  search starts with "q", so thats the name that we must give our <input>
 *  in the form. for almost all pages its called "q" but others use "search"
 *  and others use "query", so its up to your chosen search engine.
 *  you can also set the <form>'s `method` to POST in case your search engine
 *  requires it, such as startpage.com POSTing to "startpage.com/do/asearch".
 *  the configuration for such a service would look like the following:
 *       switch(tag) {
 *           case 'startpage':
 *               form.setAttribute('method', 'POST')
 *               form.setAttribute('action', 'https://www.startpage.com/do/asearch')
 *               input.setAttribute('name', 'query')
 *               break;
 *       }
 *
 *
 * how to hack:
 *   the character that determines the kind of search is currently ! but
 *   it can be changed to whatever you want in the `if` at line 87.
 *
 * the reason this script uses a <form> and NOT a location.href hack is
 * because browsers are really good at doing requests, so we don't need
 * to re-implement things like url encoding and making sure there arent
 * invalid characters in the request. the script simply replaces where
 * a <form> is sent right before the browser does it. only issue about
 * this is that we can't open the result in a new tab.
 *
 */

var searchForm = document.getElementById('search'),
	searchInput = searchForm.querySelector('input');

if (!searchForm || !searchInput) {
	throw new Error('The search form isnt properly configured!');
}

searchForm.addEventListener('submit', function(event) {
	var tag = '';

	// check if the search starts with a !
	if (searchInput.value[0] === '!') {
		// get the first words index (up to the first space)
		var temp = searchInput.value.indexOf(' ');

		// get a tag for the desired search engine
		tag = searchInput.value.substr(1, temp - 1);

		// remove the tag from the searchInput
		searchInput.value = searchInput.value.substr(temp + 1, searchInput.value.length);
	}

	switch (tag) {
		case 'd':
		case 'ddg':
		case 'duckduckgo':
			searchForm.setAttribute('action', 'https://duckduckgo.com/');
			searchInput.setAttribute('name', 'q');
			break;

		case 'b':
		case 'bing':
			searchForm.setAttribute('action', 'https://www.bing.com/search')
			searchInput.setAttribute('name', 'q');
			break;

		case 'yt':
		case 'youtube':
			searchForm.setAttribute('action', 'https://www.youtube.com/results');
			searchInput.setAttribute('name', 'q');
			break;

		case 'wa':
		case 'wolfram':
		case 'wolframalpha':
			searchForm.setAttribute('action', 'https://www.wolframalpha.com/input/');
			searchInput.setAttribute('name', 'i');
			break;

		case 'g':
		case 'google':
		default:
			searchForm.setAttribute('action', 'https://www.google.com/search')
			searchInput.setAttribute('name', 'q');
			break;
	}
});
