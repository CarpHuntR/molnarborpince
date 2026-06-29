/* =====================================================================
   MOLNÁR BORPINCE – BORKATALÓGUS ADATOK (többnyelvű)
   ---------------------------------------------------------------------
   Új bor: másolj le egy { ... } blokkot és írd át. A weboldal a JS-ből
   dinamikusan generálja a kártyát – HTML-hez nem kell nyúlni.

   A SZÖVEGES mezők nyelvenként megadhatók ({ hu, en, de, fr, it }).
   Ha valamelyik nyelv hiányzik, a magyar (hu) az alapértelmezett.

   Mezők:
   - nev        : a bor neve (márkanév – nem fordítjuk)
   - fajta      : szőlőfajta
   - tipus      : "Vörösbor" | "Fehérbor" | "Rozé"  (a szűrés ezt használja)
   - tema       : "voros" | "feher" | "roze"  (a kártya színkiemelése)
   - evjarat    : évjárat (szám)
   - alkohol    : alkoholtartalom
   - kep        : a kártya palack-képe (az assets/ mappából)
   - leiras     : { hu, en, de, fr, it } – rövid leírás nyelvenként
   - jegyek     : { hu:[...], en:[...], ... } – ízjegyek nyelvenként
   - dijnyertes : true/false – arany szalagot kap a kártya
   - dij        : { hu, en, de, fr, it } – a díj neve (ha dijnyertes)

   Megjegyzés: ÁR SZÁNDÉKOSAN NINCS feltüntetve (nem kereskedelmi katalógus).
   ===================================================================== */

