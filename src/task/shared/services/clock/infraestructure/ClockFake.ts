import { ClockService } from '../domain/ClockService';

export const WEEK = {
  MONDAY: {
    QUARTER_TO_ONE: '2020-09-21T12:45:00.000Z',
    HALF_PAST_TWELVE: '2020-09-21T12:30:00.000Z',
    ONE_PM: '2020-09-21T13:00:00.000Z',
    TWO_PM: '2020-09-21T14:00:00.000Z',
    A_QUARTER_PAST_ONE: '2020-09-21T13:15:00.000Z',
  },
  TUESDAY: {
    ONE_PM: '2020-09-22T13:00:00.000Z',
    HALF_PAST_ONE_PM: '2020-09-22T13:30:00.000Z',
    TWO_PM: '2020-09-22T14:00:00.000Z',
    THREE_PM: '2020-09-22T15:00:00.000Z',
  },
  WEDNESDAY: { ONE_PM: '2020-09-23T13:00:00.000Z', TWO_PM: '2020-09-23T14:00:00.000Z' },
  THURSDAY: {
    ONE_PM: '2020-09-24T13:00:00.000Z',
    TWO_PM: '2020-09-24T14:00:00.000Z',
    A_QUARTER_PAST_ONE: '2020-09-24T13:15:00.000Z',
  },
  FRIDAY: {
    ONE_PM: '2020-09-25T13:00:00.000Z',
    TWO_PM: '2020-09-25T14:00:00.000Z',
    A_QUARTER_PAST_ONE: '2020-09-25T13:15:00.000Z',
  },
  SATURDAY: { ONE_PM: '2020-09-26T13:00:00.000Z', TWO_PM: '2020-09-26T14:00:00.000Z' },
  SUNDAY: { ONE_PM: '2020-09-27T13:00:00.000Z', TWO_PM: '2020-09-27T14:00:00.000Z' },
};

export class ClockServiceFake implements ClockService {
  private static FIXED_DATE_MONDAY = new Date(WEEK.MONDAY.ONE_PM);

  static createFixed() {
    return ClockServiceFake.createOnMondayAtOnePM();
  }

  static createAt(date: string) {
    return new ClockServiceFake(new Date(date));
  }

  static createOnMondayAtOnePM() {
    return new ClockServiceFake(ClockServiceFake.FIXED_DATE_MONDAY);
  }

  constructor(private date: Date) {}

  now(): Date {
    return this.date;
  }

  isPreviousThanToday(date: Date): boolean {
    return date < this.now();
  }
}
