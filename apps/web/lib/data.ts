import { ContentItem } from "@/types/content";

export const MOCK_EPISODES = [
  { id: "e1", num: 1, title: "Le point de rupture", imageUrl: "https://picsum.photos/seed/ep1/200/112" },
  { id: "e2", num: 2, title: "Trahison", imageUrl: "https://picsum.photos/seed/ep2/200/112" },
  { id: "e3", num: 3, title: "Révélations", imageUrl: "https://picsum.photos/seed/ep3/200/112" },
  { id: "e4", num: 4, title: "Face à face", imageUrl: "https://picsum.photos/seed/ep4/200/112" },
];

export const EXCLUSIVES_MOVIES: ContentItem[] = [
  { id: "banel-adama", title: "Banel & Adama", imageUrl: "/banel-et-adama.jpg", type: "film", classification: "12+", year: 2023, genres: ["Drame", "Romance"], duration: "1h 27m", synopsis: "Banel et Adama s'aiment d'un amour absolu dans un village reculé du Nord du Sénégal, défiant les conventions de leur communauté." },
  { id: "tirailleurs", title: "Tirailleurs", imageUrl: "/tirailleurs.jpg", type: "film", classification: "12+", year: 2022, genres: ["Guerre", "Drame"], duration: "1h 40m", synopsis: "1917. Bakary s'enrôle dans l'armée française pour rejoindre et protéger son fils enrôlé de force." },
  { id: "xale", title: "Xalé, les blessures de l'enfance", imageUrl: "/xale.png", type: "film", classification: "16+", year: 2022, genres: ["Drame"], duration: "1h 41m", synopsis: "Awa, une écolière de 15 ans, voit sa vie basculer suite au décès de sa grand-mère." },
  { id: "demba", title: "Demba", imageUrl: "/demba.jpg", type: "film", classification: "Tous publics", year: 2024, genres: ["Drame"], duration: "1h 59m", synopsis: "Demba, un employé de mairie proche de la retraite, lutte pour surmonter son deuil." },
  { id: "dahomey", title: "Dahomey", imageUrl: "/dahomey.jpg", type: "film", classification: "Tous publics", year: 2024, genres: ["Documentaire"], duration: "1h 08m", synopsis: "En novembre 2021, 26 trésors royaux du Dahomey s'apprêtent à quitter Paris pour être rapatriés au Bénin." },
  { id: "atlantique", title: "Atlantique", imageUrl: "/atlantique.jpeg", type: "film", classification: "12+", year: 2019, genres: ["Drame", "Fantastique"], duration: "1h 46m", synopsis: "À Dakar, des ouvriers non payés prennent la mer. Peu après, une mystérieuse fièvre s'empare des filles du quartier." },
  { id: "saloum", title: "Saloum", imageUrl: "/saloum.jpg", type: "film", classification: "16+", year: 2021, genres: ["Thriller", "Action"], duration: "1h 24m", synopsis: "Fuyant la Guinée-Bissau, des mercenaires surnommés les Hyènes de Bangui trouvent refuge dans le mystique delta du Sine-Saloum." },
  { id: "yao", title: "Yao", imageUrl: "/yao.jpg", type: "film", classification: "Tous publics", year: 2018, genres: ["Comédie", "Drame"], duration: "1h 44m", synopsis: "Un célèbre acteur français d'origine sénégalaise rencontre un jeune garçon de 13 ans prêt à tout pour le voir." },
  { id: "mouton-sada", title: "Le Mouton de Sada", imageUrl: "/le-mouton-de-sada.jpg", type: "film", classification: "Tous publics", year: 2023, genres: ["Drame", "Famille"], duration: "1h 20m", synopsis: "L'histoire touchante autour de la préparation de la fête de la Tabaski pour un jeune garçon." },
  { id: "pere-nafi", title: "Le Père de Nafi", imageUrl: "/le-pere-de-nafi.jpg", type: "film", classification: "12+", year: 2019, genres: ["Drame"], duration: "1h 49m", synopsis: "Deux frères s'affrontent au sujet du mariage de leurs enfants dans une petite ville sous influence extrémiste." }
];

