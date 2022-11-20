'use strict';
const countryValueSpan = document.getElementById('country-value-span');
const dateCurrent = new Date();
const fruitSeasonalUl = document.getElementById('fruit-seasonal-ul');
const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const monthCurrentValueSpan = document.getElementById('month-current-value-span');
const vegetableSeasonalUl = document.getElementById('vegetable-seasonal-ul');
const monthCurrent = monthArray[dateCurrent.getMonth()];
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
	'Europe/London': 'unitedkingdom'
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
let timeZoneCurrent = Intl.DateTimeFormat().resolvedOptions().timeZone;
if (timeZoneToCountryObject[timeZoneCurrent] === undefined) {
	timeZoneCurrent = 'Europe/London';
}
const countryCurrent = timeZoneToCountryObject[timeZoneCurrent];
countryValueSpan.textContent = capitalizeFirstLetter(countryCurrent);
monthCurrentValueSpan.textContent = capitalizeFirstLetter(monthArray[dateCurrent.getMonth()]);
const fruitSeasonal = fruitObject[`${monthCurrent}-${countryCurrent}`];
const vegetableSeasonal = vegetableObject[`${monthCurrent}-${countryCurrent}`];
fruitSeasonalUl.innerHTML = '';
fruitSeasonal.forEach(function(item) {
	let li = document.createElement('li');
	fruitSeasonalUl.appendChild(li);
	li.textContent += item;
});
vegetableSeasonalUl.innerHTML = '';
vegetableSeasonal.forEach(function(item) {
	let li = document.createElement('li');
	vegetableSeasonalUl.appendChild(li);
	li.textContent += item;
});
