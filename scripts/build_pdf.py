import re
import os
import subprocess

def md_to_html(md_text):
    lines = md_text.splitlines()
    html_lines = []
    in_code_block = False
    code_lang = ""
    code_content = []
    in_list = False
    list_type = None # 'ul' or 'ol'
    in_table = False
    table_rows = []

    def close_list():
        nonlocal in_list, list_type
        if in_list:
            html_lines.append(f"</{list_type}>")
            in_list = False
            list_type = None

    def close_table():
        nonlocal in_table, table_rows
        if in_table:
            t_html = ['<table class="formal-table">']
            for i, row in enumerate(table_rows):
                if i == 0:
                    t_html.append("<thead><tr>")
                    for cell in row:
                        t_html.append(f"<th>{inline_format(cell)}</th>")
                    t_html.append("</tr></thead><tbody>")
                else:
                    t_html.append("<tr>")
                    for cell in row:
                        t_html.append(f"<td>{inline_format(cell)}</td>")
                    t_html.append("</tr>")
            t_html.append("</tbody></table>")
            html_lines.extend(t_html)
            in_table = False
            table_rows = []

    def inline_format(text):
        text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
        text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
        text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
        text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
        return text

    for line in lines:
        stripped = line.strip()

        # Code block fence
        if stripped.startswith("```"):
            close_list()
            close_table()
            if in_code_block:
                escaped_code = "\n".join(code_content).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                html_lines.append(f'<pre><code>{escaped_code}</code></pre>')
                in_code_block = False
                code_content = []
            else:
                in_code_block = True
                code_lang = stripped[3:].strip()
                code_content = []
            continue

        if in_code_block:
            code_content.append(line)
            continue

        # Tables
        if stripped.startswith("|") and stripped.endswith("|"):
            close_list()
            cells = [c.strip() for c in stripped[1:-1].split("|")]
            if all(re.match(r'^:?-+:?$', c) for c in cells):
                continue # separator row
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(cells)
            continue
        else:
            close_table()

        # Blank line
        if not stripped:
            close_list()
            continue

        # Headings
        if stripped.startswith("#"):
            close_list()
            m = re.match(r'^(#{1,6})\s+(.*)$', stripped)
            if m:
                level = len(m.group(1))
                h_text = inline_format(m.group(2))
                html_lines.append(f"<h{level}>{h_text}</h{level}>")
                continue

        # Horizontal Rule
        if re.match(r'^(-{3,}|\*{3,}|_{3,})$', stripped):
            close_list()
            html_lines.append("<hr />")
            continue

        # Blockquote
        if stripped.startswith(">"):
            close_list()
            bq_text = inline_format(stripped[1:].strip())
            html_lines.append(f"<blockquote><p>{bq_text}</p></blockquote>")
            continue

        # Unordered list
        ul_match = re.match(r'^[-*+]\s+(.*)$', stripped)
        if ul_match:
            if not in_list or list_type != 'ul':
                close_list()
                in_list = True
                list_type = 'ul'
                html_lines.append("<ul>")
            html_lines.append(f"<li>{inline_format(ul_match.group(1))}</li>")
            continue

        # Ordered list
        ol_match = re.match(r'^\d+\.\s+(.*)$', stripped)
        if ol_match:
            if not in_list or list_type != 'ol':
                close_list()
                in_list = True
                list_type = 'ol'
                html_lines.append("<ol>")
            html_lines.append(f"<li>{inline_format(ol_match.group(1))}</li>")
            continue

        close_list()
        html_lines.append(f"<p>{inline_format(stripped)}</p>")

    close_list()
    close_table()
    return "\n".join(html_lines)


