import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routing from './components/Routing';
import AuthContextProvider from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="flex justify-center">
      <AuthContextProvider>
      <BrowserRouter>
        <Routing />
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
      </AuthContextProvider>

    </div>
  )
}

export default App
