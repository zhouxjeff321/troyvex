from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HomepageCampBannerTests(unittest.TestCase):
    def test_mobile_banner_uses_content_driven_proportions(self):
        homepage = (ROOT / "index.html").read_text(encoding="utf-8")
        media_start = homepage.index("@media (max-width: 700px)")
        media_end = homepage.index("</style>", media_start)
        mobile_css = homepage[media_start:media_end]

        expected_rules = (
            "margin: 3rem auto 2.5rem",
            "padding: 1.75rem 1.25rem",
            "gap: 1.25rem",
            ".camp-banner .txt { flex: 0 1 auto; }",
            ".camp-banner h2 { font-size: 1.75rem; }",
            ".camp-banner .act { width: 100%; align-items: stretch; text-align: center; }",
            ".camp-banner .pill { width: 100%; text-align: center; }",
        )

        for rule in expected_rules:
            with self.subTest(rule=rule):
                self.assertIn(rule, mobile_css)


if __name__ == "__main__":
    unittest.main()
