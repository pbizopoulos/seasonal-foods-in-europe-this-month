import json

from playwright.sync_api import sync_playwright


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page()
        page.on('pageerror', lambda exception: (_ for _ in ()).throw(Exception(f'uncaught exception: {exception}')))
        page.goto('https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe')
        fruit_child_list = page.query_selector('#Fruit > .fvgrid').query_selector_all('xpath=child::*')
        fruit_to_month_country_dict = {}
        for fruit_child in fruit_child_list:
            fruit = fruit_child.query_selector('strong').inner_text().replace(' ', '-').replace('(', '').replace(')', '')
            if fruit_child.get_attribute('class'):
                month_country_list = fruit_child.get_attribute('class').split()
                fruit_to_month_country_dict[fruit] = [month_country for month_country in month_country_list if '-' in month_country]
        month_country_to_fruit_array_dict = {}
        for fruit in fruit_to_month_country_dict:
            for month_country in fruit_to_month_country_dict[fruit]:
                month_country_to_fruit_array_dict.setdefault(month_country, []).append(fruit)
        with open('dist/month-country-to-fruit-array.json', 'w', encoding='utf-8') as file:
            file.write(f'const monthCountryToFruitArrayObject = {json.dumps(month_country_to_fruit_array_dict)};')
        vegetable_child_list = page.query_selector('#Vegetable > .fvgrid').query_selector_all('xpath=child::*')
        vegetable_to_month_country_dict = {}
        for vegetable_child in vegetable_child_list:
            vegetable = vegetable_child.query_selector('strong').inner_text().replace(' ', '-').replace('(', '').replace(')', '')
            if vegetable_child.get_attribute('class'):
                month_country_list = vegetable_child.get_attribute('class').split()
                vegetable_to_month_country_dict[vegetable] = [month_country for month_country in month_country_list if '-' in month_country]
        month_country_to_vegetable_array_dict = {}
        for vegetable in vegetable_to_month_country_dict:
            for month_country in vegetable_to_month_country_dict[vegetable]:
                month_country_to_vegetable_array_dict.setdefault(month_country, []).append(vegetable)
        with open('dist/month-country-to-vegetable-array.json', 'w', encoding='utf-8') as file:
            file.write(f'const monthCountryToVegetableArrayObject = {json.dumps(month_country_to_vegetable_array_dict)};')
        browser.close()


if __name__ == '__main__':
    main()
