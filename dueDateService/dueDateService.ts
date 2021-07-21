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
        return new Date();
    }
}

export default DueDateService;

