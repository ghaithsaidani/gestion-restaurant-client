export interface User{
    ID?: number;
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    email: string;
    password: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}