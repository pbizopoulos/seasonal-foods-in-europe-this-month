"use strict";
(() => {
	const countryValueSpan = document.getElementById("country-value-span");
	const dateCurrent = new Date();
	const fruitUl = document.getElementById("fruit-ul");
	const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const monthCurrentValueSpan = document.getElementById("month-current-value-span");
	const vegetableUl = document.getElementById("vegetable-ul");
	const monthCurrent = monthArray[dateCurrent.getMonth()];
	const timeZoneToCountryObject = {
		"Europe/Amsterdam": "Netherlands",
		"Europe/Ankara": "Turkey",
		"Europe/Athens": "Greece",
		"Europe/Berlin": "Germany",
		"Europe/Brussels": "Belgium",
		"Europe/Budapest": "Hungary",
		"Europe/Copenhagen": "Denmark",
		"Europe/Dublin": "Ireland",
		"Europe/Helsinki": "Finland",
		"Europe/Lisbon": "Portugal",
		"Europe/Ljubljana": "Slovenia",
		"Europe/London": "United Kingdom",
		"Europe/Luxembourg": "Luxembourg",
		"Europe/Madrid": "Spain",
		"Europe/Nicosia": "Cyprus",
		"Europe/Paris": "France",
		"Europe/Prague": "Czech Republic",
		"Europe/Riga": "Latvia",
		"Europe/Rome": "Italy",
		"Europe/Sofia": "Bulgaria",
		"Europe/Stockholm": "Sweden",
		"Europe/Tallinn": "Estonia",
		"Europe/Valleta": "Malta",
		"Europe/Vienna": "Austria",
		"Europe/Vilnius": "Lithuania",
		"Europe/Warsaw": "Poland",
	};

	let timeZoneCurrent = Intl.DateTimeFormat().resolvedOptions().timeZone;
	if (timeZoneToCountryObject[timeZoneCurrent] === undefined) {
		timeZoneCurrent = "Europe/London";
	}
	const countryCurrent = timeZoneToCountryObject[timeZoneCurrent];
	countryValueSpan.textContent = countryCurrent;
	monthCurrentValueSpan.textContent = monthArray[dateCurrent.getMonth()];
	fruitUl.innerHTML = "";
	for (const fruit in fvlist["Fruit"]) {
		for (const [month, country] of fvlist["Fruit"][fruit]) {
			if (month === monthCurrent && country === countryCurrent) {
				let fruitLi = document.createElement("li");
				fruitUl.appendChild(fruitLi);
				fruitLi.textContent += fruit;
			}
		}
	}
	vegetableUl.innerHTML = "";
	for (const vegetable in fvlist["Vegetable"]) {
		for (const [month, country] of fvlist["Vegetable"][vegetable]) {
			if (month === monthCurrent && country === countryCurrent) {
				let vegetableLi = document.createElement("li");
				vegetableUl.appendChild(vegetableLi);
				vegetableLi.textContent += vegetable;
			}
		}
	}
})();