export const TRENDING_MOVIES: ContentItem[] = [
  { id: "pirogue", title: "La Pirogue", imageUrl: "/la-pirogue.jpg", type: "film", classification: "12+", year: 2012, genres: ["Drame", "Aventure"], duration: "1h 27m", synopsis: "Un groupe de Sénégalais embarque à bord d'une pirogue pour une traversée périlleuse vers les îles Canaries." },
  { id: "karmen", title: "Karmen Geï", imageUrl: "/karmen-gei.jpg", type: "film", classification: "16+", year: 2001, genres: ["Musical", "Drame"], duration: "1h 26m", synopsis: "Une réinterprétation audacieuse et sénégalaise de Carmen, mêlant liberté, musique et passion dans une prison de femmes." },
  { id: "ndeysaan", title: "Ndeysaan (Le Prix du Pardon)", imageUrl: "/ndeysaan.jpeg", type: "film", classification: "12+", year: 2001, genres: ["Drame"], duration: "1h 30m", synopsis: "Un brouillard mystérieux recouvre un village de pêcheurs. Deux amis d'enfance rivalisent pour l'amour d'une femme, entraînant une tragédie et un lourd sacrifice." },
  { id: "madame-brouette-2", title: "Madame Brouette", imageUrl: "/madame-brouette.jpg", type: "film", classification: "12+", year: 2002, genres: ["Comédie", "Drame"], duration: "1h 44m", synopsis: "Mati, alias Madame Brouette, refuse de dépendre des hommes après une déception amoureuse." },
  { id: "tey", title: "Tey (Aujourd'hui)", imageUrl: "/tey-aujourdhui.jpg", type: "film", classification: "Tous publics", year: 2012, genres: ["Drame"], duration: "1h 26m", synopsis: "Satché sait qu'il va mourir à la fin de la journée et décide de vivre ses dernières heures de la façon la plus intense." },
  { id: "etoiles", title: "Des Étoiles", imageUrl: "/des-etoiles.jpg", type: "film", classification: "Tous publics", year: 2013, genres: ["Drame"], duration: "1h 28m", synopsis: "Entre Dakar, Turin et New York, les destins croisés de plusieurs Sénégalais sur le thème universel de l'exil." },
  { id: "tableau-ferraille", title: "Tableau Ferraille", imageUrl: "/tableau-ferraille.jpg", type: "film", classification: "12+", year: 1997, genres: ["Drame"], duration: "1h 32m", synopsis: "Daam, un politicien plein de bonnes intentions, se trouve confronté aux réalités du pouvoir dans un quartier de Dakar." },
  { id: "transport-commun", title: "Un transport en commun", imageUrl: "/un-transport-en-commun.jpg", type: "film", classification: "Tous publics", year: 2009, genres: ["Musical", "Drame"], duration: "48m", synopsis: "Les passagers d'un taxi-brousse reliant Dakar à Saint-Louis chantent leurs histoires au cours de ce road-movie musical." },
  { id: "absence", title: "L'Absence", imageUrl: "/labsence.jpg", type: "film", classification: "12+", year: 2009, genres: ["Drame"], duration: "1h 24m", synopsis: "Djibril, un étudiant brillant, rentre au Sénégal après quinze ans d'absence, ce qui bouleverse son entourage." },
  { id: "franc", title: "Le Franc", imageUrl: "/le-franc.jpg", type: "film", classification: "Tous publics", year: 1994, genres: ["Comédie"], duration: "45m", synopsis: "Marigo, un musicien fauché, gagne à la loterie nationale. Le seul problème est qu'il a collé son billet sur la porte de sa chambre." }
];

export const CLASSIC_MOVIES: ContentItem[] = [
  { id: "lanoire", title: "La Noire de...", imageUrl: "/la-noire-de.jpg", type: "film", classification: "12+", year: 1966, genres: ["Classique", "Drame"], duration: "1h 05m", synopsis: "Diouana, une jeune Sénégalaise engagée comme bonne par une famille bourgeoise française, découvre la solitude et le racisme." },
  { id: "toukibouki", title: "Touki Bouki", imageUrl: "/touki-bouki.jpg", type: "film", classification: "12+", year: 1973, genres: ["Classique", "Drame"], duration: "1h 35m", synopsis: "Mory, un berger rebelle, et Anta, une étudiante, rêvent de quitter Dakar pour Paris, prêts à tout pour trouver l'argent." },
  { id: "xala", title: "Xala", imageUrl: "/xala.jpg", type: "film", classification: "12+", year: 1975, genres: ["Classique", "Satire"], duration: "2h 03m", synopsis: "El Hadji Abdou Kader Beye, un homme d'affaires corrompu, est frappé d'impuissance le soir de son troisième mariage." },
  { id: "hyenes", title: "Hyènes", imageUrl: "/hyenes.jpeg", type: "film", classification: "12+", year: 1992, genres: ["Classique", "Drame"], duration: "1h 50m", synopsis: "Linguère Ramatou, devenue immensément riche, revient dans son village ruiné pour se venger de l'homme qui l'a trahie autrefois." },
  { id: "mandat", title: "Le Mandat", imageUrl: "/le-mandat.jpg", type: "film", classification: "Tous publics", year: 1968, genres: ["Classique", "Comédie"], duration: "1h 45m", synopsis: "Ibrahima, père de famille au chômage, reçoit un mandat de Paris mais se heurte à l'absurdité de la bureaucratie sénégalaise." },
  { id: "moolaade", title: "Moolaadé", imageUrl: "/moolaade.jpg", type: "film", classification: "12+", year: 2004, genres: ["Classique", "Drame"], duration: "2h 04m", synopsis: "Collé Ardo refuse que sa fille soit excisée et offre le droit d'asile à quatre autres fillettes qui fuient ce rituel." },
  { id: "ceddo", title: "Ceddo", imageUrl: "/ceddo.jpeg", type: "film", classification: "12+", year: 1977, genres: ["Classique", "Drame"], duration: "1h 57m", synopsis: "La résistance farouche des Ceddo, dépositaires de la culture spirituelle, face à la montée de l'islamisation et de la royauté." },
  { id: "camp-thiaroye", title: "Camp de Thiaroye", imageUrl: "/camp-de-thiaroye.jpg", type: "film", classification: "12+", year: 1988, genres: ["Classique", "Guerre"], duration: "2h 37m", synopsis: "Le massacre tragique de tirailleurs sénégalais démobilisés par l'armée coloniale française en 1944 dans le camp de Thiaroye." },
  { id: "guelwaar", title: "Guelwaar", imageUrl: "/guelwaar.jpg", type: "film", classification: "Tous publics", year: 1992, genres: ["Classique", "Drame"], duration: "1h 55m", synopsis: "Un célèbre opposant décède, mais son corps est échangé par erreur, créant de fortes tensions entre musulmans et chrétiens." },
  { id: "borom-sarret", title: "Borom Sarret", imageUrl: "/borom-sarret.jpeg", type: "film", classification: "Tous publics", year: 1963, genres: ["Classique", "Drame"], duration: "20m", synopsis: "Le quotidien et les déboires d'un modeste charretier dans les rues de Dakar, reflet des inégalités sociales naissantes." }
];