const WINES = [
  {
    nev: "Cabernet Sauvignon Prémium Válogatás",
    fajta: "Cabernet Sauvignon",
    tipus: "Vörösbor",
    tema: "voros",
    evjarat: 2021,
    alkohol: "14%",
    kep: "assets/bottle-red.png",
    leiras: {
      hu: "Pincénk büszkesége: testes, mély rubinszínű vörösbor, amelyben a fűszeres jegyek étcsokoládéval és érett erdei gyümölcsökkel találkoznak. Új tölgyfahordóban érlelt, hosszú, bársonyos lecsengésű tétel.",
      en: "The pride of our cellar: a full-bodied, deep ruby red in which spicy notes meet dark chocolate and ripe forest fruits. Aged in new oak barrels, with a long, velvety finish.",
      de: "Der Stolz unseres Kellers: ein körperreicher, tief rubinroter Wein, in dem würzige Noten auf Zartbitterschokolade und reife Waldfrüchte treffen. In neuen Eichenfässern gereift, mit langem, samtigem Abgang.",
      fr: "La fierté de notre cave : un rouge corsé d'un rubis profond où les notes épicées rencontrent le chocolat noir et les fruits des bois mûrs. Élevé en fûts de chêne neufs, à la finale longue et veloutée.",
      it: "L'orgoglio della nostra cantina: un rosso corposo dal rubino intenso in cui le note speziate incontrano il cioccolato fondente e i frutti di bosco maturi. Affinato in botti di rovere nuove, dal finale lungo e vellutato.",
      sk: "Pýcha našej pivnice: plné, sýto rubínové červené víno, v ktorom sa korenisté tóny stretávajú s horkou čokoládou a zrelým lesným ovocím. Zrelo v nových dubových sudoch, s dlhým, zamatovým záverom.",
      pl: "Duma naszej piwnicy: pełne, głęboko rubinowe czerwone wino, w którym korzenne nuty spotykają się z gorzką czekoladą i dojrzałymi owocami leśnymi. Dojrzewające w nowych dębowych beczkach, o długim, aksamitnym finiszu.",
      nl: "De trots van onze kelder: een volle, diep robijnrode rode wijn waarin kruidige tonen samenkomen met pure chocolade en rijp bosfruit. Gerijpt op nieuwe eikenhouten vaten, met een lange, fluwelen afdronk.",
    },
    jegyek: {
      hu: ["fűszeres", "étcsokoládé", "testes", "hordós érlelés"],
      en: ["spicy", "dark chocolate", "full-bodied", "barrel-aged"],
      de: ["würzig", "Zartbitterschokolade", "körperreich", "im Fass gereift"],
      fr: ["épicé", "chocolat noir", "corsé", "élevé en fût"],
      it: ["speziato", "cioccolato fondente", "corposo", "affinato in botte"],
      sk: ["korenistý", "horká čokoláda", "plné telo", "zrenie v sude"],
      pl: ["korzenny", "gorzka czekolada", "pełne ciało", "dojrzewanie w beczce"],
      nl: ["kruidig", "pure chocolade", "vol van smaak", "gerijpt op vat"],
    },
    dijnyertes: true,
    dij: {
      hu: "Aranyérem – Tolnai Borvidéki Borverseny",
      en: "Gold medal – Tolna Wine Region Competition",
      de: "Goldmedaille – Weinwettbewerb der Region Tolna",
      fr: "Médaille d'or – Concours des vins de la région de Tolna",
      it: "Medaglia d'oro – Concorso enologico della regione di Tolna",
      sk: "Zlatá medaila – Súťaž vín vinárskej oblasti Tolna",
      pl: "Złoty medal – Konkurs win regionu Tolna",
      nl: "Gouden medaille – Wijnconcours regio Tolna",
    },
  },
  {
    nev: "Bölcskei Kékfrankos",
    fajta: "Kékfrankos",
    tipus: "Vörösbor",
    tema: "voros",
    evjarat: 2022,
    alkohol: "13%",
    kep: "assets/bottle-red.png",
    leiras: {
      hu: "A borvidék klasszikusa: közepes testű, meggyes-fűszeres vörösbor, amely hűen tükrözi a bölcskei löszdombok karakterét. Baráti beszélgetések megbízható társa.",
      en: "A classic of the region: a medium-bodied red with sour cherry and spice, faithfully reflecting the character of the Bölcske loess hills. A reliable companion for conversations among friends.",
      de: "Ein Klassiker der Region: ein mittelkräftiger Rotwein mit Sauerkirsche und Würze, der den Charakter der Lösshügel von Bölcske getreu widerspiegelt. Ein verlässlicher Begleiter für Gespräche unter Freunden.",
      fr: "Un classique de la région : un rouge moyennement corsé aux notes de griotte et d'épices, qui reflète fidèlement le caractère des collines de loess de Bölcske. Un compagnon sûr pour les conversations entre amis.",
      it: "Un classico della regione: un rosso di medio corpo con amarena e spezie, che riflette fedelmente il carattere delle colline di loess di Bölcske. Un compagno affidabile per le conversazioni tra amici.",
      sk: "Klasika regiónu: stredne plné červené víno s višňou a korením, ktoré verne odráža charakter sprašových kopcov Bölcske. Spoľahlivý spoločník priateľských rozhovorov.",
      pl: "Klasyka regionu: średnio pełne czerwone wino z nutą wiśni i przypraw, wiernie oddające charakter lessowych wzgórz Bölcske. Niezawodny towarzysz przyjacielskich rozmów.",
      nl: "Een klassieker van de streek: een middelvolle rode wijn met zure kers en kruiden, die het karakter van de lössheuvels van Bölcske trouw weerspiegelt. Een betrouwbare metgezel bij gesprekken onder vrienden.",
    },
    jegyek: {
      hu: ["meggy", "fűszeres", "közepes test"],
      en: ["sour cherry", "spicy", "medium-bodied"],
      de: ["Sauerkirsche", "würzig", "mittlerer Körper"],
      fr: ["griotte", "épicé", "moyennement corsé"],
      it: ["amarena", "speziato", "medio corpo"],
      sk: ["višňa", "korenistý", "stredné telo"],
      pl: ["wiśnia", "korzenny", "średnie ciało"],
      nl: ["zure kers", "kruidig", "middelvol"],
    },
    dijnyertes: false,
    dij: {},
  },
  {
    nev: "Tolnai Cuvée",
    fajta: "Cabernet Sauvignon – Merlot – Kékfrankos",
    tipus: "Vörösbor",
    tema: "voros",
    evjarat: 2020,
    alkohol: "13,5%",
    kep: "assets/bottle-red.png",
    leiras: {
      hu: "Három fajta gondosan komponált házasítása: a Cabernet ereje, a Merlot lágysága és a Kékfrankos fűszeressége fonódik össze egy harmonikus, elegáns vörösborrá. 18 hónap hordós érlelés után palackozva.",
      en: "A carefully composed blend of three varieties: the power of Cabernet, the softness of Merlot and the spice of Kékfrankos intertwine into a harmonious, elegant red. Bottled after 18 months of barrel ageing.",
      de: "Eine sorgfältig komponierte Cuvée aus drei Sorten: die Kraft des Cabernet, die Weichheit des Merlot und die Würze des Kékfrankos verbinden sich zu einem harmonischen, eleganten Rotwein. Nach 18 Monaten Fassreife gefüllt.",
      fr: "Un assemblage soigneusement composé de trois cépages : la puissance du Cabernet, la souplesse du Merlot et le côté épicé du Kékfrankos s'entrelacent en un rouge harmonieux et élégant. Mis en bouteille après 18 mois d'élevage en fût.",
      it: "Un assemblaggio composto con cura da tre varietà: la forza del Cabernet, la morbidezza del Merlot e la speziatura del Kékfrankos si intrecciano in un rosso armonioso ed elegante. Imbottigliato dopo 18 mesi di affinamento in botte.",
      sk: "Starostlivo komponovaná zmes troch odrôd: sila Cabernetu, jemnosť Merlotu a korenistosť Kékfrankoša sa spájajú do harmonického, elegantného červeného vína. Plnené po 18 mesiacoch zrenia v sude.",
      pl: "Starannie skomponowana mieszanka trzech odmian: moc Caberneta, łagodność Merlota i korzenność Kékfrankosa splatają się w harmonijne, eleganckie czerwone wino. Butelkowane po 18 miesiącach dojrzewania w beczce.",
      nl: "Een zorgvuldig samengestelde blend van drie druiven: de kracht van Cabernet, de zachtheid van Merlot en de kruidigheid van Kékfrankos verweven zich tot een harmonieuze, elegante rode wijn. Gebotteld na 18 maanden rijping op vat.",
    },
    jegyek: {
      hu: ["szeder", "vanília", "elegáns", "hosszú lecsengés"],
      en: ["blackberry", "vanilla", "elegant", "long finish"],
      de: ["Brombeere", "Vanille", "elegant", "langer Abgang"],
      fr: ["mûre", "vanille", "élégant", "longue finale"],
      it: ["mora", "vaniglia", "elegante", "lunga persistenza"],
      sk: ["černica", "vanilka", "elegantný", "dlhá dochuť"],
      pl: ["jeżyna", "wanilia", "elegancki", "długi finisz"],
      nl: ["braam", "vanille", "elegant", "lange afdronk"],
    },
    dijnyertes: false,
    dij: {},
  },
  {
    nev: "Sauvignon Blanc",
    fajta: "Sauvignon Blanc",
    tipus: "Fehérbor",
    tema: "feher",
    evjarat: 2023,
    alkohol: "12,5%",
    kep: "assets/bottle-white.png",
    leiras: {
      hu: "Elegáns, ropogósan friss fehérbor zöldcitrusos, bodzavirágos illatvilággal. Élénk savai és hosszú, citrusos korty teszik tökéletes kísérőjévé a könnyű nyári ételeknek.",
      en: "An elegant, crisply fresh white with aromas of green citrus and elderflower. Its lively acidity and long, citrusy palate make it the perfect companion to light summer dishes.",
      de: "Ein eleganter, knackig frischer Weißwein mit Aromen von grünen Zitrusfrüchten und Holunderblüte. Seine lebendige Säure und der lange, zitrische Gaumen machen ihn zum perfekten Begleiter leichter Sommergerichte.",
      fr: "Un blanc élégant et d'une fraîcheur croquante, aux arômes d'agrumes verts et de fleur de sureau. Son acidité vive et sa bouche longue et citronnée en font le compagnon idéal des plats d'été légers.",
      it: "Un bianco elegante e croccante di freschezza, con aromi di agrumi verdi e fiori di sambuco. La sua acidità vivace e il palato lungo e agrumato lo rendono il compagno perfetto dei piatti estivi leggeri.",
      sk: "Elegantné, sviežo chrumkavé biele víno s vôňou zelených citrusov a bazy. Jeho živá kyselinka a dlhý, citrusový záver z neho robia dokonalého spoločníka ľahkých letných jedál.",
      pl: "Eleganckie, rześko świeże białe wino o aromatach zielonych cytrusów i kwiatu czarnego bzu. Żywa kwasowość i długi, cytrusowy finisz czynią je doskonałym towarzyszem lekkich letnich dań.",
      nl: "Een elegante, knisperend frisse witte wijn met aroma's van groene citrus en vlierbloesem. De levendige zuren en de lange, citrusachtige afdronk maken hem tot de perfecte begeleider van lichte zomergerechten.",
    },
    jegyek: {
      hu: ["friss", "citrusos", "bodzavirág", "élénk savak"],
      en: ["fresh", "citrus", "elderflower", "lively acidity"],
      de: ["frisch", "Zitrusnoten", "Holunderblüte", "lebendige Säure"],
      fr: ["frais", "agrumes", "fleur de sureau", "acidité vive"],
      it: ["fresco", "agrumato", "fiori di sambuco", "acidità vivace"],
      sk: ["sviežy", "citrusy", "baza", "živá kyselinka"],
      pl: ["świeży", "cytrusy", "kwiat czarnego bzu", "żywa kwasowość"],
      nl: ["fris", "citrus", "vlierbloesem", "levendige zuren"],
    },
    dijnyertes: false,
    dij: {},
  },
  {
    nev: "Olaszrizling",
    fajta: "Olaszrizling",
    tipus: "Fehérbor",
    tema: "feher",
    evjarat: 2023,
    alkohol: "12,5%",
    kep: "assets/bottle-white.png",
    leiras: {
      hu: "A Kárpát-medence kedvelt fehér fajtája: zöldalmás, mandulás jegyek, kellemes telt test és karakteres, mégis lágy savak. Sokoldalú, gasztronómiai fehérbor a hétköznapok és az ünnepek asztalára.",
      en: "A beloved white variety of the Carpathian Basin: notes of green apple and almond, a pleasant full body and characterful yet gentle acidity. A versatile, food-friendly white for everyday and festive tables alike.",
      de: "Eine beliebte Weißweinsorte des Karpatenbeckens: Noten von grünem Apfel und Mandel, ein angenehm fülliger Körper und charaktervolle, dennoch sanfte Säure. Ein vielseitiger, speisebegleitender Weißwein für Alltag und Festtafel.",
      fr: "Un cépage blanc apprécié du bassin des Carpates : des notes de pomme verte et d'amande, un corps agréablement ample et une acidité de caractère mais douce. Un blanc polyvalent et gastronomique, pour la table de tous les jours comme des jours de fête.",
      it: "Una varietà bianca amata del bacino dei Carpazi: note di mela verde e mandorla, un corpo piacevolmente pieno e un'acidità di carattere ma delicata. Un bianco versatile e gastronomico, per la tavola di tutti i giorni e per le occasioni di festa.",
      sk: "Obľúbená biela odroda Karpatskej kotliny: tóny zeleného jablka a mandle, príjemne plné telo a charakterná, no jemná kyselinka. Všestranné, gastronomické biele víno na všedný i sviatočný stôl.",
      pl: "Ulubiona biała odmiana Kotliny Karpackiej: nuty zielonego jabłka i migdału, przyjemnie pełne ciało oraz charakterna, lecz łagodna kwasowość. Wszechstronne, gastronomiczne białe wino na co dzień i od święta.",
      nl: "Een geliefd wit druivenras van het Karpatenbekken: tonen van groene appel en amandel, een aangenaam vol lichaam en karaktervolle maar zachte zuren. Een veelzijdige, gastronomische witte wijn voor alledaagse en feestelijke tafels.",
    },
    jegyek: {
      hu: ["zöldalma", "mandula", "telt", "gasztronómiai"],
      en: ["green apple", "almond", "full", "food-friendly"],
      de: ["grüner Apfel", "Mandel", "füllig", "speisebegleitend"],
      fr: ["pomme verte", "amande", "ample", "gastronomique"],
      it: ["mela verde", "mandorla", "pieno", "gastronomico"],
      sk: ["zelené jablko", "mandľa", "plné", "gastronomické"],
      pl: ["zielone jabłko", "migdał", "pełne", "gastronomiczne"],
      nl: ["groene appel", "amandel", "vol", "gastronomisch"],
    },
    dijnyertes: false,
    dij: {},
  },
  {
    nev: "Rozé Kékfrankosból",
    fajta: "Kékfrankos",
    tipus: "Rozé",
    tema: "roze",
    evjarat: 2023,
    alkohol: "12%",
    kep: "assets/bottle-rose.png",
    leiras: {
      hu: "Lazacrózsaszín, illatos rozé eper és málna jegyekkel. Könnyed, gyümölcsös és üdítően friss – a nyári teraszozás elmaradhatatlan itala.",
      en: "A salmon-pink, fragrant rosé with notes of strawberry and raspberry. Light, fruity and refreshingly fresh — the indispensable drink for summer afternoons on the terrace.",
      de: "Ein lachsrosa, duftiger Rosé mit Noten von Erdbeere und Himbeere. Leicht, fruchtig und erfrischend — das unverzichtbare Getränk für Sommernachmittage auf der Terrasse.",
      fr: "Un rosé parfumé, rose saumon, aux notes de fraise et de framboise. Léger, fruité et d'une fraîcheur désaltérante — la boisson incontournable des après-midis d'été en terrasse.",
      it: "Un rosato profumato, rosa salmone, con note di fragola e lampone. Leggero, fruttato e dissetante — la bevanda immancabile dei pomeriggi estivi in terrazza.",
      sk: "Lososovo ružové, voňavé rosé s tónmi jahody a maliny. Ľahké, ovocné a osviežujúco svieže — nenahraditeľný nápoj na letné posedenia na terase.",
      pl: "Łososioworóżowe, pachnące rosé z nutami truskawki i maliny. Lekkie, owocowe i orzeźwiająco świeże — nieodzowny napój na letnie popołudnia na tarasie.",
      nl: "Een zalmroze, geurige rosé met tonen van aardbei en framboos. Licht, fruitig en verfrissend fris — de onmisbare drank voor zomerse middagen op het terras.",
    },
    jegyek: {
      hu: ["eper", "málna", "könnyed", "gyümölcsös"],
      en: ["strawberry", "raspberry", "light", "fruity"],
      de: ["Erdbeere", "Himbeere", "leicht", "fruchtig"],
      fr: ["fraise", "framboise", "léger", "fruité"],
      it: ["fragola", "lampone", "leggero", "fruttato"],
      sk: ["jahoda", "malina", "ľahký", "ovocný"],
      pl: ["truskawka", "malina", "lekki", "owocowy"],
      nl: ["aardbei", "framboos", "licht", "fruitig"],
    },
    dijnyertes: false,
    dij: {},
  },
];
