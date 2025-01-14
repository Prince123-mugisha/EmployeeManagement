package EmployeeManagementDemo.EmployeeManagement.Service;

import EmployeeManagementDemo.EmployeeManagement.Dto.EmployeeDto;
import EmployeeManagementDemo.EmployeeManagement.Entity.Employee;
import EmployeeManagementDemo.EmployeeManagement.Mapper.EmployeeMapper;
import EmployeeManagementDemo.EmployeeManagement.Repository.EmployeeRepo;
import EmployeeManagementDemo.EmployeeManagement.exception.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long EmployeeId) {
        Employee employee = employeeRepo.findById(EmployeeId).orElseThrow(
                () -> new Resource("Employee is not found with given  id : " + EmployeeId)
        );
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployeeDto) {
        Employee employee = employeeRepo.findById(employeeId).orElseThrow(
                () -> new Resource("Employee is not found with given id : " + employeeId)
        );
        employee.setFirstName(updateEmployeeDto.getFirstName());
        employee.setLastName(updateEmployeeDto.getLastName());
        employee.setEmail(updateEmployeeDto.getEmail());

        Employee savedEmployee = employeeRepo.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);

    }

    @Override
    public void deleteEmployee(Long EmployeeId) {
     Employee employee = employeeRepo.findById(EmployeeId).orElseThrow(
             () -> new Resource("Employee is not found with given id : " + EmployeeId)
     ) ;

     employeeRepo.delete(employee);
    }
}
