package EmployeeManagementDemo.EmployeeManagement.Mapper;

import EmployeeManagementDemo.EmployeeManagement.Dto.EmployeeDto;
import EmployeeManagementDemo.EmployeeManagement.Entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee emp) {
        return new EmployeeDto(
            emp.getId(),
            emp.getFirstName(),
            emp.getLastName(),
            emp.getEmail()
        );
    }

    public static  Employee mapToEmployee(EmployeeDto dto) {
        return new Employee(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail()
        );
    }
}
