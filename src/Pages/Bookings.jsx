import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
 
  useEffect(() => {
    if(user){
      axios.get(`http://localhost:5000/bookings?email=${user?.email}`, {withCredentials:true})
      .then((res) => {
        setBookings(res.data);
      });
    }
  }, [user]);


  const handleDelete = (id) => {
    const proceed = confirm('Are you sure , you want to delete')
    if(proceed){
     fetch(`http://localhost:5000/bookings/${id}` , {
         method: "DELETE"
     })
     .then(res => res.json())
     .then(data => {
      console.log(data)
      if(data.deletedCount > 0){
        alert('deleted')
       const remaining = bookings.filter(items => items._id !== id)
        setBookings(remaining)
      }
       
     })
    }
  }
   
  const handleConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({status: 'confirm'} )
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.modifiedCount > 0){
        const remaining = bookings.filter(booking => booking._id !== id);
        const updated = bookings.find(booking => booking._id === id)
        updated.status = 'confirm'
        const newBookings = [updated, ...remaining]
        setBookings(newBookings)

      }
    })
  }


  return (
    <div>
      <h2>Your Bookings {bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
               <h3>Delete</h3>
              </th>
              <th>Photo</th>
              <th>Name</th>
              <th>Services</th>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-circle btn-outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24">
                      <img
                        className="rounded w-16 h-16"
                        src={item.img}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.customerName}</td>
                <td>{item.service}</td>
                <td>{item.email}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>
                  {
                    item.status === 'confirm' ? <span className="font-semibold text-yellow-600" >Confirmed</span> : <button onClick={() => handleConfirm(item._id)} className="btn btn-ghost btn-xs">Please Confirm</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
