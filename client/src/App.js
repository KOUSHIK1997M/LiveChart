import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Messenger from './Components/Messenger';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/messenger/login' exact element={<Login />} ></Route>
        <Route path='/messenger/register' exact element={<Register />} ></Route>
        <Route path='/' exact element={<Messenger />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
