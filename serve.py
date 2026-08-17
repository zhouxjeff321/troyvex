#!/usr/bin/env python3
"""Local preview server for the troyvex static site.

Mirrors the Vercel config so local behavior matches production:
  - cleanUrls: /about resolves to about.html
  - a request for /about.html redirects to /about (as Vercel does)
  - unknown paths fall through to a 404

Usage: python serve.py [port]   (default 3000)
"""

import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
REDIRECTS = {
    "/join": "/apply",
    "/pages/support/join": "/apply",
}


class CleanURLHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]

        if path in REDIRECTS:
            self.send_response(308)
            self.send_header("Location", REDIRECTS[path])
            self.end_headers()
            return None

        # /about.html -> /about, matching Vercel's cleanUrls redirect
        if path.endswith(".html") and path != "/index.html":
            self.send_response(308)
            self.send_header("Location", path[: -len(".html")])
            self.end_headers()
            return None

        # /about -> about.html on disk
        if not os.path.splitext(path)[1] and path != "/":
            candidate = os.path.join(ROOT, path.lstrip("/") + ".html")
            if os.path.isfile(candidate):
                self.path = path + ".html"

        return super().send_head()

    def end_headers(self):
        # No caching locally, so CSS edits show up on reload.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("  %s\n" % (fmt % args))


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), CleanURLHandler)
    print(f"Troy VEX preview  →  http://localhost:{PORT}")
    print(f"About page        →  http://localhost:{PORT}/about")
    print("Ctrl-C to stop.\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
