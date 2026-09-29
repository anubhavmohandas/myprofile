#!/usr/bin/env bash
# ------------------------------------------------------------
# Video → web-optimised frames for the interactive hero.
#
#   tools/extract-frames.sh path/to/hero.mp4 [fps=15]
#
# Writes:
#   assets/hero-frames/desktop/f_0001.webp …   (1440 px wide, full frame)
#   assets/hero-frames/mobile/f_0001.webp  …   (720 px wide, centre crop 8:9)
#   assets/hero-frames/manifest.json           (segments = proportional guess)
#
# After running, open the contact sheet (tools/.hero-contact.jpg) and tune the
# "segments" frame indices in manifest.json to match your video's beats.
# Env overrides: DESKTOP_W, MOBILE_W, MOBILE_CROP_W (fraction of source width), QUALITY
# ------------------------------------------------------------
set -euo pipefail

SRC="${1:?usage: tools/extract-frames.sh video.mp4 [fps]}"
FPS="${2:-15}"
DESKTOP_W="${DESKTOP_W:-1440}"
MOBILE_W="${MOBILE_W:-720}"
MOBILE_CROP_W="${MOBILE_CROP_W:-0.5}"   # centre slice of the source width used on phones
QUALITY="${QUALITY:-74}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/hero-frames"
mkdir -p "$OUT/desktop" "$OUT/mobile"
rm -f "$OUT"/desktop/f_*.webp "$OUT"/mobile/f_*.webp

echo "→ desktop frames (${DESKTOP_W}px @ ${FPS}fps)"
ffmpeg -hide_banner -loglevel error -i "$SRC" \
  -vf "fps=${FPS},scale=${DESKTOP_W}:-2:flags=lanczos" \
  -c:v libwebp -quality "$QUALITY" -compression_level 6 -preset picture \
  "$OUT/desktop/f_%04d.webp"

echo "→ mobile frames (${MOBILE_W}px, centre crop ${MOBILE_CROP_W} of width)"
ffmpeg -hide_banner -loglevel error -i "$SRC" \
  -vf "fps=${FPS},crop=iw*${MOBILE_CROP_W}:min(ih\,iw*${MOBILE_CROP_W}*9/8):(iw-iw*${MOBILE_CROP_W})/2:ih-min(ih\,iw*${MOBILE_CROP_W}*9/8),scale=${MOBILE_W}:-2:flags=lanczos" \
  -c:v libwebp -quality "$QUALITY" -compression_level 6 -preset picture \
  "$OUT/mobile/f_%04d.webp"

echo "→ contact sheet"
ffmpeg -hide_banner -loglevel error -y -i "$SRC" \
  -vf "fps=${FPS},scale=240:-2,drawtext=text='%{frame_num}':start_number=0:x=6:y=6:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6,tile=10x20" \
  -frames:v 1 "$ROOT/tools/.hero-contact.jpg" 2>/dev/null || \
ffmpeg -hide_banner -loglevel error -y -i "$SRC" -vf "fps=${FPS},scale=240:-2,tile=10x20" -frames:v 1 "$ROOT/tools/.hero-contact.jpg"

python3 - "$OUT" "$FPS" <<'PY'
import json, os, sys, glob, struct
out, fps = sys.argv[1], int(sys.argv[2])
def size(p):
    with open(p, 'rb') as f: d = f.read(64)
    if d[12:16] == b'VP8 ': w, h = struct.unpack('<HH', d[26:30]); return w & 0x3fff, h & 0x3fff
    if d[12:16] == b'VP8L':
        b = d[21:25]; v = int.from_bytes(b, 'little'); return (v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1
    if d[12:16] == b'VP8X': return int.from_bytes(d[24:27], 'little') + 1, int.from_bytes(d[27:30], 'little') + 1
    return 0, 0
dfiles = sorted(glob.glob(os.path.join(out, 'desktop', 'f_*.webp')))
mfiles = sorted(glob.glob(os.path.join(out, 'mobile', 'f_*.webp')))
n = len(dfiles)
# Proportional guess for the recommended action sequence — tune by hand.
cut = lambda f: int(round(n * f))
seg = {
  "idle":  [0, cut(.20) - 1],
  "left":  [cut(.20), cut(.30)],
  "right": [cut(.33), cut(.43)],
  "greet": [cut(.47), n - 1],
}
mpath = os.path.join(out, 'manifest.json')
if os.path.exists(mpath):   # keep hand-tuned segments if the frame count didn't change
    old = json.load(open(mpath))
    if old.get('count') == n: seg = old.get('segments', seg)
dw, dh = size(dfiles[0]); mw, mh = size(mfiles[0])
m = {
  "fps": fps, "count": n, "pattern": "f_%04d.webp",
  "desktop": {"dir": "assets/hero-frames/desktop/", "w": dw, "h": dh},
  "mobile":  {"dir": "assets/hero-frames/mobile/",  "w": mw, "h": mh},
  "segments": seg,
  "greetBeats": [0.0, 0.45, 0.78],
}
json.dump(m, open(mpath, 'w'), indent=2)
tot = lambda fs: sum(os.path.getsize(f) for f in fs) / 1e6
print(f"→ {n} frames | desktop {dw}x{dh} {tot(dfiles):.1f} MB | mobile {mw}x{mh} {tot(mfiles):.1f} MB")
print(f"→ manifest: {mpath}")
PY
