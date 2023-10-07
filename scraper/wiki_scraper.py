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
    special_elements = soup.select('h3#Special + ul li')
    for element in special_elements:
        item_special.append(element.text.strip())

    # Extract item image URL
    item_image_url = soup.select_one('div.floatright img')['src']

    # Extract where to find
    try:
        flavorText = soup.select('div.bg3wiki-blockquote-text')[0].text.strip()
    except:
        flavorText = ''

    return {
        'name': item_name,
        'properties': item_properties,
        'special': item_special,
        'imageUrl': item_image_url,
        'flavorText': flavorText,
    }

if __name__ == '__main__':
    # test with sample HTML
    with open('stubs/gold_wyrmling_staff_page.html', 'r') as f:
        html_data = f.read()
    parse_page(html_data)