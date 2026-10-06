import os
import subprocess
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, 'scripts')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
ICONS_DIR = os.path.join(STATIC_DIR, 'icons')

os.makedirs(ICONS_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print(f"Using browser: {CHROME_PATH}")

master_std_path = os.path.join(SCRIPTS_DIR, 'master_std.png')
master_mask_path = os.path.join(SCRIPTS_DIR, 'master_maskable.png')

html_std = "file:///" + os.path.join(SCRIPTS_DIR, 'render_std.html').replace('\\', '/')
html_mask = "file:///" + os.path.join(SCRIPTS_DIR, 'render_maskable.html').replace('\\', '/')

# Render master_std.png
cmd_std = [
    CHROME_PATH,
    "--headless=new",
    "--disable-gpu",
    "--window-size=512,512",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    f"--screenshot={master_std_path}",
    html_std
]
print("Rendering standard master icon...")
subprocess.run(cmd_std, check=True)

# Render master_maskable.png
cmd_mask = [
    CHROME_PATH,
    "--headless=new",
    "--disable-gpu",
    "--window-size=512,512",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    f"--screenshot={master_mask_path}",
    html_mask
]
print("Rendering maskable master icon...")
subprocess.run(cmd_mask, check=True)

img_std = Image.open(master_std_path).convert('RGBA')
img_mask = Image.open(master_mask_path).convert('RGBA')

# Crop to exact 512x512 if window screenshot has slight offset
img_std = img_std.crop((0, 0, 512, 512))
img_mask = img_mask.crop((0, 0, 512, 512))

sizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512]

for sz in sizes:
    resized = img_std.resize((sz, sz), Image.Resampling.LANCZOS)
    out_file = os.path.join(ICONS_DIR, f'icon-{sz}.png')
    resized.save(out_file, 'PNG')
    print(f"Generated {out_file} ({sz}x{sz})")

# Apple touch icon (180x180) in static/
apple_icon = img_std.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon_path = os.path.join(STATIC_DIR, 'apple-touch-icon.png')
apple_icon.save(apple_icon_path, 'PNG')
print(f"Generated {apple_icon_path}")

# Maskable icons
for sz in [192, 512]:
    resized = img_mask.resize((sz, sz), Image.Resampling.LANCZOS)
    out_file = os.path.join(ICONS_DIR, f'icon-maskable-{sz}.png')
    resized.save(out_file, 'PNG')
    print(f"Generated maskable {out_file} ({sz}x{sz})")

# Favicon.ico containing 16x16, 32x32, 48x48
ico_path = os.path.join(STATIC_DIR, 'favicon.ico')
img_std.save(
    ico_path,
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
print(f"Generated {ico_path} with sizes [16, 32, 48]")

print("All PWA icons generated successfully!")
