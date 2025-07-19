export interface LayTime {
  id: string;
  portName: string;
  countryCode: string;
  cargo: string;
  f: string;
  blCode: string;
  quantity: number;
  ldRate: number; // L/D rate
  term: string;
  demRate: number;
  desRateD: number; // des rate/d
  allowed: number;
  used: string;
  deduction: string;
  balance: string;
  laycanFrom: Date;
  laycanTo: Date;
}
