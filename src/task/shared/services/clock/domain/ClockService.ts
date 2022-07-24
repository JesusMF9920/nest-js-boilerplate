export const CLOCK_SERVICE_TOKEN = 'ClockService';

export interface ClockService {
  now(): Date;
  isPreviousThanToday(date: Date): boolean;
}
