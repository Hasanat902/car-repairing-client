import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../../Shared/PageTitle/PageTitle";
import axios from "axios";
import useToken from "../../../hooks/useToken";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    let errorElement;

    const from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
      const [token] = useToken(user);

      if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
          
      }

      if(loading || sending){
        return <Loading></Loading>
      }

      if(token){
        navigate(from, {replace: true});
      }

    const handleSubmit = async event => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
        
    }

    const resetPassword = async() => {
      const email = emailRef.current.value;
      if(email){
        await sendPasswordResetEmail(email);
        toast('Sent email');
      }
      else{
        toast('Please Enter your Email');
      }
    }

  return (
    <div className="container w-50 mx-auto">
      <PageTitle title="Login"></PageTitle>
      <h2 className="text-center text-primary mt-5">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
        </Form.Group>
        <Button className="w-50 mx-auto d-block mb-2" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {errorElement}
      <p>New to Car Repairing? <Link to="/register" className="text-primary text-decoration-none">Please Register</Link></p>
      <p>Forget Password? <button onClick={resetPassword} className="btn btn-link text-primary text-decoration-none">Reset Password</button></p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
