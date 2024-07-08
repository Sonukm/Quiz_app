let signupBtn = document.querySelector(".signup-btn");
let signupBox = document.querySelector(".signup-box");
let loginBtn = document.querySelector(".logIn-btn");
let loginBox = document.querySelector(".login-box");
let userData = []
// signup show box function

signupBtn.onclick = function () {
  signupBox.classList.add("active");
  loginBox.classList.remove("active");
  loginBtn.classList.remove("d-none");
  signupBtn.classList.add("d-none");
}

// login box show button 
loginBtn.onclick = function () {
  signupBox.classList.remove("active");
  loginBox.classList.add("active");
  loginBtn.classList.add("d-none");
  signupBtn.classList.remove("d-none");
}

// start regester-form codding
var regesterForm = document.querySelector(".sign-form");
var allInput = regesterForm.querySelectorAll("input");
let textarea = regesterForm.querySelector("textarea");
// form submit function
regesterForm.onsubmit = function (e) {
  e.preventDefault();
  registrationData();
}

function registrationData() {
  if (localStorage.getItem(allInput[0].value+"_brand") == null) {
    const userData = {
      brandCode: allInput[0].value,
      brandName: allInput[1].value,
      website: allInput[2].value,
      contact: allInput[3].value,
      address: textarea.value,
      username: allInput[4].value,
      password: allInput[5].value
    };
    let userString = JSON.stringify(userData);
    localStorage.setItem(allInput[0].value+"_brand", userString);
    regesterForm.reset('');
    swal("Registration Done", "Plese Sign In !", "success");
  } else {
    swal("Chang Brand Code", "This Brand Code Already Taken !", "warning");
  }
}

/// start sign in codding 

var signinBtn = document.querySelector(".signin-btn");
let brandCode = document.querySelector("#brandCode");
let username = document.querySelector("#username");
let password = document.querySelector("#password");


signinBtn.onclick = function (e) {
  e.preventDefault();
  if (brandCode.value && username.value && password.value != "") {
    if (localStorage.getItem(brandCode.value+"_brand") != null) {
      let userData = JSON.parse(localStorage.getItem(brandCode.value+"_brand"))
      if (userData.username == username.value) {
        if (userData.password == password.value) {
          signinBtn.innerHTML = "Please Waite...";
          signinBtn.disabled = true;
          sessionStorage.setItem("brandCode",brandCode.value)
          setTimeout(function(){
            window.location = "../dashboard/dashboard.html";
          },3000)
        } else {
          swal("password wrong", "enter correct password!", "warning");
        }
      } else {
        swal(" wrong user name", "enter correct user name!", "warning");
      }
    } else {
      swal("Wrong Brand Code ", "Please Sign up First!", "warning");
    }
  } else {
    swal("Empty Field", "Please Fill All ", "warning",);
  }

}