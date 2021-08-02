export interface IDueDateService {
    calculateDueDate: (submitDate: Date, turnAroundTime: number) => Date;
    postSubmitCalculateDueDate: (submitDate: Date, turnAroundTime: number) => Date;
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
        if (turnaroundTime === null) throw new Error('Turnaround time value is null!');
        if (turnaroundTime === undefined) throw new Error('Turnaround time value is undefined!');
        if (turnaroundTime <= 0) throw new Error('Turnaround time value is lower or equal to zero!');

        if (submitDate === null) throw new Error('Submit date value is null!');
        if (submitDate === undefined) throw new Error('Submit date value is undefined!');
        if (submitDate.getHours() < 9) throw new Error('Submit date is earlier than 9AM!');
        if (submitDate.getHours() > 17) throw new Error('Submit date is later than 5PM!');

        turnaroundTime = Math.ceil(turnaroundTime);

        const oneHourInMilliseconds: number = 3600000;
        const remainingHoursTillEOD: number = 17 - submitDate.getHours();
        const actualDay: number = submitDate.getDay();
        const weekEndPeriod: number = 2 * 24 * oneHourInMilliseconds;
        const oneDayInHours: number = 24;

        let temporaryDateInMilliseconds: number = submitDate.getTime();

        let numberOfDaysTillDueDate: number = Math.floor(turnaroundTime / 8);
        const remainingHoursOfTurnaroundTime: number = turnaroundTime % 8;


        if (actualDay + numberOfDaysTillDueDate > 5) {
            const daysTillWeekend = 6 - actualDay;
            temporaryDateInMilliseconds += weekEndPeriod + (daysTillWeekend * oneDayInHours * oneHourInMilliseconds);
            numberOfDaysTillDueDate -= daysTillWeekend;
        }

        temporaryDateInMilliseconds = this.addWeekEndPeriod(numberOfDaysTillDueDate, temporaryDateInMilliseconds, weekEndPeriod);

        temporaryDateInMilliseconds += numberOfDaysTillDueDate * oneDayInHours * oneHourInMilliseconds;

        if (remainingHoursOfTurnaroundTime < remainingHoursTillEOD) {
            temporaryDateInMilliseconds += oneHourInMilliseconds * remainingHoursOfTurnaroundTime;
        } else {
            temporaryDateInMilliseconds += (16 + remainingHoursOfTurnaroundTime) * oneHourInMilliseconds;
        }

        temporaryDateInMilliseconds = this.handleSummerOrWinterTimeChange(submitDate, temporaryDateInMilliseconds);

        return new Date(temporaryDateInMilliseconds);
    }

    public postSubmitCalculateDueDate(submitDate: Date, turnaroundTime: number): Date{
        this.inputTimeCheck(turnaroundTime);
        this.inputDateCheck(submitDate);

        turnaroundTime = Math.ceil(turnaroundTime);
        let actualDay: number = submitDate.getDay();

        const oneHourInMilliseconds: number = 3600000;
        const weekEndPeriod: number = 2 * 24 * oneHourInMilliseconds;

        let temporaryDateInMilliseconds: number = submitDate.getTime();

        for (let iterator = 0; iterator < turnaroundTime; iterator++) {
            temporaryDateInMilliseconds += oneHourInMilliseconds;
            if (new Date(temporaryDateInMilliseconds).getHours() >= 17) {
                temporaryDateInMilliseconds += 16 * oneHourInMilliseconds;
                actualDay++;
            }


            if (actualDay > 5) {
                actualDay = 1;
                temporaryDateInMilliseconds += weekEndPeriod;
            }
        }

        temporaryDateInMilliseconds = this.handleSummerOrWinterTimeChange(submitDate, temporaryDateInMilliseconds);

        return new Date(temporaryDateInMilliseconds);
    }

    /**
     * Adjusts the given temporaryDateInMilliseconds if it passed winter or summer time change date
     * since the submit date.
     * @param submitDate
     * @param actualDateInMilliseconds
     * @returns {Date} - temporaryDateInMilliseconds
     * @private
     */
    private handleSummerOrWinterTimeChange(submitDate: Date, actualDateInMilliseconds: number): number {
        const oneHourInMilliseconds: number = 3600000;
        const yearOfSubmit: number = submitDate.getFullYear();
        const summerToWinterTimeChangeDate: number = new Date(`October 31, ${yearOfSubmit} `).getTime();
        const winterToSummerTimeChangeDate: number = new Date(`March 28, ${yearOfSubmit} `).getTime();

        if (submitDate.getTime() < winterToSummerTimeChangeDate && summerToWinterTimeChangeDate < actualDateInMilliseconds) {
            return actualDateInMilliseconds;
        } else if (submitDate.getTime() < summerToWinterTimeChangeDate && summerToWinterTimeChangeDate < actualDateInMilliseconds) {
            actualDateInMilliseconds += oneHourInMilliseconds;
        } else if (submitDate.getTime() < winterToSummerTimeChangeDate && winterToSummerTimeChangeDate > actualDateInMilliseconds) {
            actualDateInMilliseconds -= oneHourInMilliseconds;
        }
        return actualDateInMilliseconds;
    }

    /**
     * Adds weekend period to temporaryDate if needed.
     * @param numberOfDaysTillDueDate
     * @param temporaryDateInMilliseconds
     * @param weekEndPeriod
     * @returns {Date} - temporaryDateInMilliseconds
     * @private
     */
    private addWeekEndPeriod(numberOfDaysTillDueDate: number, temporaryDateInMilliseconds: number, weekEndPeriod: number): number {
        if (Math.floor(numberOfDaysTillDueDate / 5) > 0) {
            const numberOfWeeks: number = Math.floor(numberOfDaysTillDueDate / 5);
            temporaryDateInMilliseconds += weekEndPeriod * numberOfWeeks;
        }
        return temporaryDateInMilliseconds;
    }

    private inputDateCheck(inputDate: Date): void {
        if (inputDate === null) throw new Error('Submit date value is null!');
        if (inputDate === undefined) throw new Error('Submit date value is undefined!');
        if (inputDate.getHours() < 9) throw new Error('Submit date is earlier than 9AM!');
        if (inputDate.getHours() > 17) throw new Error('Submit date is later than 5PM!');
    }

    private inputTimeCheck(inputTime: number): void {
        if (inputTime === null) throw new Error('Turnaround time value is null!');
        if (inputTime === undefined) throw new Error('Turnaround time value is undefined!');
        if (inputTime <= 0) throw new Error('Turnaround time value is lower or equal to zero!');
    }
}

export default DueDateService;

