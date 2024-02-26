export async function handleLogin() {
  const fetchMail = "http://localhost:3100/emailSender";

  try {
    const response = await fetch(fetchMail);

    if (!response.ok) {
      console.log("failed to fetch");
    }
  } catch (error) {
    console.log("error login");
  }
}

export function handleSignUp() {
  console.log("Sign Up clicked");
  // Add logic to handle sign up
}

export function handleResetPassword() {
  console.log("Reset Password clicked");
  // Add logic to handle password reset
}
