import { DateTime } from 'luxon';

import { Category } from '../common/types';

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
    DrieWielen:    "aantal_wielen = 3",
    VierWielen:    "aantal_wielen = 4",

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

    // Export
    NietExport: "export_indicator = 'Nee'",

    /*
     * Europese categorieen
     *
     * https://www.transportpolicy.net/standard/eu-vehicle-definitions/
     */

    /* Brom- en snorfietsen, motoren, trikes en quads */
    // 2 wielen, maximaal 45 km/h en een motorinhoud kleiner dan 50 cm3 of een maximaal continu vermogen van 4 kW voor elektrische motoren
    EuroL1e: "europese_voertuigcategorie = 'L1' AND europese_voertuigcategorie_toevoeging = 'e'",
    // 3 wielen, maximaal 45 km/h en een motorinhoud kleiner dan 50 cm3 of een maximaal continu vermogen van 4 kW voor elektrische motoren
    EuroL2e: "europese_voertuigcategorie = 'L2' AND europese_voertuigcategorie_toevoeging = 'e'",
    // 2 wielen, geen zijspan en meer vermogen dan L1e.
    EuroL3e: "europese_voertuigcategorie = 'L3' AND europese_voertuigcategorie_toevoeging = 'e'",
    // 2 wielen + zijspanen meer vermogen dan L1e
    EuroL4e: "europese_voertuigcategorie = 'L4' AND europese_voertuigcategorie_toevoeging = 'e'",
    // 3 symmetrische wielen en meer vermogen dan L2e
    EuroL5e: "europese_voertuigcategorie = 'L5' AND europese_voertuigcategorie_toevoeging = 'e'",
    // Quads die niet meer wegen dan 350 kg (excl. accupack) + eigenschappen L2e
    EuroL6e: "europese_voertuigcategorie = 'L6' AND europese_voertuigcategorie_toevoeging = 'e'",
    // Quads met een ongeladen massa van niet meer dan 400 kg (of 550 kg bij een quad voor goederenvervoer) met een maximaal vermogen van 15 kW
    EuroL7e: "europese_voertuigcategorie = 'L7' AND europese_voertuigcategorie_toevoeging = 'e'",

    /* Vierwielige voertuigen geschikt voor het vervoeren van passagiers */
    // Maximaal 8 extra zitplaatsen en een maximale technische massa van 3500 kg.
    EuroM1: "europese_voertuigcategorie = 'M1'",
    // Meer dan 8 extra zitplaatsen en een maximale technische massa van 5000 kg.
    EuroM2: "europese_voertuigcategorie = 'M2'",
    // Meer dan 8 extra zitplaatsen en een maximale technische massa van meer dan 5000 kg.
    EuroM3: "europese_voertuigcategorie = 'M3'",

    /* Vierwielige voertuigen geschikt voor het vervoeren van goederen */
    // Maximale technische massa van 3500 kg
    EuroN1: "europese_voertuigcategorie = 'N1'",
    // Maximale technische massa van 12.000 kg
    EuroN2: "europese_voertuigcategorie = 'N2'",
    // Maximale technische massa van meer dan 12.000 kg
    EuroN3: "europese_voertuigcategorie = 'N3'",

    /* Aanhangers en opleggers */
    // Aanhangwagen/Oplegger met een maximale technische massa van 750 kg
    EuroO1: "europese_voertuigcategorie = 'O1'",
    // Aanhangwagen/Oplegger met een maximale technische massa tussen 751 kg en 3500 kg
    EuroO2: "europese_voertuigcategorie = 'O2'",
    // Aanhangwagen/Oplegger met een maximale technische massa tussen 3501 kg en 10.000 kg
    EuroO3: "europese_voertuigcategorie = 'O3'",
    // Aanhangwagen/Oplegger met een maximale technische massa van meer dan 10.000 kg
    EuroO4: "europese_voertuigcategorie = 'O4'",
};

