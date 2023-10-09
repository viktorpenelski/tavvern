from bs4 import BeautifulSoup
import json

from wiki_utils import get_wiki_url

ITEM_TABLES = {
    'weapons': 'https://bg3.wiki/wiki/List_of_Weapons',
    'clothing': 'https://bg3.wiki/wiki/Clothing',
    'armour': 'https://bg3.wiki/wiki/Armour',
    'shields': 'https://bg3.wiki/wiki/Shields',
    'headwear': 'https://bg3.wiki/wiki/Headwear',
    'cloaks': 'https://bg3.wiki/wiki/Cloaks',
    'handwear': 'https://bg3.wiki/wiki/Handwear',
    'footwear': 'https://bg3.wiki/wiki/Footwear',
    'amulets': 'https://bg3.wiki/wiki/Amulets',
    'rings': 'https://bg3.wiki/wiki/Rings',
}

def _get_links_from_table(table):
    links = []
    for row in table.find_all('tr'):
        cells = row.find_all('td')
        if len(cells) > 0:
            cell = cells[0]
            link = cell.find('a')
            try:
                links.append('https://bg3.wiki' + link.get('href'))
            except Exception as e:
                print(f'failed to get link from {link} due to exception:\n{e}')
    print(f'links: {links}')
    return links

def parse_page(html_data):
    # Parse the HTML data with BeautifulSoup
    soup = BeautifulSoup(html_data, 'html.parser')

    tables = soup.select('.wikitable')
    links = [link for table in tables for link in _get_links_from_table(table)]
    return links


def _all_links():
    all_links_dict = {}
    for item_type, url in ITEM_TABLES.items():
        print(f'getting links for {item_type}')
        html_data = get_wiki_url(url)
        links = parse_page(html_data)
        all_links_dict[item_type] = links

    with open('stubs/all_links.json', 'w') as f:
        f.write(json.dumps(all_links_dict, indent=4))

def test():
    with open('stubs/wiki_list_of_weapons.html', 'r') as f:
        html_data = f.read()
        return parse_page(html_data)

if __name__ == '__main__':
    _all_links()