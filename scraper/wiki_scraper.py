from bs4 import BeautifulSoup

# Sample HTML data (replace this with your actual HTML content)
with open('stubs/gold_wyrmling_staff_page.html', 'r') as f:
    html_data = f.read()

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
where_to_find = soup.select('div.bg3wiki-blockquote-text')[0].text.strip()

# Print the extracted information
print("Item Name:", item_name)
print("Item Properties:", item_properties)
print("Item Special:", item_special)
print("Item Image URL:", item_image_url)
print("Where to Find:", where_to_find)