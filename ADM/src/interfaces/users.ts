export interface IUser {
    id: number,
    name: string, 
    email: string,
    cpf: string,
    birthday: string,
    password: string,
    cellPhone: string,
    landlineNumber: string,
    photo: string,
    admin: boolean,
    addressList: any;
    wishList: any;
}