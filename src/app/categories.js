import { DateTime } from 'luxon';

const HighRiskOfTheft = [
    "handelsbenaming = 'MITSUBISHI OUTLANDER' AND cilinderinhoud = 2360 AND datum_eerste_toelating >= 20140101", // Mitsubishi Outlander PHEV
    "handelsbenaming = 'GOLF' AND cilinderinhoud = 1968 AND datum_eerste_toelating >= 20120101", // VW Golf R
    "handelsbenaming = 'S3 SPORTBACK' AND datum_eerste_toelating >= 20120101", // Audi S3 Sportback
];

const Where = {
    Personenauto: "voertuigsoort = 'Personenauto'",
    Bedrijfsauto: "voertuigsoort = 'Bedrijfsauto'",
    Motorfiets:   "voertuigsoort = 'Motorfiets'",
    Bromfiets:    "voertuigsoort = 'Bromfiets'",
    Aanhangwagen: "voertuigsoort = 'Aanhangwagen'",
    Oplegger:     "voertuigsoort = 'Oplegger'",

    // Elektrisch (BETA)
    WelElektrisch:  "cilinderinhoud IS NULL",
    NietElektrisch: "cilinderinhoud IS NOT NULL",

    // Inrichting
    Caravan:      "inrichting = 'caravan'",

    // Import
    Import:        "datum_eerste_toelating < datum_eerste_afgifte_nederland",

    // Wielen
    TweeWielen:    "aantal_wielen = 2",

    // Constr.Snelheid
    Max45:         "maximale_constructiesnelheid_brom_snorfiets = 45",
    Max25:         "maximale_constructiesnelheid_brom_snorfiets = 25",

    // Kampeerwagen
    GeenCamper:    "inrichting != 'kampeerwagen'",
    WelCamper:     "inrichting = 'kampeerwagen'",

    // Oldtimer
    GeenOldtimer: "datum_eerste_toelating >= 19780101",
    WelOldtimer:  "datum_eerste_toelating < 19780101",

    // Taxi
    GeenTaxi:     "taxi_indicator = 'Nee'",
    WelTaxi:      "taxi_indicator = 'Ja'",

    // Europese categorieen (https://www.transportpolicy.net/standard/eu-vehicle-definitions/)
    L1:        "europese_voertuigcategorie = 'L1'",
    M1:        "europese_voertuigcategorie = 'M1'",
    N1:        "europese_voertuigcategorie = 'N1'",
    N2:        "europese_voertuigcategorie = 'N2'",
    N3:        "europese_voertuigcategorie = 'N3'",

    // Export
    NietExport: "export_indicator = 'Nee'",
};

