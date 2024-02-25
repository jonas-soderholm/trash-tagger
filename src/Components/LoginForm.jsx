import React, { useState, useEffect } from "react";
import { useSharedState } from "../SharedContext.jsx";
import { handleLogin, handleSignUp, handleResetPassword } from "./LoginLogic.jsx";

const LoginForm = () => {
  const { rememberMe, setRememberMe } = useSharedState();
  const [isSignUp, setIsSignUp] = useState(false); // New state to toggle between login and sign-up
  const [isForgetPassword, setIsForgetPassword] = useState(false); // New state to toggle between login and forget password

  useEffect(() => {
    console.log(rememberMe);
  }, [rememberMe]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between login and sign-up
    setIsForgetPassword(false); // Reset forget password mode when toggling forms
    console.log(isSignUp ? "Switched to Login" : "Switched to Sign Up");
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword); // Toggle forget password mode
    console.log(isForgetPassword ? "Forget Password disabled" : "Forget Password enabled");
  };

  return (
    <>
      <div
        className="bg-gray"
        style={{
          backgroundImage: `url("/globe.png")`,
        }}
      >
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
          <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
            <div
              className="lg:w-1/2 bg-cover bg-blue-700"
              style={{
                backgroundImage: `url("/login.png")`,
              }}
            ></div>
            <div className="w-full p-8 lg:w-1/2">
              <p className="text-xl text-gray-600 text-center">
                {isForgetPassword ? "Forget Password" : isSignUp ? "Sign Up" : "Login"}
              </p>
              {!isForgetPassword && ( // Render login and sign-up form fields if not in forget password mode
                <>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="password"
                    />
                  </div>
                  {isSignUp && ( // Conditionally render the confirm password field for sign-up
                    <div className="mt-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                      <input
                        className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                        type="password"
                      />
                    </div>
                  )}
                  {!isSignUp && ( // Show the "Remember Me" option only on the login form
                    <div className="mt-4 flex items-center justify-between">
                      <label className="flex items-center text-sm text-gray-500">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="mr-2"
                        />
                        Remember Me
                      </label>
                      <a href="#" className="text-xs text-gray-500 hover:text-gray-900" onClick={toggleForgetPassword}>
                        Forget Password?
                      </a>
                    </div>
                  )}
                </>
              )}
              {isForgetPassword && ( // Render forget password form fields if in forget password mode
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type="email"
                    required
                  />
                </div>
              )}
              <div className="mt-4">
                <button
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                  onClick={isForgetPassword ? handleResetPassword : isSignUp ? handleSignUp : handleLogin}
                >
                  {isForgetPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Login"}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center w-full text-center">
                <button onClick={toggleForm} className="text-xs text-gray-500 capitalize text-center w-full">
                  {isSignUp ? "Already have an account? Login" : "Don't have an account yet? Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
