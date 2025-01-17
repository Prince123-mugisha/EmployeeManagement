import React from 'react';
import ListEmployeeComponent from './Component/ListEmoloyeeeComponet';
import AddEmployee from './Component/AddEmployee';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>

     <BrowserRouter>
        <Routes>
          <Route path='/add-employee' element={<AddEmployee />} />
          <Route path='/' element={<ListEmployeeComponent />} />
          <Route path='/edit-employee/:id' element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

