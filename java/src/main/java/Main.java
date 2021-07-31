import java.util.Date;

public class Main {
    public static void main(String[] args) {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = new Date("October 11, 2021 09:15:00");
        final int turnaroundTime = 2;
        final Date expectedDate = new Date("October 11, 2021 11:15:00");
        final Date resultDate = dueDateService.dueDateCalculator(submitDate, turnaroundTime);
        final boolean booleanResult = resultDate.equals(expectedDate);

        System.out.println("Result: " + booleanResult);
    }
}
