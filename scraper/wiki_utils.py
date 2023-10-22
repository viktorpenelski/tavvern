import base64
import os
import time
import urllib.request

def url_to_base64(url):
    return base64.b64encode(url.encode('utf-8')).decode('utf-8')

def base64_to_url(base64_str):
    return base64.b64decode(base64_str.encode('utf-8')).decode('utf-8')

def get_wiki_url(wiki_url, backoff_after_fetch=1):


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


def cache_image_by_item_name(item_name, image_url, extension = 'png'):
    encoded_name = url_to_base64(item_name)
    cached_image_path = f'images/{encoded_name}.{extension}'
    if os.path.isfile(cached_image_path):
        return cached_image_path
    urllib.request.urlretrieve(image_url, cached_image_path)
    return cached_image_path


def test():
    cache_image_by_item_name('Artificial Leech', 'https://bg3.wiki/w/images/9/91/Artificial_Leech_Faded.png')

if __name__ == '__main__':
    test()
