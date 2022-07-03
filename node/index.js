'use strict';

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');


(async () => {
	const browser = await puppeteer.launch({ headless: true, devtools: false });
	const page = await browser.newPage();
	const artifactsDir = process.env.ARTIFACTS_DIR;
	await page._client().send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: path.resolve(artifactsDir)});
	await page.goto('https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe');
	let [fruitString, vegetableString] = await page.evaluate(() => {
		let fruitNodeList = Fruit.childNodes[1].childNodes;
		let fruitObject = {};
		for (let i = 0; i < fruitNodeList.length; i++) {
			let fruitArray = fruitNodeList[i].className;
			fruitArray = fruitArray.split(' ');
			fruitArray = fruitArray.filter(x => x.includes('-'));
			for (j = 0; j < fruitArray.length; j++) {
				if (fruitObject[fruitArray[j]] === undefined) {
					fruitObject[fruitArray[j]] = [fruitNodeList[i].id];
				} else {
					fruitObject[fruitArray[j]].push(fruitNodeList[i].id);
				}
			}
		}
		let vegetableNodeList = Vegetable.childNodes[1].childNodes;
		let vegetableObject = {};
		for (let i = 0; i < vegetableNodeList.length; i++) {
			let vegetableArray = vegetableNodeList[i].className;
			vegetableArray = vegetableArray.split(' ');
			vegetableArray = vegetableArray.filter(x => x.includes('-'));
			for (j = 0; j < vegetableArray.length; j++) {
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
	fs.writeFileSync('release/fruit-english.js', `const fruitJsonString = \'${fruitString}\';`);
	fs.writeFileSync('release/vegetable-english.js', `const vegetableJsonString = \'${vegetableString}\';`);
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
	fs.writeFileSync('release/fruit-greek.js', `const fruitGreekJsonString = \'${fruitGreekString}\';`);
	fs.writeFileSync('release/vegetable-greek.js', `const vegetableGreekJsonString = \'${vegetableGreekString}\';`);
	await page.close();
	await browser.close();
})();
