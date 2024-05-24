
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
        alert("Login successful!");
        window.location.href = "admin.html";
    } else {
        alert("Invalid username or password");
    }
});
