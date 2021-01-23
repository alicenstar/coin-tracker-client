export interface ITracker {
    _id: string;
    name: string;
    owner?: string;
    holdings: IHolding[];
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

export interface IHolding {
    _id: string;
    coinId: string;
    quantity: number;
    initialInvestment: number;
    tracker: ITracker;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

export interface ITransaction {
    _id: string;
    coinId: string;
    quantity: number;
    priceAtTransaction: number;
    type: 'Buy' | 'Sell' | 'Adjustment';
    tracker: string;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}