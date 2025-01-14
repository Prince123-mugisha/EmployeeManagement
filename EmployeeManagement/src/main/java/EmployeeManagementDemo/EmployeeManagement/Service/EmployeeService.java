package EmployeeManagementDemo.EmployeeManagement.Service;

import EmployeeManagementDemo.EmployeeManagement.Dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long EmployeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployeeDto);

    void  deleteEmployee(Long EmployeeId);
}
