let brandCode = sessionStorage.getItem("brandCode");
let subject = sessionStorage.getItem("subject");
let studentName = sessionStorage.getItem("name");
let fatherName = sessionStorage.getItem("fatherName");
let enrollment = sessionStorage.getItem("enrollment");
let adress = sessionStorage.getItem("adress");
let imgUrl = sessionStorage.getItem("imgUrl");
let allQuestion = [];

// reading question from localstorage
if (localStorage.getItem(brandCode + "_" + subject + "_question") != null) {
  allQuestion = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_question"));
};

// get question function
let index = 0;
let total = allQuestion.length;
let right = 0;
let wrong = 0;
let lengthQuestion = allQuestion.length;
let mainBox = document.querySelector(".main");
let questionEl = document.querySelector(".question-el");
allOptionsEl = document.querySelectorAll(".optionEl");
let nextBtn = document.querySelector(".next-btn");
let allUserResult = [];
var particularUserResult =[];



const getQuestionFun = () => {
  if (index == total) {
    return endQuiz();
  }
  resetFun();
  let data = allQuestion[index];
  questionEl.innerHTML = ` Q- ${index + 1} : ${data.question}`;
  allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
  allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
  allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
  allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
}
getQuestionFun();


// next btn function 
nextBtn.onclick = function () {
  let data = allQuestion[index];
  let ans = getAnswer();
  if (ans == data.correctAnswer) {
    right++;
  } else {
    wrong++
  }
  index++;
  getQuestionFun();
  return;

}
const getAnswer = () => {
  let answer;
  allOptionsEl.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer
};
function resetFun() {
  allOptionsEl.forEach((input) => {
    input.checked = false;
  })
};

// end quiz function 

let endQuiz = () => {
  mainBox.innerHTML = `
  <h2>Click on Submit Button to complete your examination. </h2>
  <div align="center">
            <button class="btn btn-primary next-btn quiz-submit-btn">Submit</button>
        </div>
  `;
  submitFuc();
}

const submitFuc = () => {
  if (localStorage.getItem(brandCode + "_" + subject + "_result") != null) {
    allUserResult = JSON.parse(localStorage.getItem(brandCode + "_" + subject + "_result"));
  }
  if(localStorage.getItem(brandCode+"_"+enrollment+"_result") != null){
    particularUserResult  = JSON.parse(localStorage.getItem(brandCode+"_"+enrollment+"_result"));
  }
 
  let submitBtn = document.querySelector(".quiz-submit-btn");
  // submit function
  submitBtn.onclick = function () {
    document.cookie = brandCode+"_"+subject+"_"+enrollment+"=done;max-age=86400;path=/";
    
    allUserResultFunc();
    particularUserResultFunc();
    this.innerHTML = "please wait...";
    this.disabled = true;
    this.style.opacity = 0.9;
  }
};

const allUserResultFunc = () => {
  allUserResult.push({
    name: studentName,
    enrollment: enrollment,
    rightAns: right,
    wrongAns: wrong,
    subject: subject,
    maxMark: total
  })
  localStorage.setItem(brandCode + "_" + subject + "_result", JSON.stringify(allUserResult));
  setTimeout(function () {
    sessionStorage.removeItem("brandCode");
    sessionStorage.removeItem("subject");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("fatherName");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("adress");
    window.location = "../homepage/homepage.html";
  }, 2000);

}
// submit particularUserResultFunc data

const particularUserResultFunc = () => {
  particularUserResult.push({
    name: studentName,
    fatherName :fatherName,
    enrollment: enrollment,
    rightAns: right,
    wrongAns: wrong,
    subject: subject,
    maxMark: total,
    profilePic : imgUrl
  })
  localStorage.setItem(brandCode + "_"+enrollment+ "_result", JSON.stringify(particularUserResult));
  setTimeout(function () {
    sessionStorage.removeItem("brandCode");
    sessionStorage.removeItem("subject");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("fatherName");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("adress");
    window.location = "../homepage/homepage.html";
  }, 2000);

}


