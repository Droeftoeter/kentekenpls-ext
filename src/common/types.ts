export interface RdwOpenDataVehicle {
    kenteken: string
}

export interface Query {
    id:    string
    title: string
    where: string[]
}

export interface Category {
    id:     string
    title?: string
    items:  (Category | Query)[]
}
