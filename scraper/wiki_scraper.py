from bs4 import BeautifulSoup

def parse_page(html_data):
    # Parse the HTML data with BeautifulSoup
    soup = BeautifulSoup(html_data, 'html.parser')

    # Extract item name from the heading (h1) or the first paragraph (p)
    item_name_element = soup.select_one('h1, p')
    item_name = item_name_element.text.strip()

    # Extract item properties
    item_properties = []
    property_elements = soup.select('ul.bg3wiki-property-list li')
    for element in property_elements:
        item_properties.append(element.text.strip())

    # Extract item special
    item_special = []
    special_section = soup.select_one('#Special')
    if special_section:
        special_ul = special_section.find_next('ul')
        if special_ul:
            special_items = special_ul.find_all('li')
            item_special = [item.text.strip() for item in special_items]

    # Extract item image URL
    item_image_url = soup.select_one('div.floatright img')['src']

    # Extract where to find
    try:
        flavorText = soup.select('div.bg3wiki-blockquote-text')[0].text.strip()
    except:
        flavorText = ''

    # Extract where to find
    where_to_find = []
    where_to_find_section = soup.select_one('#Where_to_Find')
    if where_to_find_section:
        where_to_find_ul = where_to_find_section.find_next('ul')
        if where_to_find_ul:
            where_to_find_items = where_to_find_ul.find_all('li')
            where_to_find = [item.text.strip() for item in where_to_find_items]

    return {
        'name': item_name,
        'properties': item_properties,
        'special': item_special,
        'imageUrl': item_image_url,
        'flavorText': flavorText,
        'whereToFind': where_to_find
    }



def test_parse_page():
    # test with sample HTML
    with open('stubs/gold_wyrmling_staff_page.html', 'r') as f:
        html_data = f.read()
    parsed = parse_page(html_data)
    print(parsed)
    assert parsed['name'] == 'Gold Wyrmling Staff'
    assert parsed['imageUrl'] == '/w/images/thumb/0/09/Quarterstaff_PlusOne_Icon.png/300px-Quarterstaff_PlusOne_Icon.png'
    assert parsed['flavorText'] == 'The fire engulfing this staff seems to feed off thin air, never once burning the dark wood.'



if __name__ == '__main__':
    test_parse_page()
