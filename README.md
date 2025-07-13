# Placement Portal - Frontend (Client)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)

This repository contains the frontend client for the **Placement Portal**, a full-stack web application designed to streamline the job placement process. This responsive user interface is built with vanilla JavaScript, HTML, and CSS, and it communicates with a backend REST API to function.

**➡️ Backend Repository: [placement-portal-backend](https://github.com/abhi6101/placement-portal-backend)**

---

## ✨ Live Demo

You can view the complete, deployed application here:
**[https://hack-2-hired.onrender.com/](https://hack-2-hired.onrender.com/)**

## 🚀 Key Features

-   **Intuitive Job Board:** Clean and easy-to-navigate interface for students to browse job opportunities.
-   **Secure Login:** Interface for JWT-based user authentication.
-   **Role-Based Views:** Dynamically displays different options and views for "Admin" and "Student" roles.
-   **Admin Dashboard:** Provides forms and controls for admins to create and manage job postings.
-   **Responsive Design:** Ensures a seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack

| Category         | Technology / Tool         |
| ---------------- | ------------------------- |
| **Core**         | Vanilla JavaScript, HTML5, CSS3 |
| **API Client**   | Fetch API (Browser)       |
| **Deployment**   | Render                    |

## Local Setup

To run the frontend client locally, you must have the [backend server](https://github.com/abhi6101/placement-portal-backend) running first.

### Prerequisites

-   A modern web browser (like Chrome, Firefox).
-   A local web server to serve the static files (optional, but recommended to avoid CORS issues). The `Live Server` extension for VS Code is a great option.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/abhi6101/placement-portal-frontend.git
    cd placement-portal-frontend
    ```

2.  **Ensure the Backend is Running:**
    Follow the setup instructions in the [backend repository](https://github.com/abhi6101/placement-portal-backend) to start the server on `http://localhost:8080`.

3.  **Run the Frontend:**
    -   If using the VS Code **Live Server** extension, right-click on `index.html` and select "Open with Live Server".
    -   Alternatively, you can open the `index.html` file directly in your web browser.

4.  **Configure API endpoint (if necessary):**
    -   In the JavaScript files, ensure that all API requests are pointing to `http://localhost:8080`. If you need to change this, search for the base URL variable in the code.

## 🤝 Contributing

Contributions are welcome! If you have suggestions to improve the UI or add features, please feel free to fork the repo and create a pull request.

## 📄 License

Distributed under the MIT License.