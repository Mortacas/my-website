
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password match
    if (username === "mvp" && password === "passcode") {
        alert("Login successful!");
        // Redirect to dashboard (replace with your actual dashboard page)
        window.location.href = "admin.html";
    } else {
        alert("Invalid username or password");
    }
});
