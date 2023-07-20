import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysToYearsMonthsDays',
  standalone: true
})
export class DaysToYearsMonthsDaysPipe implements PipeTransform {

  transform(days: number): string {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let result = '';
    if (years > 0) {
      let y = years === 1 ? ' year ' : ' years ';
      result += years + y;
    }
    if (months > 0) {
      let m = months === 1 ? ' month ': ' months '
      result += months + m;
    }
    // if (remainingDays > 0) {
    //   let d = remainingDays === 1 ? ' day ' : ' days '
    //   result += remainingDays + d;
    // }
    return result.trim();
  }

}


@Pipe({
  name: 'monthsToYears',
  standalone: true
})
export class MonthToYearsPipe implements PipeTransform {
  transform(days: number): string {
    const years = Math.floor(days / 365);
    return `${years}+ years `;
  }
}
