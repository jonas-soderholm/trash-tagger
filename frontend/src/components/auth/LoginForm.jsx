import React, { useState } from "react";
import { useSharedState } from "../../SharedContext.jsx";
import {
  handleSignIn,
  toggleForm,
  toggleForgetPassword,
  handleSignUpSubmit,
  handleForgetPassword,
  SuccessSignUpVisuals,
} from "./LoginLogic.jsx";

const LoginForm = () => {
  const { rememberMe, setRememberMe } = useSharedState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { isLoggedIn, setIsLoggedIn } = useSharedState();

  function Logo() {
    return (
      <div className="absolute flex translate-x-[3rem] translate-y-[5.1rem] z-[20]">
        <div className="flex flex-col justify-center items-center">
          <img src="./logo.png" alt="" className="h-auto w-[10rem] translate-x-[-0.2rem]" />
          <div className="concert-one-regular mt-1 text-slate-200">MapTagger.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="md:hidden w-[1rem] text-sm flex absolute translate-x-[-3.5rem] translate-y-[-22rem]  justify-center items-center">
        <Logo />
      </div>
      <div className="flex bg-white rounded-lg shadow-2xl border overflow-hidden max-w-sm md:max-w-4xl w-full">
        <div className=" md:w-1/2 bg-cover md:block hidden text-[3.8rem]">
          <Logo />
          <img className="h-full filter brightness-50" src="./login.png" alt="" />
        </div>
        <div className=" w-full p-8 md:w-1/2">
          <p className="signup-success-hidden text-xl text-gray-600 text-center">
            {isForgetPassword ? "Forgot Password?" : isSignUp ? "Sign Up" : "Login"}
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
                      onClick={() => toggleForgetPassword(setIsForgetPassword, setErrorMessage, isForgetPassword)}
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
                onClick={
                  isForgetPassword
                    ? () => handleForgetPassword(email, setErrorMessage)
                    : isSignUp
                    ? () =>
                        handleSignUpSubmit(
                          setErrorMessage,
                          setSuccessMessage,
                          SuccessSignUpVisuals,
                          email,
                          password,
                          confirmPassword
                        )
                    : () => handleSignIn(setErrorMessage, email, password, setIsLoggedIn, rememberMe)
                }
              >
                {isForgetPassword ? "Reset Password" : isSignUp ? "Sign Up" : "Login"}
              </button>
              {errorMessage && <p className="reset-password-hidden  text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>
            <div className="mt-4 flex items-center justify-center w-full text-center">
              <button
                className="text-xs text-gray-500 capitalize text-center w-full"
                onClick={() => toggleForm(setIsSignUp, setIsForgetPassword, setErrorMessage)}
              >
                {isSignUp ? "Already have an account? Login" : "Don't have an account yet? Sign Up"}
              </button>
              {isForgetPassword && !isSignUp && (
                <button
                  className="text-xs text-gray-500 capitalize text-center w-full"
                  onClick={() => toggleForgetPassword(setIsForgetPassword, setErrorMessage, isForgetPassword)}
                >
                  Back to Login
                </button>
              )}
            </div>
          </div>
          {successMessage && (
            <div className="signup-success-hidden flex flex-col justify-center items-center text-center h-full">
              <p className=" text-green-500 text-6xl mb-6">🎉</p>
              <p className=" text-green-500 text-sm mb-6">{successMessage}</p>
              <button
                className="text-xs mx-auto bg-blue-700 rounded-sm text-slate-200 capitalize text-center p-2"
                onClick={() => {
                  setIsSignUp(false);
                  SuccessSignUpVisuals();
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
