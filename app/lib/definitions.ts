export interface BallProps {
    num: number;
    type: 'red' | 'blue';
    selected?: boolean;
    onClick?: () => void;
}

export type PrizeGrade = {
    type: number;
    typenum: number;
    typemoney: number;
}

export type Draw = {
    code: string;
    date: Date;
    week: string;
    red: string;
    blue: string;
    sales: number;
    poolmoney: number;
    content: string;
    prizegrades: JSON;
}