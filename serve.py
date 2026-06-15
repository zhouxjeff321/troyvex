#!/usr/bin/env python3
"""Simple static file server with extensionless URL support."""
import http.server
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

ROUTES = {
    '/about': 'pages/about/about.html',
    # '/alumni': 'pages/about/alumni.html',  # hidden — page not finished
    '/ourwork': 'pages/about/ourwork.html',
    '/teams': 'pages/teams/teams.html',
    '/teama': 'pages/teams/teama.html',
    '/teamb': 'pages/teams/teamb.html',
    '/teamc': 'pages/teams/teamc.html',
    '/teamd': 'pages/teams/teamd.html',
    '/teame': 'pages/teams/teame.html',
    '/teamx': 'pages/teams/teamx.html',
    '/teamy': 'pages/teams/teamy.html',
    '/events': 'pages/events/events.html',
    '/gallery': 'pages/events/gallery.html',
    '/awards': 'pages/program/awards.html',
    '/sponsors': 'pages/support/sponsors.html',
    '/donate': 'pages/support/donate.html',
    '/join': 'pages/support/join.html',
    '/contact': 'pages/support/contact.html',
}


def is_workspace_file(relative_path):
    full_path = os.path.realpath(os.path.join(DIRECTORY, relative_path.lstrip('/')))
    return full_path.startswith(DIRECTORY + os.sep) and os.path.isfile(full_path)


class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]

        # Try the path as-is first (static files, images, css, js, etc.)
        # Use realpath to prevent path traversal (e.g. /../etc/passwd)
        if is_workspace_file(path):
            return super().do_GET()

        # Bare /
        if path in ('/', ''):
            self.path = '/index.html'
            return super().do_GET()

        # Clean public routes now map to grouped source files under pages/.
        if path.rstrip('/') in ROUTES:
            self.path = '/' + ROUTES[path.rstrip('/')]
            return super().do_GET()

        # Try appending .html for root-level or direct nested HTML requests.
        if not path.endswith('.html'):
            html_path = path.rstrip('/') + '.html'
            if is_workspace_file(html_path):
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
