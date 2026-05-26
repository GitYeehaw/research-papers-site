"""Unit tests for the error-handling paths in scrape.py (stdlib only)."""

import json
import os
import tempfile
import unittest
from unittest import mock

import scrape


class LoadConfigTests(unittest.TestCase):
    def test_missing_file_exits(self):
        with mock.patch.object(scrape, "CONFIG_PATH", "/nonexistent/dir/config.json"):
            with self.assertRaises(SystemExit) as cm:
                scrape.load_config()
        self.assertEqual(cm.exception.code, 1)

    def test_corrupt_json_exits(self):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as tf:
            tf.write("{ not valid json ")
            path = tf.name
        try:
            with mock.patch.object(scrape, "CONFIG_PATH", path):
                with self.assertRaises(SystemExit) as cm:
                    scrape.load_config()
            self.assertEqual(cm.exception.code, 1)
        finally:
            os.unlink(path)

    def test_valid_config_returns_dict(self):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as tf:
            json.dump({"categories": {"cs": {"arxiv_query": "cat:cs.AI"}}}, tf)
            path = tf.name
        try:
            with mock.patch.object(scrape, "CONFIG_PATH", path):
                cfg = scrape.load_config()
            self.assertIn("categories", cfg)
        finally:
            os.unlink(path)


class ScrapeResearchersTests(unittest.TestCase):
    def test_corrupt_researchers_json_does_not_crash(self):
        with tempfile.TemporaryDirectory() as rdir, tempfile.TemporaryDirectory() as ddir:
            rpath = os.path.join(rdir, "researchers.json")
            with open(rpath, "w") as f:
                f.write("{ broken ")
            with mock.patch.object(scrape, "RESEARCHERS_PATH", rpath), \
                 mock.patch.object(scrape, "DATA_DIR", ddir), \
                 mock.patch.object(scrape, "fetch_arxiv_papers") as fetch:
                scrape.scrape_researchers()  # must not raise
                fetch.assert_not_called()
            self.assertFalse(os.path.exists(os.path.join(ddir, "researchers.json")))

    def test_non_list_researchers_does_not_crash(self):
        with tempfile.TemporaryDirectory() as rdir, tempfile.TemporaryDirectory() as ddir:
            rpath = os.path.join(rdir, "researchers.json")
            with open(rpath, "w") as f:
                json.dump({"not": "a list"}, f)
            with mock.patch.object(scrape, "RESEARCHERS_PATH", rpath), \
                 mock.patch.object(scrape, "DATA_DIR", ddir), \
                 mock.patch.object(scrape, "fetch_arxiv_papers") as fetch:
                scrape.scrape_researchers()  # must not raise
                fetch.assert_not_called()

    @mock.patch("time.sleep")
    def test_malformed_entries_skipped(self, _sleep):
        researchers = [
            {"name": "Valid", "arxiv_id": "1234"},
            {"name": "NoId"},          # missing arxiv_id -> skip
            "not-a-dict",              # not a dict -> skip
            {"arxiv_id": "5678"},      # missing name -> skip
        ]
        with tempfile.TemporaryDirectory() as rdir, tempfile.TemporaryDirectory() as ddir:
            rpath = os.path.join(rdir, "researchers.json")
            with open(rpath, "w") as f:
                json.dump(researchers, f)
            with mock.patch.object(scrape, "RESEARCHERS_PATH", rpath), \
                 mock.patch.object(scrape, "DATA_DIR", ddir), \
                 mock.patch.object(scrape, "fetch_arxiv_papers", return_value=[{"id": "x"}]) as fetch:
                scrape.scrape_researchers()
            # Only the one valid researcher should have triggered a fetch.
            self.assertEqual(fetch.call_count, 1)
            with open(os.path.join(ddir, "researchers.json")) as f:
                out = json.load(f)
            self.assertEqual(out["researcher_count"], 1)
            self.assertEqual(out["researchers"][0]["name"], "Valid")


if __name__ == "__main__":
    unittest.main()
