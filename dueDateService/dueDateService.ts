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

        let initialDateInMilliseconds: number = submitDate.getTime();
        let numberOfDaysTillDueDate: number = 0;
        let remainingHoursOfTurnaroundTime: number;
        if (turnaroundTime >= 8) {
            numberOfDaysTillDueDate = Math.floor(turnaroundTime / 8);
            remainingHoursOfTurnaroundTime = turnaroundTime % 8;
        } else {
            remainingHoursOfTurnaroundTime = turnaroundTime;
        }

        initialDateInMilliseconds += numberOfDaysTillDueDate * 24 * oneHourInMilliseconds;

        if (remainingHoursOfTurnaroundTime < remainingHoursTillEOD) {
            initialDateInMilliseconds += oneHourInMilliseconds * remainingHoursOfTurnaroundTime;
        } else {
            initialDateInMilliseconds += (16 + remainingHoursOfTurnaroundTime) * oneHourInMilliseconds;
        }

        return new Date(initialDateInMilliseconds);
    }
}

export default DueDateService;

