'use strict';
const countryValueSpan = document.getElementById('country-value-span');
const dateCurrent = new Date();
const fruitUl = document.getElementById('fruit-ul');
const monthArray = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const monthCurrentValueSpan = document.getElementById('month-current-value-span');
const vegetableUl = document.getElementById('vegetable-ul');
const monthCurrent = monthArray[dateCurrent.getMonth()];
const timeZoneToCountryObject = {
	'Europe/Amsterdam': 'netherlands',
	'Europe/Ankara': 'turkey',
	'Europe/Athens': 'greece',
	'Europe/Berlin': 'germany',
	'Europe/Brussels': 'belgium',
	'Europe/Budapest': 'hungary',
	'Europe/Copenhagen': 'denmark',
	'Europe/Dublin': 'ireland',
	'Europe/Helsinki': 'finland',
	'Europe/Lisbon': 'portugal',
	'Europe/Ljubljana': 'slovenia',
	'Europe/London': 'unitedkingdom',
	'Europe/Luxembourg': 'luxembourg',
	'Europe/Madrid': 'spain',
	'Europe/Nicosia': 'cyprus',
	'Europe/Paris': 'france',
	'Europe/Prague': 'czech republic',
	'Europe/Riga': 'latvia',
	'Europe/Rome': 'italy',
	'Europe/Sofia': 'bulgaria',
	'Europe/Stockholm': 'sweden',
	'Europe/Tallinn': 'estonia',
	'Europe/Valleta': 'malta',
	'Europe/Vienna': 'austria',
	'Europe/Vilnius': 'lithuania',
	'Europe/Warsaw': 'poland'
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
const fruitArray = monthCountryToFruitArrayObject[`${monthCurrent}-${countryCurrent}`];
const vegetableArray = monthCountryToVegetableArrayObject[`${monthCurrent}-${countryCurrent}`];
fruitUl.innerHTML = '';
fruitArray.forEach(function(item) {
	let fruitLi = document.createElement('li');
	fruitUl.appendChild(fruitLi);
	fruitLi.textContent += item;
});
vegetableUl.innerHTML = '';
vegetableArray.forEach(function(item) {
	let vegetableLi = document.createElement('li');
	vegetableUl.appendChild(vegetableLi);
	vegetableLi.textContent += item;
});
