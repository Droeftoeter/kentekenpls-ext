export interface RdwOpenDataVehicle {
  kenteken: string;
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
