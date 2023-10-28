import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../src/assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';


const Login = () => {
  const {loginUser} = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(navigate)
  const location = useLocation()

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
    .then(result => {
      console.log(result.user)
      const user = {email}
      axios.post('http://localhost:5000/jwt', user, {
        withCredentials: true})
      .then(res => {
        console.log(res.data)
        if(res.data.success){
          navigate(location?.state ? location.state : '/')
        }
      })
    

         return alert ('Login success')
        
    })
    .catch(err => {
      console.log(err)
      return alert ('Login failed ')
    })


}


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content lg:gap-28 flex-col lg:flex-row ">
    <div className="text-center lg:text-left md:w-1/2">
      <img src={img} />
    </div>
    <div className="card flex-shrink-0 md:w-1/2 shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
       <h1 className="text-5xl font-bold">Login</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
        <input type="submit" value="LOGIN" className="input input-bordered" />
        </div>
      </form>
      <p className='text-center mb-5' >New to Car Doctor <Link className='text-blue-600 font-bold underline' to={'/register'} >Register</Link></p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;