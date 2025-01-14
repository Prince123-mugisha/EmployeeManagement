package EmployeeManagementDemo.EmployeeManagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class Resource extends RuntimeException {
    public Resource(String message) {
        super(message);
    }
}
