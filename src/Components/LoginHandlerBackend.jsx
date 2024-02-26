import { useSharedState } from "../SharedContext.jsx";

export async function RegisterNewAccount(email, password) {
  console.log("email: ", email);
  console.log("Pass: ", password);

  try {
    const response = await fetch("http://localhost:3100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    console.log("Registration successful:", data);
    // Optionally, you can return data or perform other actions based on the response
    return data;
  } catch (error) {
    console.error("Error registering account:", error.message);
    // Handle the error (e.g., display an error message to the user)
  }
}

export async function Login(email, password, setIsLoggedIn, setErrorMessage) {
  console.log("email: ", email);
  console.log("Pass: ", password);
  setErrorMessage("Wrong email or password");

  try {
    const response = await fetch("http://localhost:3100/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log("Login successful:", data);

    // Set the isLoggedIn state to true
    setIsLoggedIn(true);
    //setIsLoggedIn((prev) => !prev);
    console.log("AAAAA");
    // Optionally, you can return data or perform other actions based on the response
    return data;
  } catch (error) {
    console.error("Error logging in:", error.message);
    // Handle the error (e.g., display an error message to the user)
  }
}
