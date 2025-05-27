document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
  };

  try {
      const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.status === "success") {
          // Store user data in localStorage
          localStorage.setItem('userData', JSON.stringify({
              username: userData.username,
             
              role: userData.role
          }));
          
          // Show success message
          document.getElementById("success-message").textContent = result.message;
          document.getElementById("success-message").style.display = 'block';
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
              window.location.href = "login.html";
          }, 2000);
      } else {
          document.getElementById("error-message").textContent = result.message;
          document.getElementById("error-message").style.display = 'block';
      }
  } catch (error) {
      document.getElementById("error-message").textContent = "Registration failed. Please try again.";
      document.getElementById("error-message").style.display = 'block';
      console.error("Error:", error);
  }
});