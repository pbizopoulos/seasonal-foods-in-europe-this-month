'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');


(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.on('pageerror', pageerr => {
		assert.fail(pageerr);
	});
	await page._client().send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: path.resolve('bin')});
	await page.goto('https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe');
	let [fruitString, vegetableString] = await page.evaluate(() => {
		const Fruit = document.getElementById('Fruit');
		let fruitNodeList = Fruit.childNodes[0].childNodes;
		let fruitObject = {};
		for (let i = 0; i < fruitNodeList.length; i++) {
			let fruitArray = fruitNodeList[i].className;
			fruitArray = fruitArray.split(' ');
			fruitArray = fruitArray.filter(x => x.includes('-'));
			for (let j = 0; j < fruitArray.length; j++) {
				if (fruitObject[fruitArray[j]] === undefined) {
					fruitObject[fruitArray[j]] = [fruitNodeList[i].id];
				} else {
					fruitObject[fruitArray[j]].push(fruitNodeList[i].id);
				}
			}
		}
		const Vegetable = document.getElementById('Vegetable');
		let vegetableNodeList = Vegetable.childNodes[0].childNodes;
		let vegetableObject = {};
		for (let i = 0; i < vegetableNodeList.length; i++) {
			let vegetableArray = vegetableNodeList[i].className;
			vegetableArray = vegetableArray.split(' ');
			vegetableArray = vegetableArray.filter(x => x.includes('-'));
			for (let j = 0; j < vegetableArray.length; j++) {
				if (vegetableObject[vegetableArray[j]] === undefined) {
					vegetableObject[vegetableArray[j]] = [vegetableNodeList[i].id];
				} else {
					vegetableObject[vegetableArray[j]].push(vegetableNodeList[i].id);
				}
			}
		}
		fruitString = JSON.stringify(fruitObject);
		vegetableString = JSON.stringify(vegetableObject);
		return [fruitString, vegetableString];
	});
	fs.writeFileSync('dist/fruit-english.js', `const fruitJsonString = '${fruitString}';`);
	fs.writeFileSync('dist/vegetable-english.js', `const vegetableJsonString = '${vegetableString}';`);
	const fruitGreekMap = JSON.parse(fs.readFileSync('fruit-english-to-greek.json', 'utf8'));
	let fruitGreekString = fruitString;
	for (const property in fruitGreekMap) {
		fruitGreekString = fruitGreekString.replaceAll(property, fruitGreekMap[property]);
	}
	const vegetableGreekMap = JSON.parse(fs.readFileSync('vegetable-english-to-greek.json', 'utf8'));
	let vegetableGreekString = vegetableString;
	for (const property in vegetableGreekMap) {
		vegetableGreekString = vegetableGreekString.replaceAll(property, vegetableGreekMap[property]);
	}
	fs.writeFileSync('dist/fruit-greek.js', `const fruitGreekJsonString = '${fruitGreekString}';`);
	fs.writeFileSync('dist/vegetable-greek.js', `const vegetableGreekJsonString = '${vegetableGreekString}';`);
	await page.close();
	await browser.close();
})();
