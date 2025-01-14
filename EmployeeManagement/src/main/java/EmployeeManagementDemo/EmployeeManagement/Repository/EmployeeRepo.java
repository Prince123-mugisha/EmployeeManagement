package EmployeeManagementDemo.EmployeeManagement.Repository;

import EmployeeManagementDemo.EmployeeManagement.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
}
