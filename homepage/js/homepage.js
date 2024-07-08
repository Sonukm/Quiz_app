// start get brandcode get local storage

var i;
var allBrandKey = [];
for (i = 0; i < localStorage.length; i++) {
    var allKeys = localStorage.key(i);
    if (allKeys.match("_brand")) {
        allBrandKey.push(
            allKeys.replace("_brand", "")
        )
    }
}
// creat option coding for brandcode
var BrandCodeEl = document.querySelector("#brand-code-el");
allBrandKey.forEach((code) => {
    BrandCodeEl.innerHTML += `
    <option value="${code}">${code}</option>
    `;
})
// all globel vareable
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelectorAll("input");
var loginBtn = loginForm.querySelector("button");
let brandCode;
let allUserData = [];


// start login and choose brand code codding 
BrandCodeEl.addEventListener("change", () => {
    if (BrandCodeEl.value != "choose space code") {
        sessionStorage.setItem("brandCode", BrandCodeEl.value);
        allLoginInput[0].disabled = false;
        allLoginInput[1].disabled = false;
        loginBtn.disabled = false;
        brandCode = sessionStorage.getItem("brandCode");
        loginUserFun();
    } else {
        allLoginInput[0].disabled = true;
        allLoginInput[1].disabled = true;
        loginBtn.disabled = true;
        swal("Please Select Brand ! ", "Please Select Brand Code First !", "warning");
    }
});


// loginFun codding start 

const loginUserFun = () => {
    if (localStorage.getItem(brandCode + "_registrationData") != null) {
        allUserData = JSON.parse(localStorage.getItem(brandCode + "_registrationData"));
    }
    
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        for (i = 0; i < allUserData.length; i++) {
            if (allUserData[i].enrollment == allLoginInput[0].value) {
                if (allUserData[i].password == allLoginInput[1].value) {
                    if (allUserData[i].userType == "teacher") { 
                        sessionStorage.setItem("brandCode",brandCode); 
                        sessionStorage.setItem("imgUrl",allUserData[i].profilePic);
                        window.location = "../dashboard/dashboard.html";

                    } else {
                        sessionStorage.setItem("brandCode",brandCode);
                        sessionStorage.setItem("enrollment",allUserData[i].enrollment);
                        sessionStorage.setItem("name",allUserData[i].name);
                        sessionStorage.setItem("fatherName",allUserData[i].fatherName);
                        sessionStorage.setItem("adress",allUserData[i].adress);
                        sessionStorage.setItem("imgUrl",allUserData[i].profilePic);
                        window.location = "../welcome/welcome.html";

                    }
                } else {
                    swal("Wrong Password ! ", "Please Enter correct password !", "warning");
                    return;
            }
                return;
            } else {
                swal("Wrong Enrollment ! ", "Please contact your Teacher !", "warning");
            }
        }

    }
};