export const WASSA_SERIES: ContentItem[] = [
  { id: "mdhm", title: "Maîtresse d'un homme marié", imageUrl: "/maitresse-dun-homme-marie.jpg", type: "serie", classification: "16+", year: 2019, genres: ["Série", "Drame"], seasons: 3, progress: "S2 E4", synopsis: "Les destins croisés de femmes sénégalaises fortes, confrontées aux réalités du mariage, de la polygamie et de la société.", episodes: MOCK_EPISODES },
  { id: "sakho", title: "Sakho & Mangane", imageUrl: "/sakho-et-mangane.jpg", type: "serie", classification: "12+", year: 2019, genres: ["Série", "Policier"], seasons: 1, synopsis: "Deux flics aux méthodes diamétralement opposées doivent faire équipe pour résoudre des crimes mystiques à Dakar.", episodes: MOCK_EPISODES },
  { id: "wiriwiri", title: "Wiri Wiri", imageUrl: "/wiri-wiri.jpg", type: "serie", classification: "Tous publics", year: 2015, genres: ["Série", "Drame", "Comédie"], seasons: 3, synopsis: "Les péripéties de Jojo et Soumboulou dans une série qui a tenu en haleine tout le Sénégal.", episodes: MOCK_EPISODES },
  { id: "wara", title: "Wara", imageUrl: "/wara.jpg", type: "serie", classification: "12+", year: 2020, genres: ["Série", "Politique"], seasons: 1, synopsis: "L'engagement politique et les luttes de pouvoir d'une jeune étudiante dans une université ouest-africaine.", episodes: MOCK_EPISODES },
  { id: "cafe-avec", title: "Un café avec...", imageUrl: "/un-cafe-avec.png", type: "serie", classification: "Tous publics", year: 2012, genres: ["Série", "Drame"], seasons: 3, synopsis: "Le quotidien mouvementé d'un acteur célèbre et de sa famille, précurseur des télénovelas sénégalaises.", episodes: MOCK_EPISODES },
  { id: "infideles", title: "Infidèles", imageUrl: "/infideles.png", type: "serie", classification: "16+", year: 2020, genres: ["Série", "Drame"], seasons: 3, synopsis: "Série audacieuse explorant les relations extra-conjugales et leurs conséquences dramatiques sur plusieurs couples.", episodes: MOCK_EPISODES },
  { id: "baabel", title: "Baabel", imageUrl: "/baabel.jpg", type: "serie", classification: "12+", year: 2023, genres: ["Série", "Drame"], seasons: 1, synopsis: "Les dynamiques complexes, les trahisons et les secrets au sein de la haute société sénégalaise.", episodes: MOCK_EPISODES },
  { id: "karma", title: "Karma", imageUrl: "/karma.jpg", type: "serie", classification: "12+", year: 2021, genres: ["Série", "Drame"], seasons: 3, synopsis: "Une histoire captivante d'amour et de trahison où les actions du passé finissent toujours par rattraper les personnages.", episodes: MOCK_EPISODES },
  { id: "golden", title: "Golden", imageUrl: "/golden.jpg", type: "serie", classification: "12+", year: 2019, genres: ["Série", "Drame"], seasons: 2, synopsis: "Les rivalités et les ambitions dévorantes au sein d'une puissante et riche famille sénégalaise.", episodes: MOCK_EPISODES },
  { id: "idoles", title: "Idoles", imageUrl: "/idoles.png", type: "serie", classification: "12+", year: 2016, genres: ["Série", "Journalisme"], seasons: 6, synopsis: "Les coulisses agitées d'une rédaction journalistique confrontée à de nombreuses affaires et scandales.", episodes: MOCK_EPISODES }
];

