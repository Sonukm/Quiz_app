
// brand code access sessionStorage

let brandCode;
let brandnameEl = document.getElementById("brand-name");
brandCode = sessionStorage.getItem("brandCode");
var teacherPic = sessionStorage.getItem("imgUrl");
console.log(teacherPic)
let alluserData = JSON.parse(localStorage.getItem(brandCode + "_brand"));
if (brandCode == null) {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "black";
    swal("UnAuthrised User ", "wrong adress", "warning");
}
brandnameEl.innerHTML = "welcome Mr/Ms : " + alluserData.brandName;
let profilePicBox = document.querySelector(".profile-pic");
profilePicBox.style.backgroundImage = `url(${teacherPic})`;




// start log out codding
let logout_btn = document.getElementById("logout-btn");

logout_btn.addEventListener("click", (e) => {
    e.target.innerHTML = "Please wait...";
    this.disabiled = true;
    this.backgroundColor = "#ccc";

    setTimeout(function () {
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("imgUrl");
        window.location = "../company/company.html";
    }, 3000)

});

// start store subject codding
var visibleSubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");
var allSubject = [];


subjectBtn.onclick = function (e) {
    e.preventDefault();
    if (subjectEl.value != "") {
        newSubject();
        subjectEl.value = "";
    } else {
        swal("Please Enter Subject ! ", "Subject is Empty !", "warning");
    }
    updateSubject();
}

// add new subject function
const newSubject = (subject, index) => {
    var subjectName = subjectEl.value;
    if (subject) {
        subjectName = subject.subjectName;
    }
    visibleSubject.innerHTML += `

    <div class="d-flex subject-box justify-content-between align-items-center">
        <h3 index="${index}">${subjectName}</h3>
        <div>
            <i class="fa fa-edit mx-2 edit-btn" style="font-size: 22px;"></i>
            <i class="fa fa-save save-btn d-none mx-2" style="font-size: 22px;"></i>
            <i class="fa fa-trash mx-2 del-btn" style="font-size: 22px;"></i>
        </div>
    </div>

    `;

    // all delete subject codding start
    var i;
    var delAllBtn = visibleSubject.querySelectorAll(".del-btn");
    for (i = 0; i < delAllBtn.length; i++) {
        delAllBtn[i].onclick = function () {
            let parent = this.parentElement.parentElement;
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        parent.remove();
                        updateSubject();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }

    }

    // start All subject Edit update codding
    let allEditBtn = visibleSubject.querySelectorAll(".edit-btn");
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            let parent = this.parentElement.parentElement;
            let h3 = parent.getElementsByTagName("h3");
            let saveBtn = parent.querySelector(".save-btn");
            h3[0].contentEditable = true;
            h3[0].focus();
            this.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            saveBtn.onclick = function () {
                let editsub = h3[0].innerHTML;
                let id = h3[0].getAttribute("index");
                updateSubject(editsub, id);
                this.classList.add("d-none");
                allEditBtn[id].classList.remove("d-none");
                h3[0].contentEditable = false;

            }
        }

    }

}

//  all subject get localstorige
if (localStorage.getItem(brandCode + "_allSubject") != null) {
    allSubject = JSON.parse(localStorage.getItem(brandCode + "_allSubject"));
    allSubject.forEach((subject, index) => {
        newSubject(subject, index);
    })

}

// update subject function and set subject local storage
function updateSubject(editsub, id) {
    if (editsub != undefined && id != undefined) {
        allSubject[id] = {
            subjectName: editsub
        }
    } else {
        allSubject = [];
        var i;
        var subjectBox = visibleSubject.querySelectorAll(".subject-box");
        for (i = 0; i < subjectBox.length; i++) {
            var h3 = subjectBox[i].getElementsByTagName("h3");
            allSubject.push({
                subjectName: h3[0].innerHTML,
            })
        }
    }

    localStorage.setItem(brandCode + "_allSubject", JSON.stringify(allSubject));
}

// start return subject in question form
var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector("#question-form");
var allQuestionInput = questionForm.querySelectorAll("input");
var selectSubject = document.querySelector("#select-subject");
var subjectResultEl = document.querySelector("#subject-result-el");
var allQuestion = [];
var subject;


