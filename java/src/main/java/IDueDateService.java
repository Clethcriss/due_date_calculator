import java.util.Date;

public interface IDueDateService {

    IDueDateService DueDateService();

    Date dueDateCalculator(Date submitDate, int turnaroundTime);
}
