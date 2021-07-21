import DueDateService from "../dueDateService/dueDateService";

describe('Proper input', () => {
    it('It should calculate with submitDate: Monday 9:15, turnaround time: 2 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 09:15:00");
        const inputTurnaroundTime: number = 2;

        const expectedDueDate: Date = new Date("October 11, 2021 11:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Monday 16:15, turnaround time: 2 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 16:15:00");
        const inputTurnaroundTime: number = 2;

        const expectedDueDate: Date = new Date("October 12, 2021 10:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Friday 09:15, turnaround time: 8 hours', () => {
        const inputSubmitDate: Date = new Date("October 15, 2021 09:15:00");
        const inputTurnaroundTime: number = 8;

        const expectedDueDate: Date = new Date("October 18, 2021 09:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Wednesday 16:15, turnaround time: 9 hours', () => {
        const inputSubmitDate: Date = new Date("October 13, 2021 16:15:00");
        const inputTurnaroundTime: number = 9;

        const expectedDueDate: Date = new Date("October 15, 2021 09:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Thursday 13:15, turnaround time: 16 hours', () => {
        const inputSubmitDate: Date = new Date("October 14, 2021 13:15:00");
        const inputTurnaroundTime: number = 16;

        const expectedDueDate: Date = new Date("October 18, 2021 13:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Monday 13:15, turnaround time: 49 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 13:15:00");
        const inputTurnaroundTime: number = 49;

        const expectedDueDate: Date = new Date("October 19, 2021 14:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });
});

describe('Invalid Input', () => {
    it('It should throw error with turnaround time: 0 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 13:15:00");
        const inputTurnaroundTime: number = 0;

        const dueDateService = new DueDateService();
        expect(() => {dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)}).toThrow('Turnaround time value is lower or equal to zero!');
    });

    it('It should throw error with turnaround time: {negative number} hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 13:15:00");
        const inputTurnaroundTime: number = -16;

        const dueDateService = new DueDateService();
        expect(() => {dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)}).toThrow('Turnaround time value is lower or equal to zero!');
    });

    it('It should throw error with turnaround time {null}', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 13:15:00");
        const inputTurnaroundTime = null;

        const dueDateService = new DueDateService();
        expect(() => {dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)}).toThrow('Turnaround time value is null!');
    });

    it('It should throw error with turnaround time {undefined}', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 13:15:00");
        const inputTurnaroundTime = undefined;

        const dueDateService = new DueDateService();
        expect(() => {dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)}).toThrow('Turnaround time value is undefined!');
    });

    it('It should throw error with submit date {null}', () => {
        const inputSubmitDate: Date = null;
        const inputTurnaroundTime = 16;

        const dueDateService = new DueDateService();
        expect(() => {dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)}).toThrow('Submit date value is null!');
    });
});
