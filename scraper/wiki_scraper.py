from bs4 import BeautifulSoup
import re
import json

from wiki_utils import cache_image_by_item_name, get_wiki_url

def _map_properties(properties: list[str]):
    is_weapon = False
    mapped_props = {}
    for i, prop in enumerate(properties):
        if 'Rarity:' in prop:
            mapped_props['rarity'] = re.search(r'Rarity: (.*)', prop).group(1)
        if 'Damage:' in prop:
            mapped_props['dmg'] = properties[i+1]
            is_weapon = True
        if 'One-handed damage' in prop:
            mapped_props['dmg_1'] = properties[i+1]
            is_weapon = True
        if 'Two-handed damage' in prop:
            mapped_props['dmg_2'] = properties[i+1]
            is_weapon = True
        if 'Extra damage:' in prop:
            mapped_props['extra_dmg'] = properties[i+1]
        if 'Required Proficiency:' in prop:
            mapped_props['requiredProficiency'] = re.search(r'Required Proficiency: (.*)', prop).group(1)
        if is_weapon and 'Details:' in prop:
            mapped_props['weapon_type'] = properties[i+1]
        if is_weapon and 'Range:' in prop:
            mapped_props['range'] = re.search(r'Range: (.*)', prop).group(1)
        if 'Enchantment:' in prop:
            mapped_props['enchantment'] = re.search(r'Enchantment: (.*)', prop).group(1)
        if 'One-Handed' in prop:
            mapped_props['hands'] = 'One-Handed'
        if 'Two-Handed' in prop:
            mapped_props['hands'] = 'Two-Handed'
        if 'Versatile' in prop:
            mapped_props['hands'] = 'Versatile'
        if 'Finesse' in prop:
            mapped_props['finesse'] = True
        if 'Range:' in prop:
            mapped_props['range'] = re.search(r'Range: (.*)', prop).group(1)

    return mapped_props

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
    item_image_url = ''
    try:
        img_url = 'https://bg3.wiki' + soup.select_one('div.floatright img')['src']
        image_path = cache_image_by_item_name(item_name, img_url)
        item_image_url = image_path
    except Exception as e:
        print('failed to get image url due to exception:\n', e)

    # Extract where to find
    try:
        flavorText = soup.select('div.bg3wiki-blockquote-text')[0].text.strip()
    except:
        flavorText = ''

    # Extract where to find
    where_to_find = ''
    where_to_find_section = soup.select_one('#Where_to_Find')
    if where_to_find_section:
        where_to_find_toolbox = where_to_find_section.find_next('div', {'class': 'bg3wiki-tooltip-box'})
        if where_to_find_toolbox:
            where_to_find = where_to_find_toolbox.text.strip()

    return {
        'name': item_name,
        'properties': item_properties,
        'mappedProperties': _map_properties(item_properties),
        'special': item_special,
        'imageUrl': item_image_url,
        'flavorText': flavorText,
        'location': where_to_find
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


def test():
    html = get_wiki_url('https://bg3.wiki/wiki/Staff_of_Spellpower')
    parsed = parse_page(html)
    print(json.dumps(parsed, indent=2))

def test_map_properties():
    test_props = ['One-handed damage:', '1d6  (1~6) + Strength Modifier \xa0Bludgeoning', 'Two-handed damage:', '1d8  (1~8) + Strength Modifier \xa0Bludgeoning', 'Details:', 'Quarterstaves', 'Rarity: Uncommon', 'Enchantment: None', 'Versatile', 'Dippable', 'Range: 1.5\u202fm / 5\u202fft', 'Weight: 1.8\u202fkg / 3.6\u202flb', 'Price: 10\u202fgp', '', '']
    mapped = _map_properties(test_props)
    print(json.dumps(mapped, indent=2))
    assert  'Uncommon' == mapped.get('rarity')
    

def scrape_ALL():
    with open('stubs/all_links.json', 'r') as f:
        all_links = json.loads(f.read())

    all_items = []
    failed_items = []
    for item_type, links in all_links.items():
        for link in links:
            print(f'getting {link}')
            try:
                html_data = get_wiki_url(link)
                parsed = parse_page(html_data)
                parsed['type'] = item_type
                all_items.append(parsed)
            except Exception as e:
                print(f'failed to get {link} due to exception:\n{e}')
                failed_items.append(link)

    with open('stubs/all_items.json', 'w') as f:
        f.write(json.dumps(all_items, indent=4))
    
    with open('stubs/failed_items.json', 'w') as f:
        f.write(json.dumps(failed_items, indent=4))

if __name__ == '__main__':
    scrape_ALL()
