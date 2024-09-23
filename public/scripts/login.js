  /*
  let loginSubmit = document.querySelector(".login-submit");
  let loginEmailField = document.querySelector(".login-email-field");
  let loginPasswordField = document.querySelector(".login-password-field");

  // Login Validation
  loginSubmit.addEventListener("click", function(){
    let isValid = true;

  if (!loginEmailField.value.endsWith('@gmail.com') || loginEmailField.value.length < 13) {
      document.querySelector(".error1").innerHTML = "Invalid Email";
      isValid = false;
  }
  else{
    document.querySelector(".error1").innerHTML = "";
    let isValid = true;
  }

  if (loginPasswordField.value.length < 4) {
    document.querySelector(".error2").innerHTML =  "Password must be at least 4 characters";
    isValid = false;
  }
  else{
    document.querySelector(".error2").innerHTML = "";
    let isValid = true;
  }

  if (isValid) {
    loginEmailField.value = "";
    loginPasswordField.value = "";
    document.getElementById('password').type="password";
    document.getElementById('password-hide').src="password-hide.png";
    hideIcon = 0;
    window.location.href = "courses.html";
  }
  });
  */

  document.querySelector(".login-submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form from auto-submitting

    let emailField = document.querySelector(".login-email-field");
    let passwordField = document.querySelector(".login-password-field");
    let email = emailField.value;
    let password = passwordField.value;

    if (emailField.value.length < 1) {
      document.querySelector(".error1").innerHTML = "Please Enter Email";
  }
  else{
      document.querySelector(".error1").innerHTML = "";
  }

  if (passwordField.value.length < 1) {
      document.querySelector(".error2").innerHTML =  "Please Enter Password";
  }
  else{
      document.querySelector(".error2").innerHTML = "";
  }

    // Make a request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${email}&password=${password}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            emailField.value = ""
            passwordField.value = ""
            document.getElementById('password').type="password";
            document.getElementById('password-hide').src="img/password-hide.png";
            hideIcon = 0;
            // Success: Redirect to next page
            window.location.href = "/courses.html"; 
        } else {
            // Error: Show alert message with error
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

  // hide show icon for login
  let hideIcon;
  function pass(){
    if(hideIcon===1){
      document.getElementById('password').type="password";
      document.getElementById('password-hide').src="img/password-hide.png";
      hideIcon = 0;
    }
    else{
      document.getElementById('password').type="text";
      document.getElementById('password-hide').src="img/password-show.png";
      hideIcon = 1;
    }
  }

 