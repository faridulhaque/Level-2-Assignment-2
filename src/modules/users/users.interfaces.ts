export type TOrders = {
    productName: string;
    price: number;
    quantity: number;
}

export type TFullName = {
    firstName: string,
    lastName: string
}

export type THobbies = string[];

export type TAddress ={
    city: string,
    street: string,
    country: string
}


export type TUsers = {
    userId: number,
    userName: string,
    password: string,
    fullName: TFullName,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: THobbies,
    address: TAddress,
    orders: TOrders[]
}


// this file is used to declare all the types or interfaces for users. 
