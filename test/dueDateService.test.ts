import DueDateService from "../dueDateService/dueDateService";

describe('Proper input', () => {
    it('It should calculate with submitDate: Monday 9:15, turnaround time: 2 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 09:15:00");
        const inputTurnaroundTime: number = 16;

        const expectedDueDate: Date = new Date("October 11, 2021 11:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });

    it('It should calculate with submitDate: Monday 16:15, turnaround time: 2 hours', () => {
        const inputSubmitDate: Date = new Date("October 11, 2021 09:15:00");
        const inputTurnaroundTime: number = 16;

        const expectedDueDate: Date = new Date("October 12, 2021 10:15:00");
        const dueDateService = new DueDateService();
        expect(dueDateService.calculateDueDate(inputSubmitDate, inputTurnaroundTime)).toBe(expectedDueDate);
    });
});