const categories: Category = {
    id: 'root',
    items: [
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
                        Where.EuroM1,
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
                        Where.EuroM1,
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
                        Where.EuroM1,
                        Where.GeenTaxi,
                        Where.GeenOldtimer,
                        Where.GeenCamper,
                        "vermogen_massarijklaar > 0.12",
                    ],
                },
                {
                    id:    'personenauto-catwaarde',
                    title: 'Cataloguswaarde',
                    items: [
                        {
                            id:    'personenauto-catwaarde-0-20k',
                            title: 'tot € 20.000',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs < 20000",
                            ],
                        },
                        {
                            id:    'personenauto-catwaarde-20k-35k',
                            title: '€ 20.000 tot € 35.000',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs >= 20000",
                                "catalogusprijs < 35000",
                            ],
                        },
                        {
                            id:    'personenauto-catwaarde-35k-50k',
                            title: '€ 35.000 tot € 50.000',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs >= 35000",
                                "catalogusprijs < 50000",
                            ],
                        },
                        {
                            id: 'personenauto-catwaarde-50k-70k',
                            title: '€ 50.000 tot € 70.000',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs >= 50000",
                                "catalogusprijs < 70000",
                            ],
                        },
                        {
                            id: 'personenauto-catwaarde-70k-100k',
                            title: '€ 70.000 tot € 100.000',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs >= 70000",
                                "catalogusprijs < 100000",
                            ],
                        },
                        {
                            id: 'personenauto-catwaarde-100k-plus',
                            title: '€ 100.000 en hoger',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                "catalogusprijs >= 100000",
                            ],
                        }
                    ],
                },
                {
                    id:    'personenauto-diefstalgevoelig',
                    title: 'Diefstalgevoelig',
                    items: [
                        {
                            id:    'personenauto-diefstalgevoelig-algemeen',
                            title: 'Algemeen',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `(${ HighRiskOfTheft.map(v => `(${ v })`).join(' OR ') })`,
                            ],
                        },
                        {
                            id:    'personenauto-diefstalgevoelig-audi-s',
                            title: 'Audi S',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `merk = 'AUDI'`,
                                `(${ ['TTS', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(v => `starts_with(\`handelsbenaming\`, '${ v }')` ).join(' OR ') })`,
                            ],
                        },
                        {
                            id:    'personenauto-diefstalgevoelig-audi-sq',
                            title: 'Audi SQ',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `merk = 'AUDI'`,
                                `(${ ['SQ2', 'SQ5', 'SQ7', 'SQ8'].map(v => `starts_with(\`handelsbenaming\`, '${ v }')` ).join(' OR ') })`,
                            ],
                        },
                        {
                            id:    'personenauto-diefstalgevoelig-audi-rs',
                            title: 'Audi RS',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `merk = 'AUDI'`,
                                `(${ ['TT RS', 'RS 3', 'RS 4', 'RS 5', 'RS 6', 'RS 7', 'RS Q3', 'RS Q8'].map(v => `starts_with(\`handelsbenaming\`, '${ v }')` ).join(' OR ') })`,
                            ],
                        },
                        {
                            id:    'personenauto-diefstalgevoelig-bmw-m',
                            title: 'BMW M',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `merk = 'BMW'`,
                                `(${ ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'X3 M', 'X5 M', 'X7 M'].map(v => `starts_with(\`handelsbenaming\`, '${ v }')` ).join(' OR ') })`,
                            ],
                        },
                        {
                            id:    'personenauto-diefstalgevoelig-mercedes-benz-amg',
                            title: 'Mercedes-Benz AMG',
                            where: [
                                Where.NietExport,
                                Where.Personenauto,
                                Where.EuroM1,
                                Where.GeenTaxi,
                                Where.GeenOldtimer,
                                Where.GeenCamper,
                                `merk = 'MERCEDES-BENZ'`,
                                `starts_with(\`handelsbenaming\`, 'AMG')`,
                            ],
                        }
                    ],
                },
                {
                    id:    'personenauto-import',
                    title: 'Geimporteerd',
                    where: [
                        Where.NietExport,
                        Where.Personenauto,
                        Where.EuroM1,
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
                        Where.EuroM1,
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
                        Where.EuroM1,
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
                        Where.EuroM1,
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
                        Where.EuroN1,
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
                        Where.EuroN2,
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
                        Where.EuroN3,
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
                    id:    'bromsnorfiets-quad',
                    title: 'Quad',
                    where: [
                        Where.NietExport,
                        Where.EuroL6e,
                        Where.GeenOldtimer,
                        "aantal_zitplaatsen = 1",
                    ],
                },
                {
                    id:    'bromsnorfiets-brommobiel',
                    title: 'Brommobiel',
                    where: [
                        Where.NietExport,
                        Where.EuroL6e,
                        Where.GeenOldtimer,
                        "aantal_zitplaatsen > 1",
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
                        Where.EuroL1e,
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
                    ],
                },
                {
                    id:    'motor-zijspan',
                    title: 'Motor met zijspan',
                    where: [
                        Where.NietExport,
                        Where.EuroL4e,
                    ]
                },
                {
                    id:    'motor-trike',
                    title: 'Trike',
                    where: [
                        Where.NietExport,
                        Where.EuroL5e,
                    ],
                },
                {
                    id:    'motor-quad',
                    title: 'Quad',
                    where: [
                        Where.NietExport,
                        Where.EuroL7e,
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
    ],
};

export default categories;
