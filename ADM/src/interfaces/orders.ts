export interface IOrder {
    id: number,
    date: string, 
    formPayment: string,
    totalPrice: string,
    cep: string,
    address: string,
    additionalAddress: string,
    city: string,
    neightborhood: string,
    user: any,
    status: number,
    payment: string,
    orderItemList: any
}