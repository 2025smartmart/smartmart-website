import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import App from '../App';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/Forgotpassword';
import Profile from '../components/Profile';
import Contact from '../components/Contact';
import About from '../components/About';
import Services from '../components/Services';
import Cart from '../components/Cart';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '',
    element: <Home />,
  },
   {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,

  },
  
  {
    path: "contact",
    element: <Contact/>,
  },
  {
    path: "about",
    element: <About/>,
  },
  
 
]);

export default router;