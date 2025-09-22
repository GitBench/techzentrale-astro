# Produktbilder – Downloader (Wikimedia Commons & freie Lizenzen)

Dieses Paket lädt **frei lizenzierte** Symbol-/Produktbilder von Wikimedia Commons herunter
und speichert sie in `public/images/` deines Astro-Projekts.

> **Wichtig (Amazon-Affiliate-Compliance):** Für **exakte Produktfotos** (z. B. konkrete Amazon-Angebote,
> Buchcover, Shopbilder) musst du *Amazon SiteStripe* oder die *Product Advertising API*
> verwenden. Manuelles Kopieren/Hosten von Amazon-Produktbildern ist gemäß Amazon-Richtlinien nicht erlaubt.

## Nutzung

### Windows (PowerShell)
```powershell
# im Projekt-Root ausführen
.\download_images.ps1
# oder benutzerdefinierter Ordner:
.\download_images.ps1 -OutDir public\images
```

### macOS/Linux
```bash
chmod +x download_images.sh
./download_images.sh           # lädt nach public/images
./download_images.sh static/img  # eigener Ordner
```

## Enthaltene Motive (Auswahl)
- Meta Quest 3
- Apple Vision Pro
- Intel NUC
- ASUS ROG Laptop (generisch)
- Philips Hue (Hub + 2 Bulbs)
- Samsung Galaxy S24
- Apple iPhone 15
- AVM FRITZ!Box (3390)
- Ableton Live (Screenshot)
- UiPath Logo (PD-Textlogo)

Für Produkte wie **Beelink SER5**, Bücher (**Understanding Cryptography**, **Future of Flying Cars**, **AI Music Generation**)
empfehle ich **Amazon SiteStripe**-Bilder oder Hersteller-Pressekits (sofern die Lizenz die Eigen-Hostung erlaubt).
