from hashlib import sha256
from json import dumps
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


def get_month_country_to_food(page: Page, selector: str) -> str:
    food_children = page.query_selector(selector).query_selector_all('xpath=child::*') # type: ignore[union-attr]
    food_to_month_country = {}
    for food_child in food_children:
        food = food_child.query_selector('strong').inner_text().replace(' ', '-').replace('(', '').replace(')', '') # type: ignore[union-attr]
        food_children_string = food_child.get_attribute('class')
        if food_children_string:
            months_countries = food_children_string.split()
            food_to_month_country[food] = [month_country for month_country in months_countries if '-' in month_country]
    month_country_to_foods: dict = {} # type: ignore[type-arg]
    for food in food_to_month_country:
        for month_country in food_to_month_country[food]:
            month_country_to_foods.setdefault(month_country, []).append(food)
    return dumps(month_country_to_foods, sort_keys=True)

def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page()
        page.on('pageerror', lambda exception: print(f'uncaught exception: {exception}')) # noqa: 201
        page.goto('https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe')
        month_country_to_fruits = get_month_country_to_food(page, '#Fruit > .fvgrid')
        with Path('dist/month-country-to-fruits.json').open('w', encoding='utf-8') as file:
            file.write(f'const monthCountryToFruitArrayObject = {month_country_to_fruits};')
        assert sha256(month_country_to_fruits.encode('utf-8')).hexdigest() == '044e94349d8dce547caee155a1e9e93158321a78dcb8252daa1beba3e9ae9920'
        month_country_to_vegetables = get_month_country_to_food(page, '#Vegetable > .fvgrid')
        with Path('dist/month-country-to-vegetables.json').open('w', encoding='utf-8') as file:
            file.write(f'const monthCountryToVegetableArrayObject = {month_country_to_vegetables};')
        assert sha256(month_country_to_vegetables.encode('utf-8')).hexdigest() == '47c61adc33f3f33e51805930433759110d67327eb414b003da35ac8331255dcb'
        browser.close()


if __name__ == '__main__':
    main()
