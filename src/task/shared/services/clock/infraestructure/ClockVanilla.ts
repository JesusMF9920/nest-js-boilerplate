import { ClockService } from '../domain/ClockService';

export class ClockServiceVanilla implements ClockService {
  now(): Date {
    return new Date();
  }

  isPreviousThanToday(date: Date): boolean {
    return date < this.now();
  }
}
