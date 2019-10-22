import ky from 'ky';

/**
 * Grabs a random offset for the result-set based on the amount of available items.
 *
 * @param {*} results 
 * @param {*} minResults 
 */
function getRandomOffset(results, minResults) {
    const maxOffset = results > minResults
        ? results - minResults
        : 0;

    return Math.floor(Math.random() * maxOffset);
}

export const HighRiskOfTheft = [
    "handelsbenaming = 'MITSUBISHI OUTLANDER' AND cilinderinhoud = 2360 AND datum_eerste_toelating >= 20140101", // Mitsubishi Outlander PHEV
    "handelsbenaming = 'GOLF' AND cilinderinhoud = 1968 AND datum_eerste_toelating >= 20120101", // VW Golf R
    "handelsbenaming = 'S3 SPORTBACK' AND datum_eerste_toelating >= 20120101", // Audi S3 Sportback
];

export const Where = {
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

/**
 * Fetch vehicles from RDW.
 * 
 * @param string[] where 
 */
export default async function fetchVehicles (where = []) {
    const flatWhere = [ ...where, Where.NietExport ].join(' AND ');

    const result = await ky.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?$select=count(kenteken)&$where=${ flatWhere }`, { timeout: 300000 }).json();
    const totalVehicles = Number(result[ 0 ].count_kenteken);

    const offset = getRandomOffset(totalVehicles, 40);
    return await ky.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?$where=${ flatWhere }&$limit=40&$offset=${ offset }`, { timeout: 300000 }).json();
};