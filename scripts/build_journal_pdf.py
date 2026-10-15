import re
import os
import subprocess
from build_pdf import md_to_html

def generate_journal_pdf():
    journal_path = os.path.join("docs", "JURNAL_5_PROMPT_TERKURASI.md")
    with open(journal_path, "r", encoding="utf-8") as f:
        journal_text = f.read()

    journal_html = md_to_html(journal_text)

    # Formal, Clean, Non-Decorative CSS for Professional Paper / Competition Report
    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Jurnal 5 Prompt Terkurasi — PyQuest</title>
<style>
  @page {{
    size: A4;
    margin: 20mm 20mm 20mm 20mm;
    @bottom-center {{
      content: counter(page);
      font-size: 9pt;
      font-family: Arial, sans-serif;
      color: #333333;
    }}
  }}

  *, *:before, *:after {{
    box-sizing: border-box;
  }}

  body {{
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    color: #111111;
    background: #ffffff;
    font-size: 10pt;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }}

  h1 {{
    font-size: 15pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #000000;
    border-bottom: 2px solid #000000;
    padding-bottom: 6px;
    margin-top: 10px;
    margin-bottom: 12px;
    text-align: center;
    break-after: avoid;
  }}

  h2 {{
    font-size: 11pt;
    font-weight: normal;
    color: #333333;
    margin-top: 0;
    margin-bottom: 16px;
    text-align: center;
    font-style: italic;
    break-after: avoid;
  }}

  h3 {{
    font-size: 12pt;
    font-weight: bold;
    color: #000000;
    border-bottom: 1px solid #333333;
    padding-bottom: 4px;
    margin-top: 22px;
    margin-bottom: 10px;
    break-after: avoid;
  }}

  h4 {{
    font-size: 10.5pt;
    font-weight: bold;
    color: #222222;
    margin-top: 14px;
    margin-bottom: 6px;
    break-after: avoid;
  }}

  p {{
    margin: 0 0 10px 0;
    text-align: justify;
  }}

  ul, ol {{
    margin: 0 0 12px 0;
    padding-left: 24px;
  }}

  li {{
    margin-bottom: 4px;
  }}

  blockquote {{
    margin: 12px 0;
    padding: 8px 14px;
    background-color: #f8f9fa;
    border-left: 3px solid #333333;
    color: #222222;
    border-radius: 0;
    break-inside: avoid;
  }}

  blockquote p {{
    margin: 0;
  }}

  code {{
    font-family: Consolas, "Courier New", monospace;
    font-size: 8.5pt;
    background-color: #f1f3f5;
    color: #111111;
    padding: 2px 4px;
    border: 1px solid #dcdcdc;
    border-radius: 2px;
  }}

  pre {{
    background-color: #f8f9fa;
    color: #111111;
    padding: 10px 12px;
    border: 1px solid #cccccc;
    border-radius: 2px;
    overflow-x: auto;
    font-size: 8pt;
    line-height: 1.45;
    margin: 10px 0;
    break-inside: avoid;
    white-space: pre-wrap;
    word-break: break-word;
  }}

  pre code {{
    background: transparent;
    color: inherit;
    padding: 0;
    border: none;
    font-size: inherit;
  }}

  hr {{
    border: none;
    height: 1px;
    background-color: #cccccc;
    margin: 18px 0;
  }}

  a {{
    color: #111111;
    text-decoration: underline;
  }}

  table.formal-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    text-align: left;
    margin: 14px 0;
    border-top: 1.5px solid #000000;
    border-bottom: 1.5px solid #000000;
    break-inside: avoid;
  }}

  table.formal-table th {{
    border-bottom: 1.5px solid #000000;
    color: #000000;
    font-weight: bold;
    padding: 6px 8px;
    background: #ffffff;
  }}

  table.formal-table td {{
    padding: 5px 8px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top;
    color: #111111;
  }}
</style>
</head>
<body>
  {journal_html}
</body>
</html>
"""

    temp_html = "PyQuest_Jurnal_5_Prompt.html"
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser_bin = chrome_path if os.path.exists(chrome_path) else edge_path

    out_pdf = "PyQuest_Jurnal_5_Prompt.pdf"
    abs_html = os.path.abspath(temp_html)
    abs_pdf = os.path.abspath(out_pdf)

    cmd = [
        browser_bin,
        "--headless",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={abs_pdf}",
        "--no-pdf-header-footer",
        abs_html
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(abs_pdf):
        print(f"Generated clean formal Journal PDF: {abs_pdf} ({os.path.getsize(abs_pdf)} bytes)")
        desktop_pdf = os.path.join(r"C:\Users\ASUS\Desktop", "PyQuest_Jurnal_5_Prompt.pdf")
        with open(abs_pdf, "rb") as sf, open(desktop_pdf, "wb") as df:
            df.write(sf.read())
        print(f"Copied formal Journal PDF to Desktop: {desktop_pdf}")
    else:
        print("Error creating journal PDF:", res.stderr)

if __name__ == "__main__":
    generate_journal_pdf()
