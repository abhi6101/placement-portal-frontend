document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("error-message");
    const successElement = document.getElementById("success-message");

    errorElement.style.display = "none";
    successElement.style.display = "none";

    try {
      const response = await fetch("https://placement-portal-backend-nwaj.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const roles = payload.roles || payload.authorities || [];
        const isAdmin = roles.includes("ROLE_ADMIN");

        localStorage.setItem("userRole", isAdmin ? "ADMIN" : "USER");

        successElement.textContent = "Login successful! Redirecting...";
        successElement.style.display = "block";

        setTimeout(() => {
          window.location.href = isAdmin
            ? "admin-dashboard.html"
            : "index.html";
        }, 500);
      } else {
        errorElement.textContent =
          data.message || "Invalid username or password";
        errorElement.style.display = "block";
      }
    } catch (error) {
      console.error("Login error:", error);
      errorElement.textContent = "Network error. Please try again.";
      errorElement.style.display = "block";
    }
  });