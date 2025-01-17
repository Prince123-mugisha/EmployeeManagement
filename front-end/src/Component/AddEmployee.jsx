import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployeeId } from '../Services/EmployeeServices'; // Correct import
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../Services/EmployeeServices';
function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { id } = useParams();
    const navigate = useNavigate();

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        const employee = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        console.log(employee);
        if(id){
            setLoading(true);

            setTimeout(() => {
                updateEmployee(id, employee)
                    .then((response) => {
                        console.log(response);
                        setLoading(false);
                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            }, 2000);
        }else
        {
            setLoading(true);

            setTimeout(() => {
                createEmployee(employee)
                    .then((response) => {
                        console.log(response);
                        setLoading(false);
                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            }, 2000);
        }

        
    }

    function cancelAddEmployee() {
        navigate('/');
    }

    useEffect(() => {
        if (id) {
            getEmployeeId(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    function pageTitle() {
        return id ? (
            <h1 className='text-blue-400 text-3xl font-bold mb-9 flex justify-center items-center'>Update Employee</h1>
        ) : (
            <h1 className='text-blue-400 text-3xl font-bold mb-9 flex justify-center items-center'>Add Employee</h1>
        );
    }

    return (
        <div className='font-sans absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl'>
            {pageTitle()}
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={saveOrUpdateEmployee}>
                <div className='mb-4'>
                    <label htmlFor="firstName" className='block text-gray-700 text-sm font-bold mb-2'>First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="lastName" className='block text-gray-700 text-sm font-bold mb-2'>Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Button with Loading Spinner */}
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-8 flex justify-center items-center'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin "></div>
                    ) : (
                        "Submit"
                    )}
                </button>

                <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center absolute bottom-20 left-60'
                    onClick={cancelAddEmployee}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;
