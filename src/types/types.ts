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
    coinId: number;
    quantity: number;
    initialInvestment: number;
    tracker: ITracker;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

export interface ITransaction {
    _id: string;
    coinId: number;
    quantity: number;
    priceAtTransaction: number;
    type: 'Buy' | 'Sell' | 'Adjustment';
    tracker: string;
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}

type Quote = {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    last_updated: Date;
}

type USDQuote = {
    USD: Quote;
}

export interface IQuoteData {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: number;
    is_fiat: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    date_added: Date;
    num_market_pairs: number;
    cmc_rank: number;
    last_updated: Date;
    tags: string[];
    platform: any;
    quote: USDQuote;
}