import { Item } from './Item.js';

export class Npc {
    /** Centralized constant array of NPC names loaded from npc-names.txt. */
    static names = [
        "Asiu", "Jolar", "Benabil", "Mahr", "Aqudro", "Ethema", "Abushah", "Nahi", "Joniahah", "Carsea", "Beha", "Onie", "Abaia", "Jomoranem", "Mahanus", "Luemon", "Janede", "Beleniasa", "Zetel", "Enel", "Elauer", "Maiaro", "Gaemeku", "Ephadaina", "Para", "Cahu", "Joludi", "Jobruelia", "Jabela", "Ashuso", "Aberdahm", "Zedemab", "Joahamor", "Elusern", "Anauk", "Abiazanar", "Irevia", "Sisenet", "Daniusah", "Jondeb", "Zeloama", "Jes", "Jonilend", "Jobiab", "Massabic", "Ithush", "Jobenea", "Ebahi", "Ashare", "Narss", "Ebrket", "Jariar", "Lenizersh", "Jobin", "Zelerko", "Momule", "Ashame", "Sezzar", "Aqushariru", "Lah", "Jonelessa", "Hahashel", "Lushi", "Zehaus", "Eliari", "Etharddril", "Jahacone", "Josto", "Phainu", "Elothth", "Isaha", "Abiahaha", "Elilis", "Epha", "Abinilors", "Aqukiaph", "Elian", "Geliz", "Sabilaha", "Aderian", "Eliara", "Jonamor", "Ithusha", "Zedanjae", "Abeb", "Jodelee", "Siahac", "Jorase", "Jona", "Bendelos", "Miamodel", "Demust", "Baleet", "Nath", "Elnac", "Dardo", "Jonamo", "Sinahat", "Mamo", "Zem", "Aquseli", "Masiach", "Imelo", "Abusae", "Tosasth", "Pharke", "Joniast", "Abramsh", "Zew", "Elusiasa", "Ganich", "Sethu", "Ithuser", "Ashy", "Lania", "Ebias", "Aneleo", "Shana", "Giaelir", "Nahud", "Joazahahane", "Jushometh", "Lamulde", "Phaemo", "Banew", "Phnanu", "Sicha", "Deliaza", "Mahae", "Danahr", "Zerdandeb", "Miachto", "Jonas", "Jehahal", "Jonictha", "Nahah", "Bedanas", "Lotiae", "Ishaz", "Isaph", "Nakonanja", "Elelca", "Phaso", "Jothoa", "Marimo", "Abese", "Oniuel", "Elihah", "Tiusiln", "Jobad", "Miai", "Mahacha", "Zesheren", "Jushaerah", "Larsoriam", "Jazane", "Abeph", "Abuma", "Serneac", "Jahaseset", "Jotha", "Tonahe", "Jedam", "Elahurar", "Zahanahahe", "Phadeld", "Jana", "Jelah", "Jobasha", "Aamolo", "Dahasat", "Jonah", "Betha", "Jobel", "Cananan", "Leon", "Jonabin", "Solob", "Pani", "Relelanj", "Danich", "Omishah", "Zebeach", "Abemah", "Siuso", "Abanat", "Saeus", "Aneli", "Esthna", "Maeliab", "Jobili", "Nemas", "Abariand", "Thanaha", "Joniph", "Jekeo", "Coael", "Jareusha", "Eliuel", "Mahani", "Elelchrd", "Jaham", "Zemsijari", "Joaphar", "Naheldr", "Jazaisha", "Joshazema", "Husasahi", "Jelialia", "Lahusaia", "Lemam", "Gashn", "Husan", "Geda", "Abiaha", "Daiana", "Leleliasi", "Canarde", "Amase", "Jahu", "Ellaili", "Elanan", "Abenen", "Nelahomo", "Ebahy", "Manarkona", "Jorahr", "Thari", "Honde", "Sahader", "Lemuaelia", "Joldazem", "Jaru", "Ginia", "Zemussemusa", "Jerthah", "Naselu", "Elesa", "Joat", "Aba", "Ezase", "Isot", "Loniat", "Aqus", "Anazziem", "Aselic", "Jonja", "Dani", "Josh", "Adause", "Havi", "Baziaiasot", "Aderahaz", "Zekel", "Nacha", "Joasor", "Jahar", "Mahiu", "Juniah", "Bebia", "Zelon", "Jonahusa", "Zelelash", "Tiachae", "Nias", "Elon", "Zexaki", "Shanemel", "Abich", "Huda", "Esona", "Nalij", "Hosha", "Jophelane", "Jusah", "Jonaruso", "Rub", "Mahrnu", "Manaus", "Abras", "Losebede", "Joses", "Phia", "Jorderia", "Elon", "Oniac", "Elekie", "Reliasha", "Jaggaria", "Joahea", "Dame", "Nacusa", "Amebb", "Jarimon", "Aqusoa", "Jaienaliu", "Jusakoe", "Abshau", "Adeseco", "Pharanah", "Ephor", "Anew", "Tolobe", "Isarija", "Jore", "Eliashar", "Bepha", "Elia", "Abaus", "Aquselo", "Sathiesh", "Miah", "Joaenin", "Siadahane", "Enosh", "Miphab", "Absha", "Jeonanez", "Phriah", "Elochame", "Soriabre", "Balia", "Jarerar", "Jobiahar", "Jonah", "Nahatu", "Othana", "Adebem", "Amuseph", "Jasare", "Uriaha", "Joriael", "Joni", "Josark", "Abimu", "Ashili", "Baselo", "Naniahac", "Nesahusa", "Iroli", "Sebanab", "Ethara", "Elonems", "Nesthaha", "Josae", "Jusebie", "Jonedek", "Phiach", "Jew", "Josaha", "Lussha", "Mahaiaru", "Amonevi", "Isiabe", "Eladende", "Nasia", "Josos", "Jachizic", "Mielu", "Elamazi", "Abrne", "Cahi", "Joai", "Cotoan", "Made", "Noram", "Eliana", "Abeb", "Strstia", "Simana", "Jueolich", "Habel", "Narelus", "Jussa", "Jelieli", "Abath", "Thap", "Basen", "Torana", "Caniahah", "Zethia", "Marn", "Jonelelia", "Dacha", "Simonek", "Asor", "Isia", "Jaha", "Mazia", "Asahaban", "Joluc", "Astehabn", "Daie", "Tiahu", "Azzad", "Cashissatha", "Hothat", "Aphatheru", "Siase", "Miter", "Jodah", "Joliahic", "Timele", "Justush", "Nahahash", "Caha", "Jaser", "Tha", "Damiel", "Aseli", "Gekiahar", "Cahanu", "Johniar", "Ezilesha", "Jereahat", "Clianiah", "Siane", "Sthast", "Abinelek", "Neli", "Miazel", "Maha", "Josamaco", "Jobeeaia", "Elaicuel", "Elelimeu", "Jahanel", "Juela", "Eliph", "Jonel", "Micash", "Zeth", "Eliamshe", "Manariaia", "Adelim", "Sonanera", "Cahmari", "Aziabr", "Abiahashi", "Elelia", "Siria", "Ishus", "Husah", "Eludaha", "Esabasa", "Eliathnia", "Lelithi", "Elich", "Jonem", "Eliner", "Zelek", "Janiadeu", "Dasthust", "Elicoth", "Abbru", "Shemo", "Jodeli", "Monaru", "Jososha", "Leri", "Jonelob", "Abela", "Phava", "Anaicosh", "Jashah", "Aphub", "Sissohu", "Elimon", "Nahrith", "Zashaz", "Elonelone", "Mahil", "Josama", "Jobi", "Belusa", "Miad", "Jobesosh", "Obap", "Cldero", "Abares", "Sizes", "Maberu", "Siach", "Juse", "Assera", "Dakabew", "Madek", "Elonah", "Iseu", "Joshew", "Lahem", "Biam", "Zeleli", "Anetha", "Shiara", "Zeonanus", "Gemusephane", "Laha", "Lediudel", "Obebnesan", "Gicat", "Jameliau", "Jemem", "Eliah", "Abija", "Aberin", "Shaser", "Shaephah", "Iseue", "Oteraia", "Jast", "Jorth", "Iriali", "Pelahiat", "Abeus", "Jemi", "Hashnab", "Bahr", "Elishae", "Bica", "Habiabep", "Elell", "Adedehiac", "Juelich", "Michare", "Jonah", "Haeki", "Otthi", "Joloma", "Samaria", "Thiaa", "Lurach", "Obac", "Jone", "Jalimeku", "Hul", "Momus", "Abbedrk", "Sanilahi", "Zami", "Abaime", "Gethah", "Aque", "Justhau", "Elem", "Joeli", "Shassh", "Abenes", "Hudeb", "Phani", "Eline", "Zemath", "Asijamosh", "Aneldr", "Runachan", "Sinashus", "Ebaku", "Jahaheli", "Jahn", "Clia", "Adrkaha", "Emecah", "Absha", "Ishuna", "Ethase", "Abemm", "Mabam", "Miashu", "Betha", "Tosab", "Jobamah", "Nalica", "Zenahi", "Jelim", "Ebiphaia", "Mamia", "Hushanus", "Tomusec", "Nananjah", "Casaah", "Esadatha", "Ellebipha", "Elias", "Jonijash", "Joba", "Othicar", "Enana", "Claneud", "Lufu", "Elud", "Jodiavi", "Abashmus", "Manekimo", "Josade", "Luselela", "Maiailos", "Jomebiai", "Zerameli", "Phahri", "Sidonada", "Elisha", "Tosea", "Basah", "Joshiae", "Jeriebusa", "Jothu", "Paniecha", "Abinae", "Nasha", "Josoaba", "Reth", "Ephra", "Naielo", "Jemoaba", "Jorushia", "Asade", "Haphah", "Homap", "Otholo", "Ebrk", "Irneliath", "Etthani", "Mahona", "Marne", "Miner", "Josari", "Amuesthos", "Jord", "Zeset", "Larthe", "Micha", "Esaha", "Othade", "Conaha", "Andekk", "Ashia", "Sijat", "Jabia", "Anenara", "Jesa", "Sine", "Jazrimo", "Nashusso", "Zenaha", "Elammat", "Asha", "Benaha", "Jahana", "Aben", "Remahache", "Nahahahai", "Nianjar", "Bahia", "Nahiai", "Joliana", "Anima", "Josha", "Abelumoa", "Enue", "Abilek", "Joliarte", "Ethia", "Isethe", "Jamidaso", "Dadabr", "Ashic", "Joshicasa", "Jananjah", "Zeneroseu", "Emoliab", "Coth", "Jedeluev", "Jani", "Clulos", "Jonam", "Rechanu", "Mahaza", "Joloniuk", "Abiar", "Zemabat", "Zehe", "Zelobi", "Dare", "Micai", "Jonaba", "Eledos", "Asstha", "Jena", "Abacha", "Minisoba", "Husebre", "Adaria", "Nairo", "Abrsep", "Josiach", "Jol", "Zedemah", "Jaria", "Tha", "Baeniam", "Abew", "Nonephr", "Adenash", "Nahinu", "Maiahuer", "Maethis", "Bephac", "Nahade", "Thian", "Shmushi", "Abrach", "Adekki", "Asheha", "Asaremel", "Jahichar", "Abbe", "Joahahan", "Jalel", "Zele", "Causs", "Eliaz", "Joniadai", "Jonebum", "Hoash", "Jobimaha", "Anelane", "Jonirica", "Clieridar", "Elush", "Momy", "Phah", "Phusarelli", "Saro", "Abrukew", "Relanan", "Miassaen", "Pelie", "Phaeri", "Ashias", "Anau", "Amom", "Urahaiaba", "Mabeas", "Maha", "Aauss", "Jussonah", "Abaec", "Jothas", "Momad", "Jazaeri", "Abicas", "Mavaiath", "Emacha", "Joththi", "Maianose", "Abiah", "Janem", "Maniaphae", "Eponus", "Sosic", "Anaiaderomo", "Phram", "Clai", "Aphnar", "Shanen", "Selkuia", "Ellad", "Thiemela", "Abaha", "Othi", "Adeth", "Danephen", "Miccam", "Lani", "Hani", "Nanah", "Jolianab", "Eliaue", "Thamabi", "Asse", "Mah", "Ezelo", "Caha", "Jonepha", "Madi", "Niaeo", "Nama", "Chazal", "Latoa", "Sasona", "Nihaham", "Amy", "Uzeza", "Asechabb", "Bona", "Jonimusa", "Asoah", "Tisebich", "Phama", "Zelinush", "Gesa", "Demss", "Zephadiat", "Azah", "Isthu", "Badahaca", "Eldama", "Joahiah", "Ledel", "Nacari", "Ursh", "Barud", "Adeke", "Adilel", "Aziria", "Molinell", "Elirilari", "Baramus", "Sahana", "Baphana", "Anek", "Jabri", "Iserde", "Jahenash", "Cllad", "Zeriaus", "Sacha", "Isasec", "Abaese", "Asevia", "Jalaho", "Elict", "Jero", "Siathah", "Jasha", "Amonea", "Jaldemez", "Seker", "Jonia", "Jeliustu", "Abara", "Marerdr", "Jossse", "Jonahe", "Haetia", "Abnini", "Elushep", "Abaise", "Ephas", "Isel", "Mahahuew", "Jullic", "Jes", "Barnaen", "Jaihenede", "Abal", "Dabarara", "Darona", "Nandelam", "Abstthic", "Jona", "Josa", "Jolaic", "Nadase", "Joshot", "Jushahy", "Ashiana", "Abem", "Juseb", "Elarud", "Cach", "Lesssh", "Abeso", "Luepha", "Jeliasha", "Abekk", "Omomania", "Jonea", "Elcoban", "Jahah", "Elias", "Zenet", "Dares", "Imaiana", "Vissaher", "Nimo", "Elonah", "Andew", "Abani", "Laezzi", "Cobriania", "Jodian", "Ishani", "Abrashah", "Jonaeo", "Joda", "Janizim", "Jekushr", "Imush", "Elichon", "Abidenell", "Sanaria", "Abahusob", "Mial", "Ashia", "Zeomar", "Abasel", "Miniet", "Sisaet", "Jemosh", "Nahae", "Josanes", "Zekom", "Gel", "Clil", "Shaeesha", "Ephach", "Abrich", "Jushe", "Nanidat", "Sothelia", "Abaz", "Joeche", "Joseo", "Ammite", "Jonda", "Zehaner", "Lureulab", "Alew", "Asia", "Zeth", "Juch", "Pahah", "Jahababi", "Phiushe", "Elis", "Abich", "Thahahnart", "Zeniahaz", "Isahasa", "Joaimeth", "Etha", "Jobela", "Aderi", "Miamub", "Jebn", "Thaha", "Joshah", "Jelnit", "Jonebini", "Tochaco", "Asonahana", "Jaheones", "Ashah", "Zendo", "Emi", "Jobiacama", "Madri", "Shadash", "Jecha", "Bahaemo", "Joreaia", "Aliahu", "Monde", "Dani", "Ashemaus", "Emmiaha", "Mec", "Gearuda", "Nas", "Ellimad", "Bari", "Jahiass", "Abran", "Abathad", "Joniahe", "Zeuemar", "Nashiah", "Anaderil", "Jananab", "Zeliaz", "Johamm", "Josah", "Jorasasha", "Sahushi", "Jonas", "Hasha", "Jothe", "Vius", "Joruni", "Jelondes", "Zebe", "Emustha", "Jolosa", "Eliar", "Miliu", "Gasost", "Janeub", "Jash", "Sothar", "Jacaichend", "Dasam", "Sini", "Belema", "Asiaie", "Giele", "Lek", "Jela", "Adem", "Nahat", "Joser", "Tiachah", "Jahassh", "Shashath", "Manue", "Beloba", "Naneli", "Zernai", "Shulcus", "Bathu", "Thahinia", "Abelo", "Boshia", "Lebase", "Niat", "Neher", "Abndanara", "Boshy--", "Giril", "Phne", "Husheva", "Nahia", "Hosah", "Caharebem", "Joseos", "Tichai", "Abahnean", "Lesaz", "Aaus", "Miasethah", "Hanet", "Sharuss", "Gelobumo", "Naches", "Nahthra", "Jaronija", "Jariai", "Nelahaha", "Marthai", "Clil", "Geseric", "Aastha", "Joricheth", "Bem", "Ezeanazz", "Jondash", "Sthan", "Alazen", "Amia", "Jona", "Jolkija", "Periu", "Phniu", "Jelot", "Janet", "Mimaecha", "Jothal", "Harab", "Eliain", "Nashah", "Zeku", "Elisel", "Adera", "Aaraias", "Joni", "Eliaemea", "Ebriar", "Jolkkot", "Zeromani", "Joenil", "Jahah", "Loahu", "Marahan", "Naius", "Jucharel", "Phan", "Thahmes", "Ebin", "Jelelina", "Joth", "Elne", "Isssheph", "Abraza", "Lanen", "Molor", "Joshush", "Dagggana", "Jaeardai", "Eleli", "Mahana", "Jeriahi", "Mosah", "Sthia", "Sausas", "Mahasen", "Narkenan", "Jabia", "Marian", "Nahian", "Zemuse", "Harirar", "Janah", "Nianabah", "Josemica", "Isonaso", "Nernia", "Abadethr", "Jerso", "Othahi", "Bashe", "Siadaz", "Issaeom", "Azebihah", "Ishiru", "Manuseph", "Abi", "Adach", "Miser", "Shahah", "Amusacus", "Dariche", "Bamu", "Bemud", "Asiau", "Sanicusa", "Aldev", "Iraeune", "Elchamu", "Emesevie", "Zedele", "Gesha", "Honeh", "Bictho", "Siulo", "Manon", "Jartha", "Phic", "Asela", "Lanenuss", "Zelise", "Makee", "Baber", "Phother", "Eloara", "Beraeru", "Seldin", "Clehah", "Jomanah", "Janicha", "Shani", "Phech", "Nakar", "Jakezimy", "Abaielu", "Socaha", "Hanothahabe", "Jonane", "Jarosh", "Ezeph", "Ephazeli", "Jahes", "Stheaez", "Siaha", "Omuesi", "Abriex", "Isari", "Nijaeth", "Abasosa", "Phahime", "Pelemor", "Eliaharn", "Maharud", "Geohra", "Sasel", "Jolliet", "Husas", "Jadah", "Onahaseo", "Dahasth", "Ezzelinac", "Jonaha", "Lahari", "Jaritai", "Aber", "Emer", "Asheo", "Phthie", "San", "Elchuso", "Gebru", "Conamo", "Abranja", "Luchriai", "Luenane", "Omiar", "Ashahen", "Ezelonde", "Dareu", "Gede", "Jahaph", "Amussoa", "Ezahy--", "Uzebe", "Zeliah", "Coaiuez", "Eliza", "Jorah", "Miatham", "Sicatha", "Urchana", "Phenither", "Josahia", "Juse", "Joazaaran", "Abadaph", "Thathtus", "Sia", "Jusanash", "Phahud", "Beluc", "Timas", "Naiacha", "Maviar", "Dehaimy", "Lebesi", "Cahau", "Oniaha", "Elasia", "Ashona", "Bew-----", "Tialus", "Sililai", "Elah", "Luerisah", "Joell", "Lus", "Abadiel", "Zephelo", "Milni", "Bamep", "Iriah", "Saimsia", "Eliabbe", "Hufusa", "Elicha", "Elianah", "Jorakuss", "Gahah", "Ishe", "Sianiazem", "Elelera", "Amus", "Zahene", "Elashah", "Daneph", "Amadil", "Melone", "Abaew", "Ada", "Adeacho", "Elkulemab", "Anet", "Jarae", "Viausha", "Namod", "Sicaderu", "Juchrthr", "Josodel", "Thrasase", "Abinah", "Dahande", "Eliabesh", "Mabianuss", "Jedame", "San", "Miahicac", "Joani", "Emet", "Homy", "Bessacu", "Sarandea", "Nerekerk", "Nithah", "Sitra", "Mihrah", "Abamusori", "Naemot", "Asonahea", "Bahaneph", "Elauses", "Anaromar", "Besa", "Jonan", "Thenian", "Assili", "Honid", "Phius", "Sis", "Naueme", "Ganet", "Zarusavi", "Paiad", "Anelap", "Miaha", "Abnekkk", "Amela", "Uzelonap", "Zehich", "Elihan", "Meahms", "Janabera", "Pamoniu", "Ithimabi", "Elau", "Zekara", "Macha", "Jomottha", "Juser", "Haphuda", "Jahasot", "Jusse", "Joneman", "Aahishaze", "Panehat", "Abrna", "Phiakorai", "Seladim", "Iriphin", "Eleleo", "Jonain", "Lact", "Joria", "Deanaech", "Jomina", "Elush", "Jar", "Amatha", "Eler", "Ebararic", "Baniahar", "Caiah", "Nare", "Zelisel", "Jeush", "Otha", "Manjanu", "Amalko", "Nahonil", "Iseda", "Eloshah", "Jameaeh", "Nahasat", "Hoasat", "Stham", "Giabah", "Elic", "Jonahrn", "Josasth", "Elianar", "Tosel", "Mala", "Zekuli", "Elonja", "Elesh", "Jush", "Jania", "Anaep", "Issham", "Sichan", "Coshe", "Barkane", "Naselah", "Elahi", "Hake", "Eliaz", "Shahin", "Jelev", "Elahau", "Joae", "Jerdar", "Elema", "Navine", "Mened", "Phasthi", "Elila", "Siaha", "Nela", "Gini", "Pholahu", "Zethush"
    ];

