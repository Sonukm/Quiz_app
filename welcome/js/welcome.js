// all global vareable
let brandCode = sessionStorage.getItem("brandCode");
selectSubjectEl = document.querySelector("#select-subject-el");
startQuizBtn = document.querySelector(".start-quiz-btn");
let enrollment = sessionStorage.getItem("enrollment");

// get subject local storage
let allSubject = [];
if(localStorage.getItem(brandCode+"_allSubject") != null){
allSubject = JSON.parse(localStorage.getItem(brandCode+"_allSubject"));
// reading all subject from local storage 
    allSubject.forEach((subject,index)=>{
        selectSubjectEl.innerHTML += `
        <option value="${subject.subjectName}">${subject.subjectName}</option> 
        `;
    });

};

selectSubjectEl.addEventListener("change",()=>{
    var allCookie = [];
var cookie = document.cookie.split(";");
cookie.forEach((data)=>{
    allCookie.push(data.trim());
})
if(allCookie.indexOf(brandCode+"_"+selectSubjectEl.value+"_"+enrollment+"=done") != -1){
    swal(" Already Attempty ! ", "Please Contact your Teacher!", "warning");
    startQuizBtn.disabled = true;
}else{
    startQuizBtn.disabled = false;
}
})

startQuizBtn.onclick = function(){
   if(selectSubjectEl.value != "choose subject"){
    var subject = selectSubjectEl.value;
    sessionStorage.setItem("subject",subject)
   window.location = "../quiz/quiz.html"
   }else{
    swal(" No Subject ! ", "Please Choose Subject First!", "warning");
   }
}




