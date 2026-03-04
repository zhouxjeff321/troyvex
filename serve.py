#!/usr/bin/env python3
"""Simple static file server with extensionless URL support."""
import http.server
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]

        # Try the path as-is first (static files, images, css, js, etc.)
        # Use realpath to prevent path traversal (e.g. /../etc/passwd)
        full = os.path.realpath(os.path.join(DIRECTORY, path.lstrip('/')))
        if full.startswith(DIRECTORY + os.sep) and os.path.isfile(full):
            return super().do_GET()

        # Bare /
        if path in ('/', ''):
            self.path = '/index.html'
            return super().do_GET()

        # Try appending .html (all HTML files are at root)
        if not path.endswith('.html'):
            html_path = path.rstrip('/') + '.html'
            full_html = os.path.join(DIRECTORY, html_path.lstrip('/'))
            if os.path.isfile(full_html):
                self.path = html_path
                return super().do_GET()

        return super().do_GET()

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}", flush=True)

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with http.server.HTTPServer(('', PORT), ExtensionlessHandler) as httpd:
        print(f"Serving Troy VEX site at http://localhost:{PORT}", flush=True)
        httpd.serve_forever()
