param(
  [string]$OutDir = "public/images"
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$items = @(
  @{ "title" = "Meta Quest 3"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Meta%20Quest%203%20Top%20View.jpg"; "outfile" = "meta-quest-3.jpg" }
  @{ "title" = "Apple Vision Pro"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20Vision%20Pro%20on%20display.jpg"; "outfile" = "apple-vision-pro.jpg" }
  @{ "title" = "Intel NUC"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Intel%20NUC.jpg"; "outfile" = "intel-nuc.jpg" }
  @{ "title" = "ASUS ROG Laptop (generic)"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Asus%20ROG%20Laptop%20Keyboard.jpg"; "outfile" = "asus-rog-laptop.jpg" }
  @{ "title" = "Philips Hue Starterset (symbolisch)"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Philips%20Hue%20hub%20and%202%20bulbs.jpg"; "outfile" = "philips-hue.jpg" }
  @{ "title" = "Samsung Galaxy S24"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung%20Galaxy%20S24.jpg"; "outfile" = "samsung-galaxy-s24.jpg" }
  @{ "title" = "Apple iPhone 15"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20iPhone%2015.jpg"; "outfile" = "apple-iphone-15.jpg" }
  @{ "title" = "AVM FRITZ!Box (3390, symbolisch)"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/AVM%20FRITZ%21Box%203390%20-%20Top.jpg"; "outfile" = "avm-fritzbox.jpg" }
  @{ "title" = "Ableton Live (Screenshot)"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/Ableton%20Live%20Screenshot.png"; "outfile" = "ableton-live.png" }
  @{ "title" = "UiPath Logo (PD-textlogo)"; "url" = "https://commons.wikimedia.org/wiki/Special:FilePath/UiPath%20Logo.png"; "outfile" = "uipath-logo.png" }
)

foreach ($i in $items) {
  $dest = Join-Path $OutDir $($i.outfile)
  Write-Host "Downloading $($i.title) -> $dest"
  Invoke-WebRequest -Uri $($i.url) -OutFile $dest
}

Write-Host "Done. Files saved to $OutDir"