    /** Centralized static constant map of prime requisites per class. */
    static primeMap = {
        'Cleric': 'WIS',
        'Fighter': 'STR',
        'Magic-User': 'INT',
        'Thief': 'DEX'
    };

    /** Centralized progression table mapping class levels. */
    static progressionTable = {
        'Cleric': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11],
        'Fighter': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'Magic-User': [0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        'Thief': [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11]
    };

    /** Centralized hit dice mapping per class. */
    static hitDiceMap = {
        'Cleric': 6,
        'Fighter': 8,
        'Magic-User': 4,
        'Thief': 4
    };

    /** Centralized weapon options mapping per class. */
    static weaponMap = {
        'Cleric': ['warhammer', 'mace', 'maul'],
        'Fighter': ['longsword', 'shortsword', 'battle axe', 'great axe', 'scimitar', 'spear'],
        'Magic-User': ['dagger', 'walking staff'],
        'Thief': ['longsword', 'shortsword', 'battle axe', 'scimitar']
    };

    /** Centralized spell pools per class. */
    static spellPools = {
        'Cleric': ['protection from evil*', 'find traps', 'speak with animals', 'continual light*', 'cure light wds', 'bless', 'resist fire', 'speak with dead'],
        'Magic-User': ['charm person', 'detect magic', 'shield', 'sleep', 'continual light', 'invisibility', 'fire ball', 'fly']
    };

