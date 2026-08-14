import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Set target site and local directory
url = "https://moseleygj.github.io/MP.html"
output_dir = "./downloaded_images"
os.makedirs(output_dir, exist_ok=True)

# Fake standard browser headers to bypass server firewalls
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all <img> tags on the webpage
images = soup.find_all('img')
print(f"Discovered {len(images)} total image assets.")

for index, img in enumerate(images):
    img_url = img.get('src')
    if not img_url:
        continue
        
    # Crucial step: Convert relative links (/images/pic.jpg) into absolute urls
    full_url = urljoin(url, img_url)
    
    try:
        img_data = requests.get(full_url, headers=headers).content
        
        # Pull file extension or default to .jpg
        ext = os.path.splitext(full_url)[1]
        if not ext or len(ext) > 5:
            ext = ".jpg"
            
        # Fix the duplication trap: Enforce sequential numbers for names
        filename = f"macro_pad_{index:02d}{ext}"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'wb') as f:
            f.write(img_data)
        print(f"Successfully saved: {filename}")
        
    except Exception as e:
        print(f"Failed downloading {full_url}: {e}")
