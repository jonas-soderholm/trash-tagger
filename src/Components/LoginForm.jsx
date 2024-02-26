import React, { useState } from "react";
import { useSharedState } from "../SharedContext.jsx";
import { handleLogin, handleSignUp, handleResetPassword } from "./LoginLogic.jsx";

const LoginForm = () => {
  const { rememberMe, setRememberMe } = useSharedState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setIsForgetPassword(false);
    setErrorMessage(null);
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    if (!email.trim().includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    console.log(email);
    handleLogin(email, password)
      .then(() => {
        // Redirect or show success message
      })
      .catch((error) => {
        setErrorMessage("Failed to log in. Please check your credentials.");
      });
  };

  const handleSignUpSubmit = () => {
    if (!email.trim().includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    console.log(email);
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setSuccessMessage("Congratulations! You have successfully created an account.");
    InputVisuals();
  };

  const handleForgetPassword = () => {
    setErrorMessage(null);
    const resetElement = document.querySelector(".reset-password-hidden");

    if (resetElement) {
      if (!email.trim().includes("@")) {
        setErrorMessage("Please enter a valid email address.");
        resetElement.classList.remove("hidden");
      } else {
        setErrorMessage("A mail have been sent with new password");
      }
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  };

  function InputVisuals() {
    const successElement = document.querySelectorAll(".signup-success-hidden");

    successElement.forEach((element) => {
      if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    });
    setErrorMessage(null);
  }

  return (
    <div className="bg-gray flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div className="lg:w-1/2 bg-cover bg-blue-200">
          <img src="./login.png" alt="" />
        </div>
        <div className=" w-full p-8 lg:w-1/2">
          <p className="signup-success-hidden text-xl text-gray-600 text-center">
            {isForgetPassword ? "Forget Password" : isSignUp ? "Sign Up" : "Login"}
          </p>
          {!isForgetPassword && (
            <>
              <div className="signup-success-hidden">
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Display error message */}
                </div>

                {isSignUp && (
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                  </div>
                )}

                {!isSignUp && (
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
                    <button
                      className="text-xs text-gray-500 hover:text-gray-900 focus:outline-none"
                      onClick={toggleForgetPassword}
                    >
                      Forget Password?
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {isForgetPassword && (
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="signup-success-hidden">
            <div className=" mt-4">
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                onClick={isForgetPassword ? handleForgetPassword : isSignUp ? handleSignUpSubmit : handleSignIn}
              >
                {isForgetPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Login"}
              </button>
              {errorMessage && <p className="reset-password-hidden hidden text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>
            <div className="mt-4 flex items-center justify-center w-full text-center">
              <button className="text-xs text-gray-500 capitalize text-center w-full" onClick={toggleForm}>
                {isSignUp ? "Already have an account? Login" : "Don't have an account yet? Sign Up"}
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="signup-success-hidden flex flex-col justify-center items-center h-full">
              <p className=" text-green-500 text-6xl mb-6">🎉</p>
              <p className=" text-green-500 text-sm mb-6">{successMessage}</p>
              <button
                className="text-xs mx-auto bg-blue-700 rounded-sm text-slate-200 capitalize text-center p-2"
                onClick={() => {
                  setIsSignUp(false);
                  InputVisuals();
                }}
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
