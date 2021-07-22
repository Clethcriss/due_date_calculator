export interface IDueDateService {
    calculateDueDate: (submitDate: Date, turnAroundTime: number) => Date;
}

class DueDateService implements IDueDateService {
    constructor() {}

    /**
     * Calculates due date based on the submit date and the turnaround time
     * @param submitDate
     * @param turnaroundTime
     * @returns {Date} - due date
     */
    calculateDueDate(submitDate: Date, turnaroundTime: number): Date {
        const oneHourInMilliseconds: number = 3600000;
        const remainingHoursTillEOD: number = 17 - submitDate.getHours();
        const actualDay: number = submitDate.getDay();
        const weekEndPeriod: number = 2 * 24 * oneHourInMilliseconds;
        const oneDayInHours: number = 24;

        let initialDateInMilliseconds: number = submitDate.getTime();

        let numberOfDaysTillDueDate: number = 0;
        let remainingHoursOfTurnaroundTime: number;
        if (turnaroundTime >= 8) {
            numberOfDaysTillDueDate = Math.floor(turnaroundTime / 8);
            remainingHoursOfTurnaroundTime = turnaroundTime % 8;
        } else {
            remainingHoursOfTurnaroundTime = turnaroundTime;
        }

        if (actualDay + numberOfDaysTillDueDate > 5) {
            const daysTillWeekend = 6 - actualDay;
            initialDateInMilliseconds += weekEndPeriod + (daysTillWeekend * oneDayInHours * oneHourInMilliseconds);
            numberOfDaysTillDueDate -= daysTillWeekend;
        }

        if (Math.floor(numberOfDaysTillDueDate / 5) > 0) {
            const numberOfWeeks: number = Math.floor(numberOfDaysTillDueDate / 5);
            initialDateInMilliseconds += weekEndPeriod * numberOfWeeks;
        }

        initialDateInMilliseconds += numberOfDaysTillDueDate * oneDayInHours * oneHourInMilliseconds;

        if (remainingHoursOfTurnaroundTime < remainingHoursTillEOD) {
            initialDateInMilliseconds += oneHourInMilliseconds * remainingHoursOfTurnaroundTime;
        } else {
            initialDateInMilliseconds += (16 + remainingHoursOfTurnaroundTime) * oneHourInMilliseconds;
        }

        const yearOfSubmit: number = submitDate.getFullYear();
        const summerToWinterTimeChangeDate: number = new Date(`October 31, ${yearOfSubmit} `).getTime();
        if (submitDate.getTime() < summerToWinterTimeChangeDate && summerToWinterTimeChangeDate < initialDateInMilliseconds) {
            initialDateInMilliseconds += oneHourInMilliseconds;
        }

        return new Date(initialDateInMilliseconds);
    }
}

export default DueDateService;