    /** Centralized base XP table. */
    static baseXpTable = { 1: 25, 2: 75, 3: 145, 4: 240, 5: 360, 6: 555, 7: 670, 8: 945, 9: 1225, 10: 1390 };

    /**
     * Initializes a new NPC instance with default parameters.
     */
    constructor() {
        this.id = 0;
        this.room = null;
        this.name = '';
        this.race = 'Human';
        this.className = 'Fighter';
        this.level = 1;
        this.statBlock = '';
        this.appearing = 1;
        this.hp = 1;
        this.ac = 11;
        this.ab = 1;
        this.at = '1 weapon';
        this.dam = '1d6';
        this.mv = "40'";
        this.ml = 9;
        this.xp = 25;
        this.stats = { STR: 11, INT: 11, WIS: 11, DEX: 11, CON: 11, CHA: 11, STR_mod: 0, INT_mod: 0, WIS_mod: 0, DEX_mod: 0, CON_mod: 0, CHA_mod: 0 };
        this.spells = [];
        this.equipment = [];
        this.isNpc = true;
    }

    /**
     * Generates and registers a new NPC instance in global tracking lists.
     * @param {number|null} roomId - Room identifier if placed in a room.
     * @param {Array} roomList - List of rooms.
     * @returns {Npc} The created NPC instance.
     */
    static generate(roomId = null, roomList) {
        const n = new Npc();
        n.id = window.cocMonsterList ? window.cocMonsterList.length : 0;
        if (!window.cocMonsterList) window.cocMonsterList = [];
        window.cocMonsterList[n.id] = n;

        if (roomId !== null && roomList[roomId]) {
            n.room = roomId;
            roomList[roomId].monsters.push(n.id);
        }
        return n;
    }

