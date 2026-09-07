"""Download Unsplash assets into public/trips/{slug}/{1,2,3}.jpg.

Why curl / bare requests often FAIL or crawl:
- unsplash.com/download may return HTTP 403 for bot-like clients (thin User-Agent,
  no Referer / Accept, or bursts of downloads).
- Many big images sequentially = slow unless you throttle gently (Unsplash CDN is fine).

Resume: skips files that already look valid (>8 KiB).
"""
from __future__ import annotations

import argparse
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "trips"

W = "1920"
QUALITY = "85"

SOURCES: dict[str, tuple[str, str, str]] = {
    "new-cairo-exclusive-mini-bus": ("Ul0wIjSEU1Y", "QAPH2rhEMtU", "GIE9A4YEK8M"),
    "super-el-gouna": ("vt0xjLIF6T4", "wL_qaAccq-E", "Dt6EB9nuFHs"),
    "kleopatra-spa": ("ZrsbryXFiG0", "V2QNIeDx3Yc", "kgrokorD4d0"),
    "new-cairo-by-bus": ("Ul0wIjSEU1Y", "CMrDBYBkglY", "GIE9A4YEK8M"),
    "cairo-by-plane": ("DGMYXOH7olU", "QAPH2rhEMtU", "gYe2GTSKlk0"),
    "mini-egypt-park": ("lmI1572-5EI", "OW0IngWks_w", "Dt6EB9nuFHs"),
    "luxor-hot-air-balloon": ("v4HHLOyNK0k", "VMFC7qJheXw", "zs2TF9i-At0"),
    "city-tour-hurghada": ("BkRreopzEXk", "tT-tAv_LwBE", "DEP7pQ3vHPE"),
    "grand-aquarium-hurghada": ("OeHAQRfDKTw", "r4YJcooyrVg", "ScMufU8tG9w"),
    "cairo-vip-mini-bus": ("DGMYXOH7olU", "OW0IngWks_w", "GIE9A4YEK8M"),
    "new-cairo-exclusive-by-plane": ("Ul0wIjSEU1Y", "QAPH2rhEMtU", "gYe2GTSKlk0"),
    "luxor-vip-mini-bus": ("VMFC7qJheXw", "jwtz8wGfLXA", "IgQRRedtDco"),
    "cairo-by-bus": ("DGMYXOH7olU", "CMrDBYBkglY", "GIE9A4YEK8M"),
    "parasailing": ("GFORPUwDshI", "tNrysQ_xcZ8", "t3XHiEF-VcM"),
    "seascope-hurghada": ("OeHAQRfDKTw", "vt0xjLIF6T4", "shje6iJZrBE"),
    "luxor-by-bus": ("2bgirUct1MU", "jwtz8wGfLXA", "5aEHOQrb2Qk"),
}

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/131.0.0.0 Safari/537.36"
)

_DOWNLOAD_HEADERS = {
    "User-Agent": UA,
    "Accept": "image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://unsplash.com/",
}


def fetch_bytes(url: str, timeout: int = 120) -> bytes:
    req = urllib.request.Request(url, headers=_DOWNLOAD_HEADERS)
    # Block Unsplash CDN from redirecting endlessly; urllib follows 3xx automatically.
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def download_one(slug: str, idx: int, photo_id: str, retries: int, pause_s: float, skip_existing: bool) -> None:
    dest = OUT / slug / f"{idx}.jpg"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if skip_existing and dest.exists() and dest.stat().st_size >= 8192:
        print(f"[skip ok] {slug}/{idx}.jpg")
        time.sleep(pause_s)
        return

    url = f"https://unsplash.com/photos/{photo_id}/download?force=true&w={W}&q={QUALITY}"
    last_exc: BaseException | None = None
    for attempt in range(retries):
        try:
            print(f"{slug}/{idx}.jpg <- {photo_id} (try {attempt + 1}/{retries})")
            blob = fetch_bytes(url)
            if len(blob) < 2048:
                raise IOError(f"Dubious JPEG size ({len(blob)} bytes) for {slug}/{idx}")
            dest.write_bytes(blob)
            time.sleep(pause_s)
            return
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError) as e:
            last_exc = e
            wait = pause_s + 0.6 * attempt
            code = getattr(e, "code", None)
            if isinstance(e, urllib.error.HTTPError) and code in (403, 429):
                wait += 2.5 * (attempt + 1)
            print(f"  ! retry ({e}) sleeping {wait:.1f}s")
            time.sleep(wait)
    raise RuntimeError(f"Failed {slug}/{idx}.jpg ({photo_id}): {last_exc}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--retries", type=int, default=5, help="Per-file HTTP retries")
    ap.add_argument("--pause", type=float, default=0.45, help="Seconds sleep after each success")
    ap.add_argument(
        "--no-skip-existing",
        action="store_true",
        help="Re-download even if JPG already present and large enough",
    )
    args = ap.parse_args()

    skip = not args.no_skip_existing
    for slug, trio in SOURCES.items():
        for idx, pid in enumerate(trio, start=1):
            download_one(slug, idx, pid, retries=args.retries, pause_s=args.pause, skip_existing=skip)

    print("Done.")


if __name__ == "__main__":
    main()
