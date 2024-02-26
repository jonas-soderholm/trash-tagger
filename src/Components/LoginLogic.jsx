export const handleSignIn = (setErrorMessage, email, password) => {
  if (!email || !password) {
    setErrorMessage("Email and password are required.");
    return;
  }
  if (!email.trim().includes("@")) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }
  console.log(email);
  setErrorMessage("Logged in");
  setErrorMessage("null");
};

export const toggleForm = (setIsSignUp, setIsForgetPassword, setErrorMessage) => {
  setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  setIsForgetPassword(false);
  setErrorMessage("");
  console.log("toggleForm");
};

export const toggleForgetPassword = (setIsForgetPassword, setErrorMessage, isForgetPassword) => {
  setIsForgetPassword(!isForgetPassword); // Toggle isForgetPassword
  setErrorMessage(""); // Reset error message
};

export const handleSignUpSubmit = (
  setErrorMessage,
  setSuccessMessage,
  SuccessSignUpVisuals,
  email,
  password,
  confirmPassword
) => {
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
  setErrorMessage(null);
  SuccessSignUpVisuals();
  console.log("handleSubmit");
};

export const handleForgetPassword = (email, setErrorMessage) => {
  if (!email.trim().includes("@")) {
    setErrorMessage("Please enter a valid email address.");
  } else {
    setErrorMessage("A mail have been sent with new password");
  }
  console.log("handleForgotPassword");
  console.log(email);
};

export function SuccessSignUpVisuals() {
  const successElement = document.querySelectorAll(".signup-success-hidden");

  successElement.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });

  console.log("Visuals");
}
