import base64
import os
import time

def get_wiki_url(wiki_url, backoff_after_fetch=1):

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
    time.sleep(backoff_after_fetch)
    return html_data
