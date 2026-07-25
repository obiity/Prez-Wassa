from PIL import Image
from collections import Counter
import sys

def get_prominent_colors(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert('RGBA')
        colors = img.getcolors(img.size[0] * img.size[1])
        
        # Filter out fully transparent, white-ish, and black-ish pixels
        filtered_colors = []
        for count, color in colors:
            r, g, b, a = color
            if a < 200: continue
            
            # Skip near white
            if r > 240 and g > 240 and b > 240: continue
            
            # Skip near black
            if r < 15 and g < 15 and b < 15: continue
            
            filtered_colors.append((count, (r, g, b)))
            
        filtered_colors.sort(reverse=True, key=lambda x: x[0])
        
        # Get top 15 colors to find the distinct ones
        top_colors = []
        for count, color in filtered_colors[:30]:
            hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
            top_colors.append((hex_color, count))
            
        for c in top_colors:
            print(c)
            
    except Exception as e:
        print("Error:", e)

get_prominent_colors('d:/Wassa/apps/web/public/logo-color.png')
