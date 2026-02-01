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

export type LotteryType = 'double-color' | 'super-lotto';

export interface LotteryConfig {
    type: LotteryType;
    name: string;
    redCount: number;
    redRange: number;
    blueCount: number;
    blueRange: number;
    redName: string;
    blueName: string;
    tableName: string;
    description: string;
    keywords: string[];
}

export const lotteryConfigs: Record<LotteryType, LotteryConfig> = {
    'double-color': {
        type: 'double-color',
        name: '双色球',
        redCount: 6,
        redRange: 33,
        blueCount: 1,
        blueRange: 16,
        redName: '红球',
        blueName: '蓝球',
        tableName: 'double_color_ball',
        description: '免费在线双色球历史开奖数据查询工具。输入6个红球和1个蓝球号码，立即查询2013年至今是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。',
        keywords: ["双色球", "双色球查询", "双色球历史开奖", "双色球中奖查询", "彩票号码查询", "双色球开奖结果", "双色球奖池", "福利彩票"]
    },
    'super-lotto': {
        type: 'super-lotto',
        name: '大乐透',
        redCount: 5,
        redRange: 35,
        blueCount: 2,
        blueRange: 12,
        redName: '前区',
        blueName: '后区',
        tableName: 'super_lotto',
        description: '免费在线大乐透历史开奖数据查询工具。输入5个前区号码和2个后区号码，立即查询历史是否中过一等奖、二等奖。查看最新开奖结果、奖池金额和中奖详情。',
        keywords: ["大乐透", "大乐透查询", "大乐透历史开奖", "大乐透中奖查询", "大乐透号码查询", "大乐透开奖结果", "大乐透奖池", "体育彩票"]
    }
};