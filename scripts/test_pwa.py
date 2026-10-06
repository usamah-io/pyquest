import urllib.request

urls = [
    'http://localhost:4173/',
    'http://localhost:4173/manifest.webmanifest',
    'http://localhost:4173/manifest.json',
    'http://localhost:4173/service-worker.js',
    'http://localhost:4173/favicon.svg',
    'http://localhost:4173/favicon.ico',
    'http://localhost:4173/apple-touch-icon.png',
    'http://localhost:4173/icons/icon-16.png',
    'http://localhost:4173/icons/icon-32.png',
    'http://localhost:4173/icons/icon-192.png',
    'http://localhost:4173/icons/icon-512.png',
    'http://localhost:4173/icons/icon-maskable-192.png',
    'http://localhost:4173/icons/icon-maskable-512.png'
]

passed = 0
for u in urls:
    try:
        r = urllib.request.urlopen(u)
        ct = r.headers.get('Content-Type')
        print(f"[PASS] {u} -> Status: {r.status} ({ct})")
        passed += 1
    except Exception as e:
        print(f"[FAIL] {u} -> {e}")

print(f"\nResult: {passed}/{len(urls)} passed!")
