import axios from 'axios';

const BASE_URL = "http://localhost:6067/api/employee";

// API endpoints
export const listEmployees = () => {
    return axios.get(`${BASE_URL}/get/all`);
};

export const createEmployee = (employee) => {
    return axios.post(`${BASE_URL}/add`, employee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`);
};

export const getEmployeeId = (id) => {
    return axios.get(`${BASE_URL}/get/${id}`);
};

export const updateEmployee = (id, employee) => {
    return axios.put(`${BASE_URL}/update/${id}`, employee);
}