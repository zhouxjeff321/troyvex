#!/usr/bin/env python3
"""Simple static file server with extensionless URL support."""
import http.server
import os

PORT = 3000
DIRECTORY = os.path.realpath(os.path.dirname(os.path.abspath(__file__)))

SECURITY_HEADERS = {
    "Content-Security-Policy": (
        "default-src 'self'; "
        "base-uri 'self'; "
        "object-src 'none'; "
        "frame-ancestors 'self'; "
        "img-src 'self' data: https:; "
        "font-src 'self' https://fonts.gstatic.com data:; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com "
        "https://www.google-analytics.com https://us-assets.i.posthog.com https://app.cal.com; "
        "script-src-attr 'none'; "
        "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com "
        "https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com "
        "https://stats.g.doubleclick.net https://*.g.doubleclick.net https://us.i.posthog.com "
        "https://us-assets.i.posthog.com https://app.cal.com https://api.cal.com https://cal.com; "
        "frame-src 'self' https://www.google.com https://cal.com https://app.cal.com; "
        "form-action 'self' https://forms.gle https://cal.com; "
        "worker-src 'self' blob:"
    ),
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
}

ROUTES = {
    '/about': 'pages/about/about.html',
    # '/alumni': 'pages/about/alumni.html',  # hidden — page not finished
    '/ourwork': 'pages/about/ourwork.html',
    '/teams': 'pages/teams/teams.html',
    '/archivedteams': 'pages/teams/archivedteams.html',
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
    '/summercamp': 'pages/support/summercamp.html',
    '/contact': 'pages/support/contact.html',
}


def is_workspace_file(relative_path):
    full_path = os.path.realpath(os.path.join(DIRECTORY, relative_path.lstrip('/')))
    try:
        is_inside_workspace = os.path.commonpath([DIRECTORY, full_path]) == DIRECTORY
    except ValueError:
        return False
    return is_inside_workspace and os.path.isfile(full_path)


class ExtensionlessHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        for header, value in SECURITY_HEADERS.items():
            self.send_header(header, value)
        super().end_headers()

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

        # Prefer root route files so local preview matches static deployment.
        if not path.endswith('.html'):
            html_path = path.rstrip('/') + '.html'
            if is_workspace_file(html_path):
                self.path = html_path
                return super().do_GET()

        # Fallback for grouped reference copies under pages/.
        if path.rstrip('/') in ROUTES:
            self.path = '/' + ROUTES[path.rstrip('/')]
            return super().do_GET()

        return super().do_GET()

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}", flush=True)

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with http.server.ThreadingHTTPServer(('', PORT), ExtensionlessHandler) as httpd:
        print(f"Serving Troy VEX site at http://localhost:{PORT}", flush=True)
        httpd.serve_forever()
