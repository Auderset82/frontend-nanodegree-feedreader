/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


//Function to check, if element has certain class
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
//Variable for Feed Element
let feed_elements = document.querySelector('.feed');

$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('urls are defined', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			})
		});

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('names are defined', function () {
			allFeeds.forEach(function (feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0)
			})
		});
	});

	/* TODO: Write a new test suite named "The menu" */

	describe('The menu', function () {
		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */

		let body_element = document.body;


		it('menu hidden by default', function () {
			expect(hasClass(body_element, 'menu-hidden')).toEqual(true);

		});

		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */

		it('toggling with click', function () {
			$('.menu-icon-link').trigger('click');
			expect(hasClass(body_element, 'menu-hidden')).toEqual(false);
			$('.menu-icon-link').trigger('click');
			expect(hasClass(body_element, 'menu-hidden')).toEqual(true);
		});

	});

	/* TODO: Write a new test suite named "Initial Entries" */

	describe('Initial Entries', function () {
		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function (done) {
			loadFeed(0, function () {
				done();
			})
		});

		it('there is at least one entry', function () {
			feed_element = document.querySelector('.entry .feed');
			expect(feed_element).toBeDefined();
		});
	});

	/* TODO: Write a new test suite named "New Feed Selection" */

	describe('New Feed Selection', function () {
		let firstFeed, secondFeed;

		// Load first Feed
		beforeEach(function (done) {
			loadFeed(1, function () {
				// Write first Feed into Variable
				let firstFeed = feed_elements.innerHTML;
				// Load second Feed
				loadFeed(2, function () {

					done();
				});
			});
		});

		afterEach(function () {
			loadFeed(0);
		});

		// Tests to see if two entries are not equal
		it('checks if two feeds are different', function () {

			// Check if feeds are different
			let secondFeed = feed_elements.innerHTML;
			expect(firstFeed).not.toEqual(secondFeed);
		});
	});

}());
