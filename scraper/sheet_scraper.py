import json

ACT = "1"

with open(f'stubs/act{ACT}.json' , 'r') as f:
    json_data = f.read()

data = json.loads(json_data)

headers = (x['text'] for x in data[0])
headers = (h.title().replace(" ", "") for h in headers)
headers = [h[0].lower() + h[1:] if h else '' for h in headers]

def map_item(row):
    item = {}
    for i in range(len(headers)):
        item[headers[i]] = ''.join([r['text'] for r in row[i]['richText']])
    item['act'] = ACT
    item['wikiUrl'] = row[0]['richText'][0]['url']
    return item

items = []
for row in data[1:]:
    mapped = map_item(row)
    items.append(mapped)

with open(f'stubs/act{ACT}_items.json', 'w') as f:
    f.write(json.dumps(items, indent=4))
