/*
 * NICE DATE.js
 * provides function "nicedate()" to to format dates (clocks or calendars)
 *
 * `nicedate` is called with two arguments, `format` (required) and
 * optionally a `Date`. formats use strftime() syntax.
 *
 * first argument `format` is a string using `strftime`s syntax
 * (http://strftime.org) without the "%" symbol
 *
 * the second argument is a Date object, but if not present, it
 * defaults to the current date and time
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 *
 * how to use:
 *   1) include nicedate.js in your html
 *       <script src="nicedate.js"></script>
 *   2) call the function `nicedate()`!
 *
 *
 * consider the following timestamp:
 *   Monday, September 30th 2013, 07:06:05 AM
 *
 *            YOU TYPE     |     YOU GET
 *     --------------------+-------------------
 *     nicedate('H:M:S')   |   07:06:05
 *     nicedate('H:M p')   |   07:06 AM
 *     nicedate('A, b d')  |   Mon, Sep 30
 *     nicedate('Y-m-d')   |   2013-09-30
 *     nicedate('d/m/y')   |   30/09/13
 *     nicedate('m/d')     |   09/30
 *
 *
 * function nicedate(String format, Date time)
 *                          ^^^^^^       ^^^^
 *                          |            |
 *                          |       the desired timestamp, if none is
 *                          |       provided the current time is used
 *    the format string, it accepts most strftime()
 *    parameters, but without the % symbol
 *
 *
 * example: how to make a clock
 *     <h2 id="my-clock"></h2>
 *     <script>
 *         var myClock = document.getElementById('my-clock');
 *
 *         setInterval(function update() {
 *             myClock.innerHTML = nicedate('H:M:S')
 *         }, 1000)
 *     </script>
 *
 * also, you can modify DATE_LOCALE to fit your language
 *
 *
 * developer note:
 *   nicedate('a A w d b B m y Y H I p M S f', new Date(2013, 8, 30, 7, 6, 5))
 * should return:
 *   'Mon Monday 1 30 Sep September 09 13 2013 07 07 AM 06 05 000000'
 *
 * extra note:
 *   strftime is used by c / python / perl / php / ruby
 *
 */

var DATE_LOCALE = {
	weekdayFull: 'Sunday,Monday,Tuesday,Wednesday,Thrusday,Friday,Saturday'.split(','),
	weekdayShort: 'Sun,Mon,Tue,Wed,Thr,Fri,Sat'.split(','),
	monthFull: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
	monthShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
};

function nicedate(format, date) {
	if (!date || typeof date.getMonth !== 'function') {
		date = new Date();
	}

	function pad(str, n) {
		str = str + '';

		if (n < str.length)
			return str;

		return ('00000000' + str).substr(-n);
	}

	var result = '';

	for (var i = 0; i < format.length; i++) {
		var letter = format[i];

		switch (letter) {
			// weekday, short (Mon)
			case 'a':
				result += DATE_LOCALE.weekdayShort[date.getDay()]
				break;

			// weekday, full (Monday)
			case 'A':
				result += DATE_LOCALE.weekdayFull[date.getDay()];
				break;

			// weekday, number (0=sunday, 1=monday, ...)
			case 'w':
				result += date.getDay();
				break;

			// day (00 - 31)
			case 'd':
				result += pad(date.getDate(), 2);
				break;

			// month, short (Sep)
			case 'b':
				var month = date.getMonth();
				result += DATE_LOCALE.monthShort[month];
				break;

			// month, full (September)
			case 'B':
				var month = date.getMonth();
				result += DATE_LOCALE.monthFull[month];
				break;

			// month, number (01 - 12)
			case 'm':
				var month = date.getMonth() + 1;
				result += pad(month, 2);
				break;

			// year, no century (13)
			case 'y':
				var year = '' + date.getFullYear();
				result += pad(year.substr(-2), 2);
				break;

			// year (2013)
			case 'Y':
				result += date.getFullYear();
				break;

			// hour (00 - 23)
			case 'H':
				result += pad(date.getHours(), 2);
				break;

			// hour (01 - 12)
			case 'I':
				var hour = date.getHours();
				if (hour > 12)
					hour -= 12;
				result += pad(hour, 2);
				break;

			// AM or PM
			case 'p':
				var hour = date.getHours();
				if (hour < 12)
					result += 'AM';
				else
					result += 'PM';
				break;

			// minute
			case 'M':
				result += pad(date.getMinutes(), 2);
				break;

			// second
			case 'S':
				result += pad(date.getSeconds(), 2);
				break;

			// microsecond (1 second = 1000 milliseconds = 1000 000 microseconds)
			case 'f':
				var microseconds = date.getMilliseconds() * 1000;
				result += pad(microseconds, 6);
				break;

			case '%':
				break;

			default:
				result += letter;
		}
	}

	return result;
}
