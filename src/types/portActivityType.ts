export interface PortActivityRow {
  id: string;
  day: string;
  activityType: string;
  fromDateTime: Date;
  toDateTime: Date;
  durationHours: number;
  percent: number;
  remarks: string;
  deductionHours: number;
  isHighlighted: boolean;
}
