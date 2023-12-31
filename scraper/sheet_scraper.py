import json
from wiki_utils import get_wiki_url
from wiki_scraper import parse_page


ACT = "1"


def scrape_from_wiki_url(wiki_url):
    
    # get the HTML data from the url without using requests
    html_data = get_wiki_url(wiki_url)
    parsed = parse_page(html_data)
    return parsed


def map_item(row, headers):
    item = {}
    for i in range(len(headers)):
        item[headers[i]] = ''.join([r['text'] for r in row[i]['richText']])
    item['act'] = ACT
    item['wikiUrl'] = row[0]['richText'][0]['url']
    scraped = scrape_from_wiki_url(item['wikiUrl'])
    item['imgUrl'] = 'https://bg3.wiki' + scraped['imgUrl']
    item['flavorText'] = scraped['flavorText']
    return item



def main():
    with open(f'stubs/act{ACT}.json' , 'r') as f:
        json_data = f.read()

    data = json.loads(json_data)

    headers = (x['text'] for x in data[0])
    headers = (h.title().replace(" ", "") for h in headers)
    headers = [h[0].lower() + h[1:] if h else '' for h in headers]

    items = []
    failed_items = []
    for row in data[1:]:
        try:
            mapped = map_item(row, headers)
            items.append(mapped)
            print(len(items))
            print(mapped)
        except Exception as e:
            print(f'failed to map row: {row} due to exception:\n{e}' )
            failed_items.append(row)

    with open(f'stubs/act{ACT}_failed_items.json', 'w') as f:
        f.write(json.dumps(failed_items, indent=4))

    with open(f'stubs/act{ACT}_items.json', 'w') as f:
        f.write(json.dumps(items, indent=4))


def test():
    html_data = get_wiki_url('https://bg3.wiki/wiki/Boots_of_Speed')
    parsed = parse_page(html_data)
    print (json.dumps(parsed, indent=2))

if __name__ == '__main__':
    test()
