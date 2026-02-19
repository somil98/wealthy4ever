export interface ChartDataPoint {
  year: number;
  invested?: number;
  value?: number;
  balance?: number;
  withdrawal?: number;
  principal?: number;
  interest?: number;
  name?: string; // For Pie charts
}

export type CalculatorTab = 
  | 'risk-profile' 
  | 'asset-allocation'
  | 'sip' 
  | 'lumpsum' 
  | 'retirement-accum' 
  | 'swp' 
  | 'retirement-dist' 
  | 'emi' 
  | 'home-afford' 
  | 'insurance' 
  | 'tax';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface MarketInsight {
  symbol: string;
  summary: string;
  sentiment: string;
  sources: {
    title: string;
    uri: string;
  }[];
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}