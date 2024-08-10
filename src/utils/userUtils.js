import { jwtDecode } from "jwt-decode";

export const handleLoginSuccess = async (
  response,
  setLoginScuess,
  setUserId,
  setProfile
) => {
  setLoginScuess(true);
  const decodedToken = jwtDecode(response.credential);

  try {
    const res = await fetch("https://movienight-bz35.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: decodedToken.given_name,
        email: decodedToken.email,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setUserId(data.user._id);

      // Combine the user ID with the decoded token
      const profileWithUserId = {
        ...decodedToken,
        userId: data.user._id,
      };

      // Store the combined object in localStorage
      localStorage.setItem("profile", JSON.stringify(profileWithUserId));

      // Update the state with the combined object
      setProfile(profileWithUserId);
    } else {
      console.error(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export const handleLoginFailure = (error, setLoginScuess) => {
  setLoginScuess(false);
};