    /**
     * Generates a party of adventurer NPCs based on party composition rules.
     * @param {number|null} roomId - Room identifier.
     * @param {number} level - Dungeon level.
     * @param {Array} roomList - Room list.
     * @param {Cavern} cavern - Cavern generator instance.
     * @returns {Npc} The first generated NPC in the party.
     */
    static makeNpcPartyByLevel(roomId = null, level = 1, roomList, cavern) {
        const numFighters = cavern.roll(1, 3, 1);
        const numThieves = cavern.roll(1, 2, 1);
        const numClerics = cavern.roll(1, 2, 1);
        const numMUs = Math.max(0, cavern.roll(1, 2, 1) - 1);

        const classes = [];
        for (let i = 0; i < numFighters; i++) classes.push('Fighter');
        for (let i = 0; i < numThieves; i++) classes.push('Thief');
        for (let i = 0; i < numClerics; i++) classes.push('Cleric');
        for (let i = 0; i < numMUs; i++) classes.push('Magic-User');

        let firstNpc = null;
        classes.forEach(cls => {
            const npc = Npc.generate(roomId, roomList);
            npc.className = cls;
            Npc.buildCharacter(npc, level, cavern);
            if (!firstNpc) firstNpc = npc;
        });

        return firstNpc;
    }

    /**
     * Builds and populates complete character statistics, race, attributes, equipment, and spells for an NPC.
     * @param {Npc} npc - NPC instance.
     * @param {number} targetLevel - Target level.
     * @param {Cavern} cavern - Cavern generator instance.
     */
    static buildCharacter(npc, targetLevel, cavern) {
        // Choose random name from centralized constant names array
        npc.name = cavern.chooseOne(Npc.names);

        let intermediateLevel = targetLevel;
        if (cavern.p(30)) {
            intermediateLevel = Math.max(cavern.roll(1, targetLevel), cavern.roll(1, targetLevel));
        }

        const classProg = Npc.progressionTable[npc.className] || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const lvlIdx = Math.min(Math.max(intermediateLevel, 0), classProg.length - 1);
        npc.level = classProg[lvlIdx];
        if (npc.level === 0) npc.level = 1;

        const roll3d6 = () => cavern.rollSum(3, 6);
        npc.stats.STR = roll3d6();
        npc.stats.INT = roll3d6();
        npc.stats.WIS = roll3d6();
        npc.stats.DEX = roll3d6();
        npc.stats.CON = roll3d6();
        npc.stats.CHA = roll3d6();

        const primeAttr = Npc.primeMap[npc.className];
        if (primeAttr) {
            npc.stats[primeAttr] = Math.max(roll3d6(), 9, npc.stats[primeAttr]);
        }
        npc.stats.CON = Math.max(roll3d6(), npc.stats.CON);

        const getMod = (score) => {
            if (score <= 3) return -3;
            if (score <= 5) return -2;
            if (score <= 8) return -1;
            if (score <= 12) return 0;
            if (score <= 15) return 1;
            if (score <= 17) return 2;
            return 3;
        };
        npc.stats.STR_mod = getMod(npc.stats.STR);
        npc.stats.INT_mod = getMod(npc.stats.INT);
        npc.stats.WIS_mod = getMod(npc.stats.WIS);
        npc.stats.DEX_mod = getMod(npc.stats.DEX);
        npc.stats.CON_mod = getMod(npc.stats.CON);
        npc.stats.CHA_mod = getMod(npc.stats.CHA);

        npc.race = 'Human';
        if (cavern.p(25)) {
            const eligible = [];
            if (npc.stats.CON >= 9 && npc.className !== 'Magic-User') eligible.push('Dwarf');
            if (npc.stats.INT >= 9) eligible.push('Elf');
            if (npc.stats.DEX >= 9 && npc.className !== 'Magic-User') eligible.push('Halfling');
            if (eligible.length > 0) {
                npc.race = cavern.chooseOne(eligible);
            }
        }
        if (npc.race === 'Dwarf' && npc.stats.CHA > 17) npc.stats.CHA = 17;
        if (npc.race === 'Elf' && npc.stats.CON > 17) npc.stats.CON = 17;
        if (npc.race === 'Halfling' && npc.stats.STR > 17) npc.stats.STR = 17;

        npc.mv = "40'";
        npc.ml = 9;
        const sides = Npc.hitDiceMap[npc.className] || 6;
        let hpTotal = 0;
        const effectiveLevel = npc.level;
        for (let l = 1; l <= Math.min(effectiveLevel, 9); l++) {
            let rollHp = cavern.computeRoll('1d' + sides) + npc.stats.CON_mod;
            if (rollHp < 1) rollHp = 1;
            hpTotal += rollHp;
        }
        if (effectiveLevel > 9) {
            const extraInc = (npc.className === 'Fighter' || npc.className === 'Thief') ? 2 : 1;
            hpTotal += (effectiveLevel - 9) * extraInc;
        }
        if (hpTotal < 1) hpTotal = 1;
        npc.hp = hpTotal;

        if (npc.className === 'Fighter') {
            npc.ab = Math.min(npc.level, 10);
        } else if (npc.className === 'Cleric') {
            npc.ab = npc.level <= 2 ? 1 : (npc.level <= 4 ? 2 : (npc.level <= 6 ? 3 : (npc.level <= 8 ? 4 : 5)));
        } else if (npc.className === 'Thief') {
            npc.ab = npc.level <= 3 ? 1 : (npc.level <= 6 ? 2 : (npc.level <= 9 ? 3 : 4));
        } else {
            npc.ab = npc.level <= 3 ? 0 : (npc.level <= 7 ? 1 : 2);
        }

        let baseAc = 11;
        let armorName = '';
        if (npc.className === 'Magic-User') {
            armorName = '';
            baseAc = 11;
            npc.mv = "40'";
        } else if (npc.className === 'Thief') {
            armorName = 'leather armor';
            baseAc = 13;
            npc.mv = "30'";
        } else {
            const armors = ['leather armor', 'chain mail', 'plate mail'];
            armorName = cavern.chooseOne(armors);
            if (armorName === 'leather armor') { baseAc = 13; npc.mv = "30'"; }
            else if (armorName === 'chain mail') { baseAc = 15; npc.mv = "20'"; }
            else { baseAc = 17; npc.mv = "20'"; }
        }

        const armorChance = npc.className === 'Magic-User' ? Math.min(95, npc.level * 4) : Math.min(95, npc.level * 5);
        if (armorName && cavern.p(armorChance)) {
            const bonus = cavern.roll(1, 3);
            armorName += ' +' + bonus;
            baseAc += bonus;
            npc.mv = "40'";
        }
        if (armorName) npc.equipment.push(armorName);

        let shieldBonus = 0;
        if ((npc.className === 'Cleric' || npc.className === 'Fighter') && npc.level >= 1) {
            const shieldChance = Math.min(95, npc.level * 5);
            if (cavern.p(shieldChance)) {
                const sBonus = cavern.roll(1, 3);
                shieldBonus = 1 + sBonus;
                npc.equipment.push('shield +' + sBonus);
            } else {
                shieldBonus = 1;
                npc.equipment.push('shield');
            }
        }

        const wList = Npc.weaponMap[npc.className] || ['longsword'];
        let weapon = cavern.chooseOne(wList);
        npc.at = '1 ' + weapon;
        npc.dam = weapon === 'great axe' || weapon === 'two-handed sword' || weapon === 'pole arm' ? '1d10' : (weapon === 'maul' ? '1d10' : (weapon === 'mace' || weapon === 'longsword' || weapon === 'battle axe' || weapon === 'scimitar' ? '1d8' : '1d6'));

        const weaponChance = npc.className === 'Magic-User' ? Math.min(95, npc.level * 3) : Math.min(95, npc.level * 5);
        if (cavern.p(weaponChance)) {
            const wBonus = cavern.roll(1, 3);
            weapon += ' +' + wBonus;
        }
        npc.equipment.push(weapon);

        npc.ac = baseAc + shieldBonus + npc.stats.DEX_mod;

        if (Npc.spellPools[npc.className]) {
            const pool = Npc.spellPools[npc.className];
            const spellCount = Math.max(1, Math.min(npc.level, 5));
            const selectedSpells = [];
            for (let s = 0; s < spellCount; s++) {
                const sp = cavern.chooseOne(pool);
                if (!selectedSpells.includes(sp)) {
                    selectedSpells.push(sp);
                }
            }
            if (selectedSpells.length > 0 && cavern.p(50)) {
                selectedSpells[0] = '2x ' + selectedSpells[0];
            }
            npc.spells = selectedSpells;
        }

        npc.xp = Npc.baseXpTable[npc.level] || (1390 + (npc.level - 10) * 200);
    }
}
