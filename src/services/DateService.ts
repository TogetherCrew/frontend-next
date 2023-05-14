import dayjs from 'dayjs';

export class DateService {
  static getCurrentDate(): string {
    return dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static formatDate(date: string, format: string): string {
    return dayjs(date).format(format);
  }

  static addDays(date: string, days: number): string {
    return dayjs(date).add(days, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractDays(date: string, days: number): string {
    return dayjs(date).subtract(days, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractMonths(date: string, months: number): string {
    return dayjs(date)
      .subtract(months, 'month')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractYears(date: string, years: number): string {
    return dayjs(date).subtract(years, 'year').format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractHours(date: string, hours: number): string {
    return dayjs(date).subtract(hours, 'hour').format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractMinutes(date: string, minutes: number): string {
    return dayjs(date)
      .subtract(minutes, 'minute')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
  }

  static subtractSeconds(date: string, seconds: number): string {
    return dayjs(date)
      .subtract(seconds, 'second')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
  }
}
