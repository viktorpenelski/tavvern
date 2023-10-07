import json
import base64
import os
from wiki_scraper import parse_page


ACT = "1"


def get_wiki_url(wiki_url):

    def url_to_base64(url):
        return base64.b64encode(url.encode('utf-8')).decode('utf-8')

    def base64_to_url(base64_str):
        return base64.b64decode(base64_str.encode('utf-8')).decode('utf-8')
    
    encoded_url = url_to_base64(wiki_url)
    
    if os.path.isfile(f'cache/{encoded_url}.html'):
        print(f'using cached file for {wiki_url}')
        with open(f'cache/{encoded_url}.html', 'r') as f:
            return f.read()

    print(f'fetching {wiki_url} and saving it as cache/{encoded_url}.html')
    import urllib.request
    with urllib.request.urlopen(wiki_url) as response:
        html_data = response.read()

    with open(f'cache/{encoded_url}.html', 'w') as f:
        f.write(html_data.decode('utf-8'))
    
    return html_data

def img_url_from_wiki_url(wiki_url):
    
    # get the HTML data from the url without using requests
    html_data = get_wiki_url(wiki_url)
    parsed = parse_page(html_data)
    return parsed['imageUrl']


def map_item(row):
    item = {}
    for i in range(len(headers)):
        item[headers[i]] = ''.join([r['text'] for r in row[i]['richText']])
    item['act'] = ACT
    item['wikiUrl'] = row[0]['richText'][0]['url']
    item['imgUrl'] = 'https://bg3.wiki' + img_url_from_wiki_url(item['wikiUrl'])
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
            mapped = map_item(row)
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
    html_data = get_wiki_url('https://bg3.wiki/wiki/Helldusk_Boots')
    parsed = parse_page(html_data)
    print(parsed)

if __name__ == '__main__':
    test()