def generate_document():
    # 1. Read PRD.md
    prd_path = os.path.join("docs", "PRD.md")
    with open(prd_path, "r", encoding="utf-8") as f:
        prd_text = f.read()

    # 2. Read AI_AGENT_REFERENCE.md
    ref_path = "AI_AGENT_REFERENCE.md"
    with open(ref_path, "r", encoding="utf-8") as f:
        ref_text = f.read()

    prd_html = md_to_html(prd_text)
    ref_html = md_to_html(ref_text)

    # Formal, Clean, Professional Academic / Technical Report CSS (No decorative designs)
    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>PyQuest — Dokumen Acuan AI & PRD</title>
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

  .formal-header {{
    text-align: center;
    padding-bottom: 15px;
    margin-bottom: 25px;
    border-bottom: 2px solid #000000;
  }}

  .formal-title {{
    font-size: 16pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #000000;
    margin: 0 0 6px 0;
    letter-spacing: 0.5px;
  }}

  .formal-subtitle {{
    font-size: 11pt;
    color: #333333;
    margin: 0 0 12px 0;
    font-weight: 600;
  }}

  .formal-metadata {{
    font-size: 9pt;
    color: #444444;
    line-height: 1.5;
  }}

  .section-divider {{
    margin-top: 35px;
    margin-bottom: 15px;
    padding-top: 15px;
    border-top: 1.5px solid #000000;
    break-after: avoid;
  }}

  .section-divider h1 {{
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #000000;
    margin: 0 0 8px 0;
    border: none;
    padding: 0;
  }}

  .page-break {{
    page-break-before: always;
    break-before: page;
  }}

  h1 {{
    font-size: 13pt;
    font-weight: bold;
    color: #000000;
    border-bottom: 1px solid #333333;
    padding-bottom: 4px;
    margin-top: 20px;
    margin-bottom: 10px;
    break-after: avoid;
  }}

  h2 {{
    font-size: 11.5pt;
    font-weight: bold;
    color: #000000;
    margin-top: 16px;
    margin-bottom: 8px;
    break-after: avoid;
  }}

  h3 {{
    font-size: 10.5pt;
    font-weight: bold;
    color: #222222;
    margin-top: 12px;
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
    font-style: normal;
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
    line-height: 1.4;
    margin: 12px 0;
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

  hr {{
    border: none;
    height: 1px;
    background-color: #cccccc;
    margin: 16px 0;
  }}

  a {{
    color: #111111;
    text-decoration: underline;
  }}

  .formal-footer {{
    margin-top: 30px;
    padding-top: 10px;
    border-top: 1px solid #000000;
    font-size: 8pt;
    color: #555555;
    text-align: center;
  }}
</style>
</head>
<body>

  <div class="formal-header">
    <div class="formal-title">DOKUMEN SPESIFIKASI PRODUK (PRD) & PANDUAN ACUAN AI AGENT</div>
    <div class="formal-subtitle">PyQuest — Petualangan Logika Python (Platform Edukasi Pemrograman Berbasis Game)</div>
    <div class="formal-metadata">
      <strong>Kategori Kompetisi:</strong> Telkomsel Coding Competition — Web Education for Kids<br>
      <strong>Struktur Dokumen:</strong> Bagian I: Product Requirements Document (PRD) | Bagian II: AI Agent Operational Reference<br>
      <strong>Repositori Sumber:</strong> https://github.com/usamah-io/pyquest &bull; <strong>Status:</strong> Dokumen Resmi (Verified)
    </div>
  </div>

  <!-- BAGIAN 1 -->
  <div class="section-divider">
    <h1>BAGIAN I: PRODUCT REQUIREMENTS DOCUMENT (PRD) LENGKAP</h1>
  </div>
  <div class="prd-content">
    {prd_html}
  </div>

  <!-- PAGE BREAK -->
  <div class="page-break"></div>

  <!-- BAGIAN 2 -->
  <div class="section-divider">
    <h1>BAGIAN II: PANDUAN OPERASIONAL AI AGENT (12 BAB LENGKAP)</h1>
  </div>
  <div class="ref-content">
    {ref_html}
  </div>

  <div class="formal-footer">
    Dokumen ini merupakan acuan resmi spesifikasi teknis dan panduan operasional AI Agent untuk pengembangan PyQuest.
  </div>

</body>
</html>
"""

    temp_html = "PyQuest_AI_Documentation.html"
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    browser_bin = chrome_path if os.path.exists(chrome_path) else edge_path

    out_pdf = "PyQuest_AI_Documentation.pdf"
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
        print(f"Generated clean formal PDF: {abs_pdf} ({os.path.getsize(abs_pdf)} bytes)")
        desktop_pdf = os.path.join(r"C:\Users\ASUS\Desktop", "PyQuest_AI_Documentation.pdf")
        with open(abs_pdf, "rb") as sf, open(desktop_pdf, "wb") as df:
            df.write(sf.read())
        print(f"Copied formal PDF to Desktop: {desktop_pdf}")
    else:
        print("Error creating PDF:", res.stderr)

if __name__ == "__main__":
    generate_document()