questionForm.onsubmit = (e) => {
    e.preventDefault();
    insertQuestionFunc();
}


// option show choose subject function call 
const choseSubjectFun = () => {
    allSubject.forEach((subject, index) => {
        chooseSubject.innerHTML += `
         <option value='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        selectSubject.innerHTML += `
         <option value='${subject.subjectName}'>${subject.subjectName}</option>
        `;
        subjectResultEl.innerHTML += `
        <option value='${subject.subjectName}'>${subject.subjectName}</option>
       `;

    })

}
choseSubjectFun();
// check chang value select option
chooseSubject.addEventListener('change', () => {
    checkSubject();
    checkSubjectKey();
})
// checksubject value function
function checkSubject() {
    subject = chooseSubject.value;
}
checkSubject();

// choose subject key data access local storage

function checkSubjectKey() {
    if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
        allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
    } else {
        allQuestion = [];
    }
}
checkSubjectKey();


// insert question function and edit question
const insertQuestionFunc = (sub, id, question, opOne, opTwo, opThree, opFour, corAns) => {

    if (id != undefined && sub != undefined) {

        allQuestion[id] = {
            question: question,
            optionOne: opOne,
            optionTwo: opTwo,
            optionThree: opThree,
            optionFour: opFour,
            correctAnswer: corAns
        }
        localStorage.setItem(brandCode + "_" + sub + "_question", JSON.stringify(allQuestion));
        swal("Success", "Data Updated Successfully", "success");
    } else {
        if (chooseSubject.value != "choose subject") {
            allQuestion.push({
                question: allQuestionInput[0].value,
                optionOne: allQuestionInput[1].value,
                optionTwo: allQuestionInput[2].value,
                optionThree: allQuestionInput[3].value,
                optionFour: allQuestionInput[4].value,
                correctAnswer: allQuestionInput[5].value
            })
            localStorage.setItem(brandCode + "_" + chooseSubject.value + "_question", JSON.stringify(allQuestion));
            swal("Success", "Data inserted Successfully", "success");
            questionForm.reset('');
        } else {
            swal("choose subject !", "please Choose A Subject", "warning");
        }

    }

}

// start returning questions from local storage
var visibleQuestion = document.querySelector(".visible-question");
var newQuestion = [];
selectSubject.onchange = () => {
    if (localStorage.getItem(brandCode + "_" + selectSubject.value + "_question") != null) {
        newQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + selectSubject.value + "_question"));
        if (newQuestion.length != 0) {
            visibleQuestion.innerHTML = "";
            newQuestionFun();
        } else {
            visibleQuestion.innerHTML = "<b style='color:red'>No Question Found !</b>";
        }
    } else {
        visibleQuestion.innerHTML = "<b style='color:red'>No Result Found !</b>";
    }
}

// ---------------------------------------------------------------------------
const newQuestionFun = () => {
    newQuestion.forEach((question, index) => {
        visibleQuestion.innerHTML += `
        <div class="mb-5" index="${index}">
            <br>
            <div class="d-flex justify-content-between">
             <h3 class="Qblue"> ${index + 1}. ${question.question}</h3>
                <div>
                    <i class="fa fa-edit edit-btn mx-3"></i>
                    <i class="fa fa-save mx-3 save-btn d-none"></i>
                    <i class="fa fa-trash del-btn mx-3"></i>
                </div>
            </div>
            <br>
            <div>
                <b class="ngreen">1.</b> <span>${question.optionOne}</span>
                <br><br>
                <b class="ngreen">2.</b> <span>${question.optionTwo}</span>
                <br><br>
                <b class="ngreen">3.</b> <span> ${question.optionThree}</span>
                <br><br>
                <b class="ngreen">4.</b> <span>${question.optionFour}</span>
                <br><br>
                <span class="bg-info p-3 text-white">${question.correctAnswer}</span>
                <br><br>
            </div>
        </div>
        
        `;
    });
    // visiable delete btn function start

    let allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
    var i, j;
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = (e) => {
            let parent = e.target.parentElement.parentElement.parentElement;
            let index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        newQuestion.splice(index, 1);
                        localStorage.setItem(brandCode + "_" + selectSubject.value + "_question", JSON.stringify(newQuestion));
                        parent.remove();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });

        }

    }

    // edit btn codding visiable question 

    let allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");

    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            let parent = this.parentElement.parentElement.parentElement;
            let index = +parent.getAttribute("index");
            let saveBtn = parent.querySelector(".save-btn");
            saveBtn.classList.remove("d-none");
            this.classList.add("d-none");
            let h3 = parent.querySelector("h3");
            let spanTag = parent.querySelectorAll("span");
            h3.contentEditable = true;
            h3.focus();
            h3.style.borderBottom = "2px solid red";
            for (j = 0; j < spanTag.length; j++) {
                spanTag[j].contentEditable = true;
                spanTag[j].focus();
                spanTag[j].style.borderBottom = "2px solid red";
            }
            saveBtn.onclick = function () {
                var subject = selectSubject.value;
                var question = h3.innerHTML.replace(`${index + 1}. `, "");
                var opOne = spanTag[0].innerHTML;
                var opTwo = spanTag[1].innerHTML;
                var opThree = spanTag[2].innerHTML;
                var opFour = spanTag[3].innerHTML;
                var corAns = spanTag[4].innerHTML;


                swal({
                    title: "Are you sure?",
                    text: "Once Updated, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willUpdated) => {
                        if (willUpdated) {
                            insertQuestionFunc(subject, index, question, opOne, opTwo, opThree, opFour, corAns);
                            allEditBtn[index].classList.remove("d-none");
                            saveBtn.classList.add("d-none");
                            h3.contentEditable = false;
                            h3.style.borderBottom = "none";
                            for (j = 0; j < spanTag.length; j++) {
                                spanTag[j].contentEditable = false;
                                spanTag[j].style.borderBottom = "none";
                            }


                        } else {
                            swal("Your imaginary file is safe!");
                        }
                    });

            }


        }
    }
}
// ---------------------------------------------------------------------------
// registration-form student and techer function 
let registrationForm = document.querySelector(".registration-form");
let allReginput = registrationForm.querySelectorAll("input");
let userType = registrationForm.querySelector("select");
var adress = registrationForm.querySelector("textarea");
var registrationDataEl = document.querySelector(".registration-data");
var profileBox = document.querySelector(".uplode-box");
var uplodeInput = document.querySelector(".uplode-input");
var modalImgUrl;
var registrationData = [];

registrationForm.onsubmit = function (e) {
    e.preventDefault();
    let checkData = checkEnrollmentFunc();
    if (checkData == "find") {
        swal({
            title: "Already Reagester !",
            text: "please Change Enrollment number",
            icon: "warning",

        })
    } else {
        registrationFunc();
        getregistrationDataFuc();
    }
}


// get  data  teacher and student registration
if (localStorage.getItem(brandCode + "_registrationData") != null) {
    registrationData = JSON.parse(localStorage.getItem(brandCode + "_registrationData"))
}
// cheack enrollment dublicate
function checkEnrollmentFunc() {
    var i;
    var checkData = "";
    for (i = 0; i < registrationData.length; i++) {
        if (registrationData[i].enrollment == allReginput[4].value) {
            checkData = "find";
            break;
        } else {
            checkData = "not find";
        }
    }
    return checkData;
}


// regestration function
const registrationFunc = () => {
    if (userType.value != "choose type") {
        registrationData.push({
            name: allReginput[0].value,
            fatherName: allReginput[1].value,
            dob: allReginput[2].value,
            userType: userType.value,
            mobile: allReginput[3].value,
            enrollment: allReginput[4].value,
            password: allReginput[5].value,
            adress: adress.value,
            profilePic: "../dashboard/images/user.png"

        });
        localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
        swal("Data inserted !", "registration Done Successfully", "success");
        registrationForm.reset("");
    } else {
        swal("choose Type !", "please Select a User", "warning");
    }

}
// ---------------------------------------------------------------------
// get regesteration data 
const getregistrationDataFuc = () => {
    registrationDataEl.innerHTML = "";
    registrationData.forEach((data, index) => {
        registrationDataEl.innerHTML += `
        
        <tr index="${index}">
        <th scope="row">${index + 1}</th>
        <td>
            <div class="profile">
                <img src="${data.profilePic}" width="40" height="40" alt="">
            </div>
        </td>
        <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.fatherName}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.dob}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.userType}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.mobile}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
        <td class="text-nowrap" style="width: 8rem;">${data.password}</td>
        <td class="text-nowrap">${data.adress}</td>
        <td class="text-nowrap" style="width: 8rem;">
        <i class="fa fa-trash del-btn mx-3"></i>
        <i class="fa fa-eye edit-btn" data-bs-toggle="modal" data-bs-target="#myModal"></i>
        </td>
    </tr>    
        `;

    });

    // teacher and student delete function
    var allDellbtn = registrationDataEl.querySelectorAll(".del-btn");
    var i, j;


    for (i = 0; i < allDellbtn.length; i++) {
        allDellbtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        registrationData.splice(index, 1);
                        localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
                        parent.remove();
                        getregistrationDataFuc();
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }

    // all teacher and student edit update btn
    var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");
    var modalEditBtn = document.querySelector(".modal-edit");
    var modalUpdateBtn = document.querySelector(".modal-update-btn");
    var modalForm = document.querySelector(".modal-form");
    var allModalinput = modalForm.querySelectorAll("input");
    var modalTextArea = modalForm.querySelector("textarea");
    var closeBtn = document.querySelector(".btn-close");
    var modalSelect = modalForm.querySelector("select");





    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
            var td = parent.querySelectorAll("td");
            var imgUrl = td[0].querySelector("img").src;
            var name = td[1].innerHTML;
            var fatherName = td[2].innerHTML;
            var dob = td[3].innerHTML;
            var userType = td[4].innerHTML;
            var mobile = td[5].innerHTML;
            var enrollment = td[6].innerHTML;
            var password = td[7].innerHTML;
            var adress = td[8].innerHTML;
            profileBox.style.backgroundImage = `url(${imgUrl})`;
            allModalinput[0].value = name;
            allModalinput[1].value = fatherName;
            allModalinput[2].value = dob;
            modalSelect.value = userType;
            allModalinput[3].value = mobile;
            allModalinput[4].value = enrollment;
            allModalinput[5].value = password;
            modalTextArea.value = adress;
            for (j = 0; j < allModalinput.length; j++) {
                allModalinput[j].disabled = true;
            }
            modalTextArea.disabled = true;
            uplodeInput.disabled = true;
            modalSelect.disabled = true;
            modalEditBtn.onclick = function () {
                for (j = 0; j < allModalinput.length; j++) {
                    allModalinput[j].disabled = false;
                }
                modalTextArea.disabled = false;
                uplodeInput.disabled = false;
                modalSelect.disabled = false;
                this.classList.add("d-none");
                modalUpdateBtn.classList.remove("d-none");
                modalUpdateBtn.onclick = function () {
                   
                    var name = allModalinput[0].value;
                    var fatherName = allModalinput[1].value;
                    var dob = allModalinput[2].value;
                    var userType = modalSelect.value;
                    var mobile = allModalinput[3].value;
                    var enrollment = allModalinput[4].value;
                    var password = allModalinput[5].value;
                    var adress = modalTextArea.value;
                    swal({
                        title: "Are you sure?",
                        text: "Once updated, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willUpdated) => {
                            if (willUpdated) {
                                registrationData[index] = {
                                    name: name,
                                    fatherName: fatherName,
                                    dob: dob,
                                    userType: userType,
                                    mobile: mobile,
                                    enrollment: enrollment,
                                    password: password,
                                    adress: adress,
                                    profilePic: modalImgUrl == undefined ? imgUrl : modalImgUrl
                                }
                                localStorage.setItem(brandCode + "_registrationData", JSON.stringify(registrationData));
                                getregistrationDataFuc();
                                this.classList.add("d-none");
                                modalEditBtn.classList.remove("d-none");
                                closeBtn.click();
                                swal("update! Your imaginary file has been updated!", {
                                    icon: "success",
                                });
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                }
            }

        }
    }

}


getregistrationDataFuc();


// read photo codding
uplodeInput.onchange = function () {
    var fReader = new FileReader();
    fReader.readAsDataURL(uplodeInput.files[0]);
    fReader.onload = function (e) {
        modalImgUrl = e.target.result;
        profileBox.style.backgroundImage = `url(${modalImgUrl})`;
    }

}
// -------------------------------------------------------------------

// start togglear button codding
var togglearBtn = document.querySelectorAll(".toggler-icon");
var sideNave = document.querySelector(".side-nav");
// button toggle codding
togglearBtn[0].onclick = function () {
    sideNave.classList.add("active");
    togglearBtn[1].classList.remove("d-none");
    this.classList.add("d-none");

}
togglearBtn[1].onclick = function () {
    sideNave.classList.remove("active");
    togglearBtn[0].classList.remove("d-none");
    this.classList.add("d-none");

}
// ------------------------------------------------------------------
// get result codding from database and print certificate
let allResult = [];
let allUserResultBox = document.querySelector(".subject-result-data");

subjectResultEl.addEventListener('change', () => {
    allUserResultBox.innerHTML = "";
    if (subjectResultEl.value != "choose subject") {
        if (localStorage.getItem(brandCode + "_" + subjectResultEl.value + "_result") != null) {
            allResult = JSON.parse(localStorage.getItem(brandCode + "_" + subjectResultEl.value + "_result"));
            allResult.forEach((data, index) => {
                allUserResultBox.innerHTML += `
            <tr>
               <td class="text-nowrap" style="width: 8rem;">${index + 1}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.wrongAns}</td>
               <td class="text-nowrap" style="width: 8rem;">${data.maxMark}</td>
           </tr>                  
             `;

            })
        }
    } else {
        swal({
            title: "Select Subject",
            text: "Please Select Subject First!",
            icon: "warning",
        })
    }
});

// start get certificate codding 

let certificateCloseBtn = document.querySelector(".certificate-close-btn");
let certificateMainBox = document.querySelector(".certificate-main");
let certificateForm = document.querySelector(".certificate-form");
let cirInput = certificateForm.querySelector("input");
let cirBrandName = certificateMainBox.querySelector(".brand-name");
let cirBrandAdress = certificateMainBox.querySelector(".brand-adress");
let cirName = certificateMainBox.querySelector(".cir-name");
let cirFather = certificateMainBox.querySelector(".cir-father");
let cirEnrollment = certificateMainBox.querySelector(".cir-enrollment");
let cirData = certificateMainBox.querySelector(".cir-data");
let cirTottle = certificateMainBox.querySelectorAll(".cir-total");
let cirProfile = certificateMainBox.querySelector(".cir-profile");
let finalResultBox = certificateMainBox.querySelector(".final-result-box");

// getting result from db
certificateForm.onsubmit = function (e) {
    e.preventDefault();
    getUserResult();
}

function getUserResult() {
    if (cirInput.value != "") {
        if (localStorage.getItem(brandCode + "_" + cirInput.value + "_result") != null) {
            var ResultData = JSON.parse(localStorage.getItem(brandCode + "_" + cirInput.value + "_result"));
            certificateMainBox.classList.add("active");
            cirBrandName.innerHTML = alluserData.brandName;
            cirBrandAdress.innerHTML = alluserData.address;
            cirProfile.src = ResultData[0].profilePic;
            cirName.innerHTML = ResultData[0].name;
            cirFather.innerHTML = ResultData[0].fatherName;
            cirEnrollment.innerHTML = ResultData[0].enrollment;
            let maxMark = 0;
            let mark = 0;
            let total = 0;
            ResultData.forEach((data, index) => {

                cirData.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${data.subject}</td>
            <td>${data.maxMark}</td>
            <td>${data.rightAns}</td>
            <td>${data.rightAns}</td>
        </tr>             
            `;
                maxMark += data.maxMark;
                mark += data.rightAns;
                total += data.rightAns;
                let finalResult = (total / maxMark * 100).toFixed(2);
                if (finalResult <= 32.99) {
                    finalResultBox.innerHTML = "FAIL";
                } else {
                    finalResultBox.innerHTML = "PASS";
                }
            })
            cirTottle[0].innerHTML = maxMark;
            cirTottle[1].innerHTML = mark;
            cirTottle[2].innerHTML = total;

        } else {
            swal({
                title: "no result Found",
                text: "Theare is no result related enrollment !",
                icon: "warning",
            })
        }

    } else {
        swal({
            title: "input field Empty",
            text: "Please Enter Enrollment First!",
            icon: "warning",
        })
    }
}

certificateCloseBtn.onclick = function () {
    certificateMainBox.classList.remove("active");
}



