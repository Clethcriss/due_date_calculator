import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DueDateServiceTest {

    final String DEFAULT_PATTERN = "MMMMM dd, yyyy HH:mm:ss";
    final SimpleDateFormat formatter = new SimpleDateFormat(DEFAULT_PATTERN);

    @Test
    @DisplayName("It should calculate with submitDate: Monday 9:15, turnaround time: 2 hours")
    void properInputTwoHoursTurnaround() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 11, 2021 09:15:00");
        final int turnaroundTime = 2;
        final Date expectedDate = formatter.parse("October 11, 2021 11:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 16:15, turnaround time: 2 hours")
    void properInputTwoHoursTurnaroundNextDay() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 11, 2021 16:15:00");
        final int turnaroundTime = 2;
        final Date expectedDate = formatter.parse("October 12, 2021 10:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Friday 09:15, turnaround time: 8 hours")
    void properInputEightHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 15, 2021 09:15:00");
        final int turnaroundTime = 8;
        final Date expectedDate = formatter.parse("October 18, 2021 09:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Wednesday 16:15, turnaround time: 9 hours")
    void properInputNineHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 13, 2021 16:15:00");
        final int turnaroundTime = 9;
        final Date expectedDate = formatter.parse("October 15, 2021 09:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Thursday 13:15, turnaround time: 16 hours")
    void properInputSixteenHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 14, 2021 13:15:00");
        final int turnaroundTime = 16;
        final Date expectedDate = formatter.parse("October 18, 2021 13:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 49 hours")
    void properInputFortyNineHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 11, 2021 13:15:00");
        final int turnaroundTime = 49;
        final Date expectedDate = formatter.parse("October 19, 2021 14:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 89 hours")
    void properInputEightyNineHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 11, 2021 13:15:00");
        final int turnaroundTime = 89;
        final Date expectedDate = formatter.parse("October 26, 2021 14:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 129 hours")
    void properInputOneHundredTwentyNineHoursTurnaroundTime() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("August 9, 2021 13:15:00");
        final int turnaroundTime = 129;
        final Date expectedDate = formatter.parse("August 31, 2021 14:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 209 hours and Summer time to Winter time change.")
    void properInputSummerToWinter() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("October 11, 2021 13:15:00");
        final int turnaroundTime = 209;
        final Date expectedDate = formatter.parse("November 16, 2021 14:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 57 hours and Winter time to Summer time change")
    void properInputWinterToSummer() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("March 22, 2021 13:15:00");
        final int turnaroundTime = 57;
        final Date expectedDate = formatter.parse("March 31, 2021 15:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }

    @Test
    @DisplayName("It should calculate with submitDate: Monday 13:15, turnaround time: 1369 hours and from Winter time to Winter time")
    void properInputWinterToWinter() throws ParseException {
        final IDueDateService dueDateService = new DueDateService();

        final Date submitDate = formatter.parse("March 22, 2021 13:15:00");
        final int turnaroundTime = 1369;
        final Date expectedDate = formatter.parse("November 16, 2021 14:15:00");

        assertEquals(expectedDate, dueDateService.dueDateCalculator(submitDate, turnaroundTime));
    }
}