export const NOLLYWOOD_MOVIES: ContentItem[] = [
  { id: "living-in-bondage", title: "Living in Bondage", imageUrl: "/living-in-bondage.jpg", type: "film", classification: "16+", year: 1992, genres: ["Drame", "Thriller"], duration: "2h 43m", director: "Chris Obi Rapu", country: "Nigeria", poster_status: "official", synopsis: "Un homme ambitieux rejoint un culte secret et sacrifie sa femme pour la richesse, déclenchant une spirale de cauchemars et de folie." },
  { id: "lionheart", title: "Lionheart", imageUrl: "/lionheart.jpg", type: "film", classification: "Tous publics", year: 2018, genres: ["Comédie", "Drame"], duration: "1h 35m", director: "Genevieve Nnaji", country: "Nigeria", poster_status: "official", synopsis: "Pour sauver l'entreprise de transport de son père malade, Adaeze doit prouver sa valeur dans un milieu dominé par les hommes, avec l'aide de son oncle excentrique." },
  { id: "the-wedding-party", title: "The Wedding Party", imageUrl: "/the-wedding-party.jpeg", type: "film", classification: "12+", year: 2016, genres: ["Comédie", "Romance"], duration: "1h 50m", director: "Kemi Adetiba", country: "Nigeria", poster_status: "official", synopsis: "Le jour du mariage d'un couple nigérian vire au chaos lorsque les familles, les ex et les imprévus s'en mêlent." },
  { id: "king-of-boys", title: "King of Boys", imageUrl: "/king-of-boys.jpg", type: "film", classification: "16+", year: 2018, genres: ["Drame", "Crime"], duration: "2h 49m", director: "Kemi Adetiba", country: "Nigeria", poster_status: "official", synopsis: "Une puissante femme d'affaires impliquée dans la pègre voit ses ambitions politiques menacées par des ennemis impitoyables qui convoitent son trône." },
  { id: "october-1", title: "October 1", imageUrl: "/october-1.jpg", type: "film", classification: "16+", year: 2014, genres: ["Thriller"], duration: "2h 05m", director: "Kunle Afolayan", country: "Nigeria", poster_status: "official", synopsis: "En 1960, peu avant l'indépendance du Nigeria, un inspecteur de police est chargé d'élucider une série de meurtres mystérieux de jeunes femmes." },
  { id: "the-figurine", title: "The Figurine", imageUrl: "/the-figurine.jpg", type: "film", classification: "12+", year: 2009, genres: ["Thriller", "Fantastique"], duration: "2h 02m", director: "Kunle Afolayan", country: "Nigeria", poster_status: "official", synopsis: "Deux amis trouvent une sculpture mystique qui leur accorde sept ans de chance, mais ils ignorent qu'elle sera suivie de sept ans de malheur absolu." },
  { id: "osuofia-in-london", title: "Osuofia in London", imageUrl: "/osuofia-in-london.jpg", type: "film", classification: "Tous publics", year: 2003, genres: ["Comédie"], duration: "1h 45m", director: "Kingsley Ogoro", country: "Nigeria", poster_status: "official", synopsis: "Un villageois nigérian rustre hérite de la fortune de son frère décédé et se rend à Londres pour réclamer son héritage, provoquant des chocs culturels hilarants." },
  { id: "93-days", title: "93 Days", imageUrl: "/93-days.jpg", type: "film", classification: "12+", year: 2016, genres: ["Drame", "Thriller"], duration: "2h 05m", director: "Steve Gukas", country: "Nigeria", poster_status: "official", synopsis: "Inspiré de faits réels, ce film retrace le combat héroïque du personnel médical de Lagos pour contenir l'épidémie du virus Ebola en 2014." },
  { id: "gangs-of-lagos", title: "Gangs of Lagos", imageUrl: "/gangs-of-lagos.jpg", type: "film", classification: "16+", year: 2023, genres: ["Crime", "Action"], duration: "2h 04m", director: "Jade Osiberu", country: "Nigeria", poster_status: "official", synopsis: "Un groupe d'amis d'enfance grandissant dans les rues impitoyables d'Isale Eko doit faire des choix difficiles pour survivre dans ce monde violent." },
  { id: "anikulapo", title: "Aníkúlápó", imageUrl: "/anikulapo.jpeg", type: "film", classification: "16+", year: 2022, genres: ["Fantastique", "Drame"], duration: "2h 22m", director: "Kunle Afolayan", country: "Nigeria", poster_status: "official", synopsis: "Après une liaison fatale avec la femme du roi, un tisserand est ressuscité par un oiseau mystique et acquiert le pouvoir de donner la vie et la mort." }
];

