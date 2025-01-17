import React, { useState, useEffect } from 'react';
import { listEmployees } from '../Services/EmployeeServices';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../Services/EmployeeServices';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

function ListEmployeeComponent() {
    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // State to hold any errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listEmployees();
                setEmployee(response.data);
            } catch (error) {
                setError('Failed to fetch employees'); // Update error state if the API request fails
                console.log(error);
            }
        };

        fetchData();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    const navigate = useNavigate();

    function addNewEmployee() {
        navigate('/add-employee');
    }

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);  // Call the delete function
            setEmployee(employees.filter(employee => employee.id !== id));  // Update the state after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
            setError('Failed to delete employee');  // Show an error message if deletion fails
        }
    };

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    return (
        <div className='font-sans absolute top-[5%]  left-24 w-[80%] max-w-4xl]'>
            {loading ? (
                <div className="flex justify-center items-center mt-52">
                    <FaSpinner className="animate-spin text-blue-500" size={40} />
                    <span className="ml-3 text-xl">Loading...</span>
                </div>
            ) : (
                <div>
                    <h1 className='text-blue-400 text-3xl font-bold mb-5 flex justify-center items-center'>List of Employees</h1>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8' onClick={addNewEmployee}>Add Employee</button>
                    {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message if there's any */}
                    <table className='table-auto w-full border-collapse'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='px-4 py-2 text-left font-semibold text-gray-700'>First Name</th>
                                <th className='px-4 py-2 text-left font-semibold text-gray-700'>Last Name</th>
                                <th className='px-4 py-2 text-left font-semibold text-gray-700'>Email</th>
                                <th className='px-4 py-2 text-left font-semibold text-gray-700'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => {
                                return (
                                    <tr key={employee.id} className='border-t'>
                                        <td className='border px-4 py-2'>{employee.firstName}</td>
                                        <td className='border px-4 py-2'>{employee.lastName}</td>
                                        <td className='border px-4 py-2'>{employee.email}</td>
                                        <td className='border px-4 py-2 flex space-between'>
                                            <button
                                                className='bg-red-600 text-white p-2 rounded'
                                                onClick={() => handleDelete(employee.id)} // Call delete function on click
                                            >
                                                <FaTrash size={20} /> {/* Trash icon */}
                                            </button>
                                            
                                            <button className='bg-green-500 text-white p-2 rounded ml-2' onClick={ () => updateEmployee(employee.id)}>
                                                <FaEdit size={20} /> {/* Edit icon */}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListEmployeeComponent;
