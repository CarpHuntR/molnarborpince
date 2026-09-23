# Molnár Borpince – bemutató weboldal

Modern, prémium, egyoldalas bemutató weboldal a bölcskei (Tolna megye)
**Molnár Borpince** számára. Vanilla HTML + CSS + JavaScript, a letisztult
megjelenéshez Tailwind CSS-t használ CDN-en keresztül.

Színvilág: **elegáns zöld** (forest) kiemelő szín, meleg **krém/homok** tónusú
háttér, finom **arany** akcentus (a logó színe) és sötétszürke szöveg.

## Megnyitás

Nincs szükség build lépésre vagy szerverre: egyszerűen nyisd meg az
`index.html` fájlt böngészőben. (A Tailwind CDN és a Google Fonts betöltéséhez
internetkapcsolat szükséges.)

## ICP deploy

Az oldal az Internet Computer assets canisterén futtatható. Helyi deployhoz a
DFINITY SDK telepítése után futtasd:

```bash
dfx deploy --network ic
```

A GitHub Actions workflow minden `main` branch-re érkező push után automatikusan
deployol. A repository GitHub beállításaiban add hozzá a
`DFX_IDENTITY_PEM` nevű Actions secretet a deployhoz használt ICP identity
PEM-tartalmával. Az identity-nek rendelkeznie kell a canister létrehozásához
vagy frissítéséhez szükséges jogosultsággal és cycle egyenleggel.

## Fájlstruktúra

```
molnar-borpince/
├── index.html              # Az oldal teljes szerkezete (összes szekció)
├── assets/
│   ├── logo-gold.png       # Hivatalos logó – arany (világos navigáció)
│   ├── logo-cream.png      # Hivatalos logó – krém (sötét hero / lábléc)
│   ├── favicon.ico / *.png / apple-touch-icon.png  # Címsáv-ikon (a logó jeléből)
│   ├── hero-vineyard.jpg   # Hero háttérkép (saját szőlőfotó)
│   ├── band-panorama.jpg   # Idézet-sáv háttérképe (panoráma)
│   ├── about-rows.jpg      # Rólunk – fő fotó (rendezett szőlősorok)
│   ├── about-cellar.jpg    # Rólunk – pince/hordók (bekeretezett kis fotó)
│   ├── gallery-g1..g6.jpg  # Galéria filmszalag képei
│   ├── bottle-red/white/rose.png  # Borkártyák palack-képei (a kapszula-tervből kivágva)
│   └── grape-*.jpg, about-green.jpg  # (tartalék) korábbi kártya-/Rólunk-képek
├── css/
│   └── style.css           # Egyedi stílusok: animációk, űrlap, borkártyák, nav, nyelvváltó
└── js/
    ├── wines-data.js       # ⭐ BORKATALÓGUS ADATOK (többnyelvű) – itt szerkeszd a borokat!
    ├── i18n.js             # 🌐 FORDÍTÁSOK – minden felületi szöveg 5 nyelven
    └── script.js           # Oldal logika: i18n, kártyagenerálás, szűrés, űrlap, menü
```

Az összes kép a borászat **saját fotóiból** készült, webre optimalizált
(kicsinyített, tömörített) változat. A logó a hivatalos arculati PDF-ből
renderelt, levágott PNG (arany + krém változat).

## Nyelvek (többnyelvűség)

Az oldal **8 nyelven** elérhető: magyar, angol, német, francia, olasz,
szlovák, lengyel, holland. A jobb felső sarokban a **földgömb-ikonos
nyelvváltóval** lehet váltani; a választás megjegyződik (localStorage).

**Az alapértelmezett nyelv mindig a magyar** – minden látogató magyarul látja
először az oldalt (a böngésző nyelvét NEM vesszük át). A vendégszám-egységek a
nyelv ragozási szabályai szerint jelennek meg (pl. lengyel: 1 osoba / 2 osoby /
5 osób; szlovák: 1 hosť / 2 hostia / 5 hostí) – `Intl.PluralRules` segítségével.

