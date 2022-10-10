'use strict';

const countrySpan = document.getElementById('countrySpan');
const countryValueSpan = document.getElementById('countryValueSpan');
const dateCurrent = new Date();
const fruitSeasonalUl = document.getElementById('fruitSeasonalUl');
const fruitSpan = document.getElementById('fruitSpan');
const homePageUrl = document.getElementById('homePageUrl');
const languageSelect = document.getElementById('languageSelect');
const languageSpan = document.getElementById('languageSpan');
const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const monthCurrentValueSpan = document.getElementById('monthCurrentValueSpan');
const monthGreekArray = ['ιανουάριος', 'φεβρουάριος', 'μάρτιος', 'απρίλιος', 'μάϊος', 'ιούνιος', 'ιούλιος', 'αύγουστος', 'σεπτέμβριος', 'οκτώβριος', 'νοέμβριος', 'δεκέμβριος'];
const monthSpan = document.getElementById('monthSpan');
const seasonalFoodsInEurope = document.getElementById('seasonalFoodsInEurope');
const sourceCodeUrl = document.getElementById('sourceCodeUrl');
const vegetableSeasonalUl = document.getElementById('vegetableSeasonalUl');
const vegetableSpan = document.getElementById('vegetableSpan');

const monthCurrent = monthArray[dateCurrent.getMonth()];

const countryEnglishToGreekObject = {
	'austria': 'Αυστρία',
	'belgium': 'Βέλγιο',
	'bulgaria': 'Βουλγαρία',
	'cyprus': 'Κύπρος',
	'czech republic': 'Δημοκρατία της Τσεχίας',
	'denmark': 'Δανία',
	'estonia': 'Εσθονία',
	'finland': 'Φινλανδία',
	'france': 'Γαλλία',
	'germany': 'Γερμανία',
	'greece': 'Ελλάδα',
	'hungary': 'Ουγγαρία',
	'ireland': 'Ιρλανδία',
	'italy': 'Ιταλία',
	'latvia': 'Λετονία',
	'lithuania': 'Λιθουανία',
	'luxembourg': 'Λουξεμβούργο',
	'malta': 'Μάλτα',
	'poland': 'Πολωνία',
	'portugal': 'Πορτογαλία',
	'slovenia': 'Σλοβενία',
	'spain': 'Ισπανία',
	'sweden': 'Σουηδία',
	'turkey': 'Τουρκία',
	'netherlands': 'Ολλανδία',
	'unitedkingdom': 'Ηνωμένο Βασίλειο'};

const timeZoneToCountryObject = {
	'Europe/Vienna': 'austria',
	'Europe/Brussels': 'belgium',
	'Europe/Sofia': 'bulgaria',
	'Europe/Nicosia': 'cyprus',
	'Europe/Prague': 'czech republic',
	'Europe/Copenhagen': 'denmark',
	'Europe/Tallinn': 'estonia',
	'Europe/Helsinki': 'finland',
	'Europe/Paris': 'france',
	'Europe/Berlin': 'germany',
	'Europe/Athens': 'greece',
	'Europe/Budapest': 'hungary',
	'Europe/Dublin': 'ireland',
	'Europe/Rome': 'italy',
	'Europe/Riga': 'latvia',
	'Europe/Vilnius': 'lithuania',
	'Europe/Luxembourg': 'luxembourg',
	'Europe/Valleta': 'malta',
	'Europe/Warsaw': 'poland',
	'Europe/Lisbon': 'portugal',
	'Europe/Ljubljana': 'slovenia',
	'Europe/Madrid': 'spain',
	'Europe/Stockholm': 'sweden',
	'Europe/Ankara': 'turkey',
	'Europe/Amsterdam': 'netherlands',
	'Europe/London': 'unitedkingdom'};

let timeZoneCurrent = Intl.DateTimeFormat().resolvedOptions().timeZone;
if (timeZoneToCountryObject[timeZoneCurrent] === undefined) {
	timeZoneCurrent = 'Europe/London';
}

const countryCurrent = timeZoneToCountryObject[timeZoneCurrent];

if (countryCurrent === 'greece') {
	languageSelect.value = 'greek';
} else {
	languageSelect.value = 'english';
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

languageSelect.onchange = function() {
	let fruitObject;
	let vegetableObject;
	if (this.value === 'greek') {
		fruitObject = JSON.parse(fruitGreekJsonString);
		vegetableObject = JSON.parse(vegetableGreekJsonString);
		countrySpan.textContent = 'Χώρα';
		countryValueSpan.textContent = capitalizeFirstLetter(countryEnglishToGreekObject[countryCurrent]);
		fruitSpan.textContent = 'Φρούτα';
		homePageUrl.textContent = 'Αρχική σελίδα';
		languageSpan.textContent = 'Γλώσσα';
		monthCurrentValueSpan.textContent = capitalizeFirstLetter(monthGreekArray[dateCurrent.getMonth()]);
		monthSpan.textContent = 'Μήνας';
		seasonalFoodsInEurope.textContent = 'Εποχιακά τρόφιμα στην Ευρώπη';
		sourceCodeUrl.textContent = 'Πηγαίος κώδικας';
		vegetableSpan.textContent = 'Λαχανικά';
	} else {
		fruitObject = JSON.parse(fruitJsonString);
		vegetableObject = JSON.parse(vegetableJsonString);
		countrySpan.textContent = 'Country';
		countryValueSpan.textContent = capitalizeFirstLetter(countryCurrent);
		fruitSpan.textContent = 'Fruits';
		homePageUrl.textContent = 'Home page';
		languageSpan.textContent = 'Language';
		monthCurrentValueSpan.textContent = capitalizeFirstLetter(monthArray[dateCurrent.getMonth()]);
		monthSpan.textContent = 'Month';
		seasonalFoodsInEurope.textContent = 'Seasonal foods in Europe';
		sourceCodeUrl.textContent = 'Source code';
		vegetableSpan.textContent = 'Vegetables';
	}
	const fruitSeasonal = fruitObject[`${monthCurrent}-${countryCurrent}`];
	const vegetableSeasonal = vegetableObject[`${monthCurrent}-${countryCurrent}`];
	fruitSeasonalUl.innerHTML = '';
	fruitSeasonal.forEach(function (item) {
		let li = document.createElement('li');
		fruitSeasonalUl.appendChild(li);
		li.textContent += item;
	});
	vegetableSeasonalUl.innerHTML = '';
	vegetableSeasonal.forEach(function (item) {
		let li = document.createElement('li');
		vegetableSeasonalUl.appendChild(li);
		li.textContent += item;
	});
};

languageSelect.onchange();