const categories = [
    // Personenauto
    {
        id:    'personenauto',
        title: 'Personenauto',
        items: [
            {
                id:    'personenauto',
                title: 'Personenauto',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                ],
            },
            {
                id:    'personenauto-nieuw',
                title: 'Recent op kenteken',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    `datum_eerste_afgifte_nederland >= ${ DateTime.local().plus({ days: -2 }).toFormat('yyyyLLdd') }`,
                ],
            },
            {
                id:    'personenauto-vermogen',
                title: 'Hoog relatief vermogen',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    "vermogen_massarijklaar > 0.12",
                ],
            },
            {
                id:    'personenauto-catwaarde',
                title: 'Hoge cataloguswaarde',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    "catalogusprijs > 80000",
                ],
            },
            {
                id:    'personenauto-diefstalgevoelig',
                title: 'Diefstalgevoelig',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    `(${ HighRiskOfTheft.map(v => `(${ v })`).join(' OR ') })`,
                ],
            },
            {
                id:    'personenauto-import',
                title: 'Geimporteerd',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    Where.Import,
                ],
            },
            {
                id:    'personenauto-oldtimer',
                title: 'Oldtimer',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.WelOldtimer,
                    Where.GeenCamper,
                ]
            },
            {
                id:    'personenauto-kampeerwagen',
                title: 'Kampeerwagen',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenTaxi,
                    Where.GeenOldtimer,
                    Where.WelCamper,
                ],
            },
            {
                id:    'personenauto-taxi',
                title: 'Taxi',
                where: [
                    Where.NietExport,
                    Where.Personenauto,
                    Where.M1,
                    Where.GeenOldtimer,
                    Where.GeenCamper,
                    Where.WelTaxi,
                ],
            },
        ],
    },
    
    // Bedrijfswagens
    {
        id:    'bedrijfswagens',
        title: 'Bedrijfswagens',
        items: [
            {
                id:    'bedrijfswagens',
                title: 'Bedrijfswagen',
                where: [
                    Where.NietExport,
                    Where.Bedrijfsauto,
                    Where.GeenOldtimer,
                    Where.GeenTaxi,  
                ],
            },
            {
                id:    'bedrijfswagens-licht',
                title: 'Licht',
                where: [
                    Where.NietExport,
                    Where.Bedrijfsauto,
                    Where.GeenOldtimer,
                    Where.GeenTaxi,  
                    Where.N1,                    
                ],
            },
            {
                id:    'bedrijfswagens-middelzwaar',
                title: 'Middelzwaar',
                where: [
                    Where.NietExport,
                    Where.Bedrijfsauto,
                    Where.GeenOldtimer,
                    Where.GeenTaxi,
                    Where.N2,
                ],
            },
            {
                id:    'bedrijfswagens-zwaar',
                title: 'Zwaar',
                where: [
                    Where.NietExport,
                    Where.Bedrijfsauto,
                    Where.GeenOldtimer,
                    Where.GeenTaxi,
                    Where.N3,
                ],
            },
        ],
    },

    // Brom- en snorfietsen
    {
        id:    'bromsnorfiets',
        title: 'Brom- en snorfietsen',
        items: [
            {
                id:    'bromsnorfiets-bromfiets',
                title: 'Bromfiets',
                where: [
                    Where.NietExport,
                    Where.Bromfiets,
                    Where.GeenOldtimer, 
                    Where.TweeWielen,
                    Where.Max45,
                ],
            },
            {
                id:    'bromsnorfiets-snorfiets',
                title: 'Snorfiets',
                where: [
                    Where.NietExport,
                    Where.Bromfiets,
                    Where.GeenOldtimer, 
                    Where.TweeWielen,
                    Where.Max25,
                ],
            },
            {
                id:    'bromsnorfiets-oldtimer',
                title: 'Oldtimer',
                where: [
                    Where.NietExport,
                    Where.Bromfiets,
                    Where.WelOldtimer, 
                    Where.TweeWielen,
                ],
            },
            {
                id:    'bromsnorfiets-speed-pedelec',
                title: 'Speed-pedelec',
                where: [
                    Where.NietExport,
                    Where.Bromfiets,
                    Where.L1,
                    Where.GeenOldtimer, 
                    Where.TweeWielen,
                    Where.WelElektrisch,
                    "massa_ledig_voertuig < 30",
                ],
            },
        ],
    },
    
    // Motor
    {
        id:    'motor',
        title: 'Motor',
        items: [
            {
                id:    'motor',
                title: 'Motor',
                where: [
                    Where.NietExport,
                    Where.Motorfiets,
                    Where.TweeWielen,
                    Where.TweeWielen,
                ],
            },
            {
                id:    'motor-import',
                title: 'Geimporteerd',
                where: [
                    Where.NietExport,
                    Where.Motorfiets,
                    Where.TweeWielen,
                    Where.Import,
                ],
            },
            {
                id:    'motor-oldtimer',
                title: 'Oldtimer',
                where: [
                    Where.NietExport,
                    Where.Motorfiets,
                    Where.WelOldtimer,
                ],
            },
        ],
    },

    // Aanhangwagen
    {
        id:    'aanhangwagen',
        title: 'Aanhangwagen',
        items: [
            {
                id:    'aanhangwagen',
                title: 'Aanhangwagen',
                where: [
                    Where.NietExport,
                    Where.Aanhangwagen,
                ],
            },
            {
                id:    'aanhangwagen-caravan',
                title: 'Caravan',
                where: [
                    Where.NietExport,
                    Where.Aanhangwagen,
                    Where.Caravan,
                ],
            },
            {
                id:    'aanhangwagen-oplegger',
                title: 'Oplegger',
                where: [
                    Where.NietExport,
                    Where.Oplegger,
                ]
            },
        ],
    }
];

export default categories;