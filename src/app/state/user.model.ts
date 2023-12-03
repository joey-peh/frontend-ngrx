export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
}

export interface Address {
    properties: { place_id: number, formatted: string }
}
