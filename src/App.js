import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Login from './Components/Login/Login';
import Employé from './Components/Users/Employés';
import Manager from './Components/Users/Manager';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/manager' element={<Manager/>}/>
          <Route path='/employe' element={<Employé/>}/>

        </Routes>
      
       
    </BrowserRouter>
  );
}

export default App;
