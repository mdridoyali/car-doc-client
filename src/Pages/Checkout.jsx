import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Checkout = () => {
    const {user } = useContext(AuthContext);
  const service = useLoaderData();
  const { title, _id, price, img } = service;



  const handleBookService = (e) => {
     e.preventDefault();
     const name = e.target.name.value;
     const date = e.target.date.value;
     const email = e.target.email.value;
     const amount = e.target.amount.value;
     const booking = {
        customerName : name,
        email,
        date,
        img,
        amount,
        service_id:_id,
        service:title
     }
     console.log(booking)

     fetch('http://localhost:5000/bookings', {
        method: "POST",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(booking)
     })
     .then(res => res.json())
     .then(data => {
        console.log(data)
        if(data.insertedId){
            alert('Booked Success')
        }
     })


  }

  return (
    <div className="mb-10 xs:px-7">
      <h2 className="text-center text-3xl">Book service {title}</h2>
      <div>
        <form onSubmit={handleBookService}>
          <div className="grid md:grid-cols-2 gap-x-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                defaultValue={user?.displayName}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                defaultValue={user?.email}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                className="input input-bordered"
                defaultValue={"$" + price}
              />
            </div>
          </div>
          <div className="form-control mt-7">
            <input
              type="submit"
              value="BOOk NOW"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
