export interface IOrder {
    id: number,
    date: string, 
    totalPrice: string,
    cep: string,
    address: string,
    additionalAddress: string,
    city: string,
    neightborhood: string,
    user: any,
    status: any,
    payment: any,
    orderItemList: any
}