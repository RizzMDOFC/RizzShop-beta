function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-message").innerText = "Login Gagal!";
    }
}

function logout() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "index.html";
}

// Cek apakah pengguna sudah login
if (!localStorage.getItem("isAuthenticated") && window.location.pathname.includes("dashboard.html")) {
    window.location.href = "index.html";
}
