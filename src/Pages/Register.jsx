import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../src/assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);

    register(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : '/')
        if (result.user) {
          alert("Register success"); 
        }
        updateProfile( result.user, {
            displayName: name
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content lg:gap-28 flex-col lg:flex-row ">
          <div className="text-center lg:text-left md:w-1/2">
            <img src={img} />
          </div>
          <div className="card flex-shrink-0 md:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <h1 className="text-5xl font-bold">Register</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
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
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="input input-bordered btn btn-primary"
                />
              </div>
            </form>
            <p className="text-center mb-5">
              Already have an account{" "}
              <Link className="text-blue-600 font-bold underline" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
