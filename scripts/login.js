  let loginSubmit = document.querySelector(".login-submit");
  let loginEmailField = document.querySelector(".login-email-field");
  let loginPasswordField = document.querySelector(".login-password-field");
  let hideIcon;

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

  // hide show icon for login
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