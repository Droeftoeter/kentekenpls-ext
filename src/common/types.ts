import type {
  RdwOpenDataVehicleColor,
  RdwOpenDataVehicleTaxiIndicator,
  RdwOpenDataVehicleFuelDescription,
} from "../background/api";

export interface ExtendedOpenDataVehicle {
  kenteken: string;
  merk?: string;
  handelsbenaming?: string;
  eerste_kleur?: RdwOpenDataVehicleColor;
  tweede_kleur?: RdwOpenDataVehicleColor;
  taxi_indicator?: RdwOpenDataVehicleTaxiIndicator;
  catalogusprijs?: string;
  datum_eerste_toelating?: string;
  datum_eerste_tenaamstelling_in_nederland?: string;
  datum_tenaamstelling?: string;
  massa_ledig_voertuig?: string;
  massa_rijklaar?: string;
  maximum_massa_samenstelling?: string;
  vermogen_massarijklaar?: string;
  cilinderinhoud?: string;
  aantal_cilinders?: string;
  aantal_wielen?: string;
  aantal_deuren?: string;
  aantal_zitplaatsen?: string;
  zuinigheidslabel?: string;
  europese_voertuigcategorie?: string;
  wam_verzekerd?: string;
  brandstof_omschrijving?: RdwOpenDataVehicleFuelDescription[];
  nettomaximumvermogen?: string;
}

export interface Query {
  id: string;
  title: string;
  where: string[];
}

export interface Category {
  id: string;
  title?: string;
  items: (Category | Query)[];
}

export type BrowserMessage =
  | { action: "fetch-vehicle"; payload: { id: string; where: string[] } }
  | { action: "open" };
