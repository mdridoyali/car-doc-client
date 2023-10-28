import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";
import PrivetRoute from "../Pages/PrivetRoute";
import Checkout from "../Pages/Checkout";
import Bookings from "../Pages/Bookings";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element : <Home></Home>
        },
        {
            path: '/login',
            element : <Login></Login>
        },
        {
            path: '/register',
            element : <Register></Register>
        },
        {
            path: '/about',
            element : <PrivetRoute><About></About></PrivetRoute>
        },
        {
            path: '/bookings',
            element : <Bookings></Bookings>
        },
        {
          path: '/checkout/:id',
          element : <Checkout></Checkout>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      ]
    },
  ]);

  export default router