- **Felületi szövegek**: a `js/i18n.js` fájlban, `data-i18n` kulcsok szerint.
- **Bor-leírások / ízjegyek**: a `js/wines-data.js`-ben, nyelvenként
  (`{ hu, en, de, fr, it }`).
- **Új nyelv hozzáadása**: vegyél fel egy elemet a `LANGS` tömbbe (`i18n.js`),
  majd másold le az egyik nyelvi blokkot és fordítsd le; a borokhoz add hozzá
  ugyanazt a nyelvi kulcsot a leírásokban.

## Árak

A borkártyákon **szándékosan nincs ár** feltüntetve – ez bemutató oldal, nem
webshop. (A `wines-data.js` nem is tartalmaz ár mezőt.)

## Képek cseréje

- **Hero kép**: a `css/style.css` fájlban a `.hero` szabály `--hero-image`
  változóját írd át (és frissítsd az `index.html` fejlécében lévő
  `<link rel="preload">` útvonalát is). Ha a kép nem tölt be, automatikusan
  a zöld színátmenet jelenik meg helyette.
- **Idézet-sáv képe**: a `css/style.css` `.quote-band` szabályában lévő
  `url(...)` útvonalat írd át.
- **Rólunk / galéria / borkártya képek**: a megfelelő `assets/...` fájlt
  cseréld le azonos néven, vagy írd át az útvonalat (galéria: `index.html`,
  borkártyák: `js/wines-data.js` → `kep` mező).

## Borok szerkesztése / bővítése

A borok **nincsenek** a HTML-be írva. A `js/wines-data.js` fájlban lévő
`WINES` tömb elemeiből a `script.js` automatikusan generálja a kártyákat.
Új bor hozzáadásához másolj le egy meglévő `{ ... },` blokkot és írd át az
adatait — a fájl tetején minden mező dokumentálva van (köztük a `kep` mező,
amely a kártya fejlécképét adja meg).

## Szekciók

- **Főoldal (hero)** – saját szőlősor-fotó zöldes sötétítő overlay-jel,
  középen a hivatalos logó, mottó és CTA gombok
- **Rólunk** – Molnár Attila és az „ékszerdoboz” pince bemutatása,
  aszimmetrikus fotó-elrendezéssel (fő kép + bekeretezett kis kép + idézet)
- **Galéria** – „A szőlőtől a pohárig” filmszalag a dűlőkről készült fotókkal
- **Boraink** – dinamikusan generált, fotós borkatalógus (6 tétel) típus
  szerinti szűrővel; a díjnyertes Cabernet Sauvignon arany szalagot kap
- **Foglalás** – borkóstoló-foglalási űrlap teljes kliensoldali validációval
  és animált sikerüzenettel (a küldés jelenleg **szimulált**)
- **Kapcsolat** – cím, telefon, e-mail, nyitvatartás, térkép helyőrző

## Animációk

- Görgetésre megjelenő (fade-in + slide-up) szekciók és borkártyák
  `IntersectionObserver`-rel, lépcsőzetes (stagger) időzítéssel.
- Hover effektek: gombok és borkártyák enyhe emelkedése/nagyítása + lágy
  árnyék; a borkártya- és galéria-fotók finom ráközelítése.
- Tisztelet a `prefers-reduced-motion` beállításnak (animációk kikapcsolása).

## Megjegyzések

- Az elérhetőségek (telefonszám, e-mail, házszám) és a borok árai
  **minta adatok** – élesítés előtt írd át a valós adatokra.
- A térkép helyőrzőjébe a Kapcsolat szekcióban beágyazható egy valódi
  Google Maps iframe.
- A foglalási űrlap jelenleg nem küld adatot sehová; éles használathoz
  köthető pl. e-mail szolgáltatáshoz vagy backendhez a `script.js`
  `setTimeout(...)` részének cseréjével.
