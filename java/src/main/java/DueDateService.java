import java.util.Date;
import java.util.Calendar;

public class DueDateService implements IDueDateService {
    private static DueDateService instance = null;

    public IDueDateService DueDateService() {
        if (instance == null) {
            instance = new DueDateService();
        }
        return instance;
    }

    public Date dueDateCalculator(Date submitDate, int turnaroundTime) {
        Calendar temporaryCalendar = Calendar.getInstance();
        temporaryCalendar.setTime(submitDate);

        for (int iterator = 0; iterator < turnaroundTime; iterator++) {
            temporaryCalendar.add(Calendar.HOUR, 1);
            if (temporaryCalendar.get(Calendar.HOUR_OF_DAY) >= 17) {
                temporaryCalendar.add(Calendar.HOUR, 16);
            }

            if (temporaryCalendar.get(Calendar.DAY_OF_WEEK) > 6) {
                temporaryCalendar.add(Calendar.HOUR, 48);
            }
        }

        return handleSummerWinterTimeChange(submitDate, temporaryCalendar.getTime());
    }

    private Date handleSummerWinterTimeChange(Date submitDate, Date actualDate) {
        final Calendar submitCalendar = Calendar.getInstance();
        submitCalendar.setTime(submitDate);

        final Calendar actualCalendar = Calendar.getInstance();
        actualCalendar.setTime(actualDate);

        final int submitMonth = submitCalendar.get(Calendar.MONTH);
        final int actualMonth = actualCalendar.get(Calendar.MONTH);

        if (submitMonth < 10 &&  actualMonth > 9 && submitMonth > 2) {
            actualCalendar.add(Calendar.HOUR, 1);
        }

        return actualCalendar.getTime();
    }

    private void inputDateCheck(Date inputDate) throws Error {
        if (inputDate == null) throw new Error("Submit date value is null!");
        final Calendar checkCalendar = Calendar.getInstance();
        checkCalendar.setTime(inputDate);
        if (checkCalendar.get(Calendar.HOUR) < 9) throw new Error("Submit date is earlier than 9AM!");
        if (checkCalendar.get(Calendar.HOUR) >= 17) throw new Error("Submit date is later than 5PM!");
    }
}
