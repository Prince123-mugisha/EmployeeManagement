package EmployeeManagementDemo.EmployeeManagement.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import EmployeeManagementDemo.EmployeeManagement.Dto.EmployeeDto;
import EmployeeManagementDemo.EmployeeManagement.Service.EmployeeService;


@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
     EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
     return ResponseEntity.ok().body(savedEmployee);
    }

    //Method of getting UserById
    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeId(@PathVariable("id") Long EmployeeId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(EmployeeId);
        return ResponseEntity.ok().body(employeeDto);
    }
    //Method of getting All Employee
    @GetMapping("/get/all")
    public ResponseEntity<List<EmployeeDto>> getAllEmployee() {
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return ResponseEntity.ok().body(employees);
    }

    //Method of updating Employee
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@RequestBody EmployeeDto updateEmployee,
                                                      @PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto1 = employeeService.updateEmployee(employeeId, updateEmployee);
        return ResponseEntity.ok().body(employeeDto1);
    }

    //Method of delete employee
   @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
    employeeService.deleteEmployee(employeeId);
    return ResponseEntity.ok().body("Employee deleted successfully");
    }

}
