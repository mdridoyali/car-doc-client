/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold text-orange-600">Our Service</h2>
        <h2 className="text-5xl my-5">Our Service Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div>
        <p className="text-center font-bold my-5 text-4xl">
          Services {services.length}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 ">
          {services.map((item, idx) => (
            <div className=" p-10 border-t space-y-3 shadow-2xl rounded-2xl" key={idx}>
              <img className="h-60 rounded-2xl w-full" src={item.img} />
              <p className="font-semibold">Name: {item.title}</p>
              <p>Price: {item.price}</p>
             <div className="flex justify-between">
             <Link to={'/bookings'}><button className="btn btn-outline">My Cart</button></Link>
              <Link to={`/checkout/${item._id}`}><button className="btn btn-primary">Book Now</button></Link>
             </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
