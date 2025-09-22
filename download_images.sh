#!/usr/bin/env bash
set -euo pipefail
OUTDIR="${1:-public/images}"
mkdir -p "$OUTDIR"

download() {
  url="$1"
  out="$2"
  echo "Downloading $out"
  curl -L "$url" -o "$OUTDIR/$out"
}

download "https://commons.wikimedia.org/wiki/Special:FilePath/Meta%20Quest%203%20Top%20View.jpg" "meta-quest-3.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20Vision%20Pro%20on%20display.jpg" "apple-vision-pro.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Intel%20NUC.jpg" "intel-nuc.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Asus%20ROG%20Laptop%20Keyboard.jpg" "asus-rog-laptop.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Philips%20Hue%20hub%20and%202%20bulbs.jpg" "philips-hue.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung%20Galaxy%20S24.jpg" "samsung-galaxy-s24.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20iPhone%2015.jpg" "apple-iphone-15.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/AVM%20FRITZ%21Box%203390%20-%20Top.jpg" "avm-fritzbox.jpg"
download "https://commons.wikimedia.org/wiki/Special:FilePath/Ableton%20Live%20Screenshot.png" "ableton-live.png"
download "https://commons.wikimedia.org/wiki/Special:FilePath/UiPath%20Logo.png" "uipath-logo.png"

echo "Done. Files saved to $OUTDIR"
