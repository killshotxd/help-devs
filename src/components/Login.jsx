import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signInGoogle, currentUser } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/");
    else return;
  }, [currentUser]);

  const handleSignIn = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            className="w-74 md:w-96 rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Unlock the Power of Code: Share, Sell, and Succeed!
            </h1>
            <p className="py-6">
              Elevate your coding prowess. Login to the Code Marketplace and
              unlock the door to selling your code and building a thriving
              career.
            </p>
            <button onClick={handleSignIn} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