export const IVOIRIAN_MOVIES: ContentItem[] = [
  { id: "bal-poussiere", title: "Bal Poussière", imageUrl: "/bal-poussiere.jpg", type: "film", classification: "12+", year: 1988, genres: ["Comédie"], duration: "1h 31m", director: "Henri Duparc", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Le riche chef de village 'Demi-dieu' décide de prendre une sixième femme, Binta, une jeune étudiante rebelle d'Abidjan, provoquant le chaos dans son foyer." },
  { id: "caramel", title: "Caramel", imageUrl: "/caramel.jpg", type: "film", classification: "12+", year: 2004, genres: ["Comédie", "Romance"], duration: "1h 28m", director: "Henri Duparc", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Un projectionniste de cinéma timide et maladroit tombe amoureux d'une belle jeune femme, mais ses tentatives de séduction se soldent par des échecs comiques." },
  { id: "au-nom-du-christ", title: "Au nom du Christ", imageUrl: "/au-nom-du-christ.jpg", type: "film", classification: "12+", year: 1993, genres: ["Comédie", "Drame"], duration: "1h 25m", director: "Roger Gnoan M'Bala", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Un porcher marginal s'autoproclame parent de Dieu et prophète après une révélation, et finit par manipuler tout son village crédule." },
  { id: "la-nuit-des-rois", title: "La Nuit des Rois", imageUrl: "/la-nuit-des-rois.jpg", type: "film", classification: "16+", year: 2020, genres: ["Drame", "Fantastique"], duration: "1h 33m", director: "Philippe Lacôte", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Dans la tristement célèbre prison de la MACA, un jeune détenu est forcé de devenir le conteur 'Roman' et de raconter une histoire pour survivre jusqu'à l'aube." },
  { id: "run", title: "Run", imageUrl: "/run.jpg", type: "film", classification: "16+", year: 2014, genres: ["Drame", "Thriller"], duration: "1h 40m", director: "Philippe Lacôte", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Run fuit après avoir tué le Premier ministre. En se cachant, il se remémore ses vies antérieures, tour à tour faiseur de pluie, fou et patriote." },
  { id: "marabout-cheri", title: "Marabout Chéri", imageUrl: "/marabout-cheri.jpg", type: "film", classification: "12+", year: 2023, genres: ["Comédie"], duration: "1h 30m", director: "Luis Marques, Kadhy Touré", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Un couple en pleine crise financière engage un marabout escroc pour résoudre leurs problèmes, entraînant des situations aussi absurdes que désastreuses." },
  { id: "le-gendarme-dabobo", title: "Le Gendarme d'Abobo", imageUrl: "/le-gendarme-dabobo.jpg", type: "film", classification: "Tous publics", year: 2019, genres: ["Comédie"], duration: "1h 40m", director: "Antonin Dedet", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Gokou, un gendarme peu scrupuleux rackettant les chauffeurs, se retrouve muté à l'ambassade de France après une énorme bourde diplomatique." },
  { id: "un-homme-a-marier-avant-40-ans", title: "Un homme à marier avant 40 ans", imageUrl: "/un-homme-a-marier-avant-40-ans.jpg", type: "film", classification: "12+", year: 2021, genres: ["Comédie", "Romance"], duration: "1h 42m", director: "Alex Ogou", country: "Côte d'Ivoire", poster_status: "official", synopsis: "À l'approche de la quarantaine, un homme subit la pression familiale pour se marier et se lance dans une quête amoureuse pleine de péripéties." },
  { id: "invisibles", title: "Invisibles", imageUrl: "/invisibles.jpg", type: "serie", classification: "16+", year: 2018, genres: ["Série", "Drame", "Thriller"], seasons: 1, director: "Alex Ogou", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Le parcours tragique d'un jeune adolescent de bonne famille qui fugue et se retrouve plongé dans le monde ultraviolent des gangs de rue d'Abidjan appelés 'Microbes'." },
  { id: "cash-cache", title: "Cash-cache", imageUrl: "/cash-cache.jpeg", type: "serie", classification: "12+", year: 2022, genres: ["Série", "Comédie", "Crime"], seasons: 1, director: "Boris Oue", country: "Côte d'Ivoire", poster_status: "official", synopsis: "Les péripéties comiques d'un groupe d'arnaqueurs amateurs qui tentent de monter le plus grand coup de leur vie dans les rues d'Abidjan." }
];

export const MALIAN_MOVIES: ContentItem[] = [
  { id: "den-muso", title: "Den Muso", imageUrl: "/den-muso.jpg", type: "film", classification: "12+", year: 1975, genres: ["Drame"], duration: "1h 25m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Une jeune fille muette se retrouve enceinte et est rejetée par sa famille et la société, mettant en lumière la dureté du patriarcat malien de l'époque." },
  { id: "baara", title: "Baara", imageUrl: "/baara.jpeg", type: "film", classification: "Tous publics", year: 1978, genres: ["Drame"], duration: "1h 30m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Les luttes syndicales et la corruption émergente à travers l'amitié entre un jeune ingénieur idéaliste et un portefaix, dans le Mali urbain." },
  { id: "finye", title: "Finyè", imageUrl: "/finye.jpeg", type: "film", classification: "12+", year: 1982, genres: ["Drame"], duration: "1h 45m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Le mouvement de contestation étudiante face au régime militaire malien dans les années 80, vécu par deux jeunes amoureux de milieux opposés." },
  { id: "yeelen", title: "Yeelen", imageUrl: "/yeelen.jpg", type: "film", classification: "12+", year: 1987, genres: ["Drame", "Fantastique"], duration: "1h 45m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Un jeune guerrier doté de pouvoirs mystiques entreprend une quête initiatique pour affronter son père, un sorcier tyrannique qui cherche à le détruire." },
  { id: "waati", title: "Waati", imageUrl: "/waati.jpg", type: "film", classification: "12+", year: 1995, genres: ["Drame"], duration: "2h 20m", director: "Souleymane Cissé", country: "Mali", poster_status: "placeholder", synopsis: "Une jeune femme sud-africaine fuit l'apartheid pour le Mali. Ce voyage géographique et spirituel lui révèle la force intemporelle du continent." },
  { id: "min-ye", title: "Min Yé", imageUrl: "/min-ye.jpg", type: "film", classification: "12+", year: 2009, genres: ["Drame"], duration: "2h 15m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "L'usure d'un mariage bourgeois à Bamako : les tensions, l'infidélité et la quête de sens d'un couple tiraillé entre tradition et modernité." },
  { id: "o-ka", title: "O Ka", imageUrl: "/o-ka.jpg", type: "film", classification: "Tous publics", year: 2015, genres: ["Documentaire", "Drame"], duration: "1h 36m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Le combat judiciaire d'une famille spoliée de sa maison ancestrale, se mêlant à l'histoire tourmentée du Mali moderne." },
  { id: "bamako", title: "Bamako", imageUrl: "/bamako.jpeg", type: "film", classification: "Tous publics", year: 2006, genres: ["Drame"], duration: "1h 55m", director: "Abderrahmane Sissako", country: "Mali", poster_status: "official", synopsis: "Dans la cour d'une concession, la société civile africaine intente un procès virtuel à la Banque Mondiale et au FMI pour leur rôle en Afrique." },
  { id: "la-vie-sur-terre", title: "La Vie sur terre", imageUrl: "/la-vie-sur-terre.jpg", type: "film", classification: "Tous publics", year: 1999, genres: ["Drame", "Comédie"], duration: "1h 01m", director: "Abderrahmane Sissako", country: "Mali", poster_status: "official", synopsis: "Le cinéaste retourne dans son village natal de Sokolo le dernier jour du millénaire, observant le décalage fascinant avec l'Occident hyperconnecté." },
  { id: "timbuktu", title: "Timbuktu", imageUrl: "/timbuktu.jpg", type: "film", classification: "12+", year: 2014, genres: ["Drame"], duration: "1h 37m", director: "Abderrahmane Sissako", country: "Mali", poster_status: "official", synopsis: "Le paisible berger Kidane voit sa vie détruite après un accident tragique, alors que la ville voisine tombe aux mains des extrémistes religieux." }
];

export const NORTH_AFRICAN_MOVIES: ContentItem[] = [
  { id: "ali-zaoua", title: "Ali Zaoua, Prince de la rue", imageUrl: "/ali-zaoua.jpg", type: "film", classification: "12+", year: 2000, genres: ["Drame"], duration: "1h 39m", director: "Nabil Ayouch", country: "Maroc", poster_status: "official", synopsis: "Après la mort tragique de leur ami Ali, trois enfants des rues de Casablanca tentent de réaliser son rêve : lui offrir des funérailles dignes d'un prince." },
  { id: "adam", title: "Adam", imageUrl: "/adam.png", type: "film", classification: "12+", year: 2019, genres: ["Drame"], duration: "1h 40m", director: "Maryam Touzani", country: "Maroc", poster_status: "official", synopsis: "Abla, veuve et mère d'une fillette, accepte d'héberger Samia, une jeune femme enceinte et célibataire fuyant la honte dans la médina de Casablanca." },
  { id: "casanegra", title: "Casanegra", imageUrl: "/casanegra.jpg", type: "film", classification: "16+", year: 2008, genres: ["Crime", "Drame"], duration: "2h 11m", director: "Nour-Eddine Lakhmari", country: "Maroc", poster_status: "placeholder", synopsis: "Adil et Karim, deux amis d'enfance de Casablanca, cherchent désespérément à s'en sortir et se retrouvent mêlés aux combines d'un mafieux." },
  { id: "un-fils", title: "Un Fils", imageUrl: "/un-fils.jpeg", type: "film", classification: "12+", year: 2019, genres: ["Drame"], duration: "1h 36m", director: "Mehdi Barsaoui", country: "Tunisie", poster_status: "official", synopsis: "En 2011, lors de troubles en Tunisie, le jeune fils de Farès et Meriem est grièvement blessé. La recherche d'un donneur révèle un lourd secret." },
  { id: "a-peine-jouvre-les-yeux", title: "À peine j'ouvre les yeux", imageUrl: "/a-peine-jouvre-les-yeux.jpg", type: "film", classification: "12+", year: 2015, genres: ["Drame", "Musical"], duration: "1h 42m", director: "Leyla Bouzid", country: "Tunisie", poster_status: "official", synopsis: "Tunis, 2010. Farah, chanteuse d'un groupe de rock engagé, refuse la prudence imposée par sa mère sous le régime autoritaire de Ben Ali." },
  { id: "papicha", title: "Papicha", imageUrl: "/papicha.jpg", type: "film", classification: "16+", year: 2019, genres: ["Drame"], duration: "1h 48m", director: "Mounia Meddour", country: "Algérie", poster_status: "official", synopsis: "Alger, années 90. Face au terrorisme grandissant, Nedjma refuse l'oppression et décide d'organiser un défilé de mode clandestin dans son université." },
  { id: "much-loved", title: "Much Loved", imageUrl: "/much-loved.jpg", type: "film", classification: "18+", year: 2015, genres: ["Drame"], duration: "1h 44m", director: "Nabil Ayouch", country: "Maroc", poster_status: "official", synopsis: "Le quotidien de quatre prostituées à Marrakech, entre la violence de la nuit, les clients aisés et une profonde solidarité féminine." },
  { id: "le-miracle-du-saint-inconnu", title: "Le Miracle du saint inconnu", imageUrl: "/le-miracle-du-saint-inconnu.jpg", type: "film", classification: "Tous publics", year: 2019, genres: ["Comédie", "Drame"], duration: "1h 40m", director: "Alaa Eddine Aljem", country: "Maroc", poster_status: "official", synopsis: "Un voleur enterre son butin au sommet d'une colline déserte. À sa sortie de prison, il découvre qu'un mausolée sacré a été bâti par-dessus son magot." },
  { id: "zero", title: "Zéro", imageUrl: "/zero.jpg", type: "film", classification: "16+", year: 2012, genres: ["Crime", "Drame"], duration: "1h 56m", director: "Nour-Eddine Lakhmari", country: "Maroc", poster_status: "official", synopsis: "Amine, un inspecteur de police désabusé et moqué surnommé 'Zéro', décide de racheter sa dignité en recherchant une jeune fille disparue." },
  { id: "razzia", title: "Razzia", imageUrl: "/razzia.jpg", type: "film", classification: "12+", year: 2017, genres: ["Drame"], duration: "1h 59m", director: "Nabil Ayouch", country: "Maroc", isPlaceholder: true, synopsis: "Entre Casablanca en 2015 et l'Atlas en 1982, les trajectoires de cinq personnages s'entrecroisent, unis par leur soif de liberté dans une société conservatrice." }
];

export const PANAFRICAN_MOVIES: ContentItem[] = [
  { id: "felicite-pana", title: "Félicité", imageUrl: "/felicite.jpg", type: "film", classification: "12+", year: 2017, genres: ["Drame", "Musical"], duration: "2h 09m", director: "Alain Gomis", country: "Sénégal / RDC", isPlaceholder: true, synopsis: "Félicité chante dans un bar de Kinshasa. Sa vie bascule quand son fils est victime d'un accident, la lançant dans une course désespérée pour le sauver." },
  { id: "rafiki", title: "Rafiki", imageUrl: "/rafiki.jpg", type: "film", classification: "16+", year: 2018, genres: ["Romance", "Drame"], duration: "1h 23m", director: "Wanuri Kahiu", country: "Kenya", isPlaceholder: true, synopsis: "Deux jeunes Kényanes, filles de politiciens rivaux, tombent amoureuses. Elles doivent choisir entre leur amour et leur sécurité dans une société homophobe." },
  { id: "vaya", title: "Vaya", imageUrl: "/vaya.jpg", type: "film", classification: "16+", year: 2016, genres: ["Drame", "Thriller"], duration: "1h 55m", director: "Akin Omotoso", country: "Afrique du Sud", isPlaceholder: true, synopsis: "Les destins croisés de trois étrangers arrivant à Johannesburg par le même train, chacun confronté à la dureté et à l'exploitation de la métropole." },
  { id: "lingui", title: "Lingui, les liens sacrés", imageUrl: "/lingui.jpg", type: "film", classification: "12+", year: 2021, genres: ["Drame"], duration: "1h 27m", director: "Mahamat-Saleh Haroun", country: "Tchad", isPlaceholder: true, synopsis: "Une mère célibataire dévouée voit sa vie bouleversée lorsque sa fille de 15 ans tombe enceinte et cherche à avorter illégalement au Tchad." },
  { id: "grigris", title: "Grigris", imageUrl: "/grigris.jpg", type: "film", classification: "12+", year: 2013, genres: ["Drame"], duration: "1h 41m", director: "Mahamat-Saleh Haroun", country: "Tchad", isPlaceholder: true, synopsis: "Un jeune danseur avec une jambe paralysée se retrouve mêlé à un trafic d'essence dangereux pour payer les frais médicaux de son beau-père malade." },
  { id: "the-gravediggers-wife", title: "The Gravedigger's Wife", imageUrl: "/the-gravediggers-wife.jpg", type: "film", classification: "Tous publics", year: 2021, genres: ["Drame", "Romance"], duration: "1h 22m", director: "Khadar Ayderus Ahmed", country: "Somalie", isPlaceholder: true, synopsis: "Guled, fossoyeur à Djibouti, doit rassembler une somme d'argent impossible pour payer l'opération vitale de sa femme gravement malade." },
  { id: "un-homme-qui-crie", title: "Un homme qui crie", imageUrl: "/un-homme-qui-crie.jpeg", type: "film", classification: "12+", year: 2010, genres: ["Drame"], duration: "1h 32m", director: "Mahamat-Saleh Haroun", country: "Tchad", isPlaceholder: true, synopsis: "Face à la guerre civile imminente et à la jalousie envers son propre fils qui prend son poste, un ancien champion de natation commet un acte irréparable." },
  { id: "rebelle", title: "Rebelle (War Witch)", imageUrl: "/rebelle.jpg", type: "film", classification: "16+", year: 2012, genres: ["Drame", "Guerre"], duration: "1h 30m", director: "Kim Nguyen", country: "RDC", isPlaceholder: true, synopsis: "Kidnappée par des rebelles à l'âge de douze ans, Komona devient enfant soldat et 'sorcière' dans la jungle africaine, tentant de fuir cette horreur." },
  { id: "sew-the-winter-to-my-skin", title: "Sew the Winter to My Skin", imageUrl: "/sew-the-winter-to-my-skin.jpg", type: "film", classification: "16+", year: 2018, genres: ["Action", "Drame"], duration: "1h 58m", director: "Jahmil X.T. Qubeka", country: "Afrique du Sud", isPlaceholder: true, synopsis: "L'épopée quasi silencieuse d'un rebelle insaisissable de l'époque de l'apartheid qui volait les riches agriculteurs blancs pour redistribuer aux marginalisés." },
  { id: "neptune-frost", title: "Neptune Frost", imageUrl: "/neptune-frost.jpg", type: "film", classification: "12+", year: 2021, genres: ["Science-fiction", "Musical"], duration: "1h 45m", director: "Saul Williams, Anisia Uzeyman", country: "Rwanda / Burundi", isPlaceholder: true, synopsis: "Une expérience afrofuturiste et poétique où un mineur de coltan en fuite et une femme intersexuée forment un collectif de hackers anticolonial." }
];

export const DOCUMENTARIES: ContentItem[] = [
  { id: "dahomey", title: "Dahomey", imageUrl: "/dahomey.jpg", type: "film", classification: "Tous publics", year: 2024, genres: ["Documentaire"], duration: "1h 08m", synopsis: "En novembre 2021, 26 trésors royaux du Dahomey s'apprêtent à quitter Paris pour être rapatriés au Bénin." },
  { id: "mille-soleils", title: "Mille Soleils", imageUrl: "/Mille soleils.jpg", type: "film", classification: "Tous publics", year: 2013, genres: ["Documentaire"], duration: "45m", synopsis: "Un hommage au film Touki Bouki, explorant ce qu'est devenu l'acteur principal 40 ans plus tard à Dakar.", poster_status: "official" },
  { id: "kemtiyu", title: "Kemtiyu, Cheikh Anta", imageUrl: "/Kemtiyu - Cheikh Anta.png", type: "film", classification: "Tous publics", year: 2016, genres: ["Documentaire", "Biographie"], duration: "1h 34m", synopsis: "Le portrait de Cheikh Anta Diop, savant sénégalais dont les travaux ont révolutionné l'histoire de l'Afrique.", poster_status: "official" },
  { id: "o-ka", title: "O Ka", imageUrl: "/o-ka.jpg", type: "film", classification: "Tous publics", year: 2015, genres: ["Documentaire", "Drame"], duration: "1h 36m", director: "Souleymane Cissé", country: "Mali", poster_status: "official", synopsis: "Le combat judiciaire d'une famille spoliée de sa maison ancestrale, se mêlant à l'histoire tourmentée du Mali moderne." },
  { id: "makala", title: "Makala", imageUrl: "/Makala.jpg", type: "film", classification: "Tous publics", year: 2017, genres: ["Documentaire"], duration: "1h 36m", synopsis: "L'épuisant périple d'un jeune Congolais qui fabrique et vend du charbon de bois pour offrir un avenir meilleur à sa famille.", poster_status: "official" }
];

export function getRelatedMovies(movieId: string, limit: number = 10): ContentItem[] {
  const allCategories = [
    EXCLUSIVES_MOVIES, TRENDING_MOVIES, CLASSIC_MOVIES, 
    WASSA_SERIES, NOLLYWOOD_MOVIES, IVOIRIAN_MOVIES, 
    MALIAN_MOVIES, NORTH_AFRICAN_MOVIES, PANAFRICAN_MOVIES, 
    DOCUMENTARIES
  ];

  // 1. Find the specific category array that contains this movie
  let sourceCategory: ContentItem[] | null = null;
  for (const category of allCategories) {
    if (category.some(m => m.id === movieId)) {
      sourceCategory = category;
      break;
    }
  }

  // 2. Filter out the current movie
  let related: ContentItem[] = [];
  if (sourceCategory) {
    related = sourceCategory.filter(m => m.id !== movieId);
  }

  // 3. If we don't have enough movies in the same category, pad with TRENDING_MOVIES
  if (related.length < limit) {
    const additional = TRENDING_MOVIES.filter(
      m => m.id !== movieId && !related.some(r => r.id === m.id)
    );
    related = [...related, ...additional];
  }

  return related.slice(0, limit);
}

export const FLAGSHIP_VOD: ContentItem = {
  id: "saloum",
  title: "Saloum",
  imageUrl: "/saloum.jpg",
  type: "film",
  classification: "16+",
  year: 2021,
  genres: ["Thriller", "Action", "Supernaturel"],
  duration: "1h 24m",
  synopsis: "Fuyant un coup d'état en Guinée-Bissau, les Hyènes de Bangui, un trio de mercenaires d'élite, doivent faire face à des forces mystiques dans la région du Sine-Saloum au Sénégal.",
  director: "Jean Luc Herbulot",
  country: "Sénégal"
};

export const TOP_LIVE_STREAM: ContentItem = {
  id: "live-rts1",
  title: "Journal Télévisé de 20h - RTS 1 Direct",
  imageUrl: "/RTS1.png",
  type: "live",
  isLive: true,
  viewerCount: "14.2k",
  channelName: "RTS 1 Sénégal",
  classification: "Tous publics",
  year: 2026,
  genres: ["Information", "En Direct"],
  synopsis: "Suivez l'édition spéciale du journal de 20 heures en direct de Dakar, avec toute l'actualité nationale et internationale décryptée.",
  country: "Sénégal"
};

export const HERO_MIXED_CARDS: ContentItem[] = [
  {
    id: "live-tfm",
    title: "TFM Direct : Quartier Général Spécial",
    imageUrl: "/TFM.png",
    type: "live",
    isLive: true,
    viewerCount: "9.8k",
    channelName: "TFM Sénégal",
    classification: "Tous publics",
    year: 2026,
    genres: ["Société", "Talk Show"],
    synopsis: "Débat et décryptage en direct des grands enjeux culturels et économiques au Sénégal."
  },
  {
    id: "banel-adama",
    title: "Banel & Adama",
    imageUrl: "/banel-et-adama.jpg",
    type: "film",
    classification: "12+",
    year: 2023,
    genres: ["Drame", "Romance"],
    duration: "1h 27m",
    synopsis: "Banel et Adama s'aiment d'un amour absolu dans un village reculé du Nord du Sénégal."
  },
  {
    id: "live-2stv",
    title: "2sTV Live : Grand Combat de Lutte",
    imageUrl: "/2STV.png",
    type: "live",
    isLive: true,
    viewerCount: "18.5k",
    channelName: "2sTV Direct",
    classification: "Tous publics",
    year: 2026,
    genres: ["Sport", "Événement"],
    synopsis: "Retransmission en direct de la grande journée de lutte avec frappe à l'Arène Nationale de Dakar."
  },
  {
    id: "xale",
    title: "Xalé, les blessures de l'enfance",
    imageUrl: "/xale.png",
    type: "film",
    classification: "16+",
    year: 2022,
    genres: ["Drame"],
    duration: "1h 41m",
    synopsis: "Awa, une écolière de 15 ans, voit sa vie basculer suite au décès de sa grand-mère."
  }
];

