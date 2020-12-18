// Declaring Variables
var innerBox = document.getElementById("innerbox");
var mainQuiz = document.getElementById("quiz");
var questions = document.getElementById("questions");
var quizTimer = document.getElementById("quizTimer");
var startQuizButton = document.getElementById("startquiz");
var startQuizDiv = document.getElementById("initialpage");
var scoreContainer = document.getElementById("scoreContainer");
var startPageHighscore = document.getElementById("highscore");
var clearAllScores = document.getElementById("clearscore");
var highscoreDiv = document.getElementById("scorePage");
var highscoreInitials = document.getElementById("new-initials");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayName = document.getElementById("players-initials");
var highscoreDisplayScore = document.getElementById("players-score");
var optionA = document.getElementById("a");
var optionB = document.getElementById("b");
var optionC = document.getElementById("c");
var optionD = document.getElementById("d");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOver = document.getElementById("gameover");
var gameOverBtns = document.getElementById("gameOverBtns");
var winAlertStyle = "position:absolute;top:10%;left:30%;background-color:white;font-weight:bold; color:green; font-size: xx-large;";
var loseAlertStyle = "position:absolute;top:10%;left:30%;background-color:white;font-weight:bold; color:red; font-size: xx-large;";
var correctAlertStyle="position:absolute;top:40%;left:20%;background-color:white;font-weight:bold; color:green; font-size: x-large;";
var incorrectAlertStyle="position:absolute;top:40%;left:20%;background-color:white;font-weight:bold; color:red; font-size: x-large;";
var allQuestions = [
  {
    question: "What is 10.01 + 2.1?",
    a: "12.11",
    b: "12.02",
    c: "13.11",
    d: "13.10",
    answer: "a",
  },
  {
    question: "What is 10/2?",
    a: "10",
    b: "6",
    c: "3",
    d: "5",
    answer: "d",
  },
  {
    question: "What is is 9 - 4?",
    a: "9",
    b: "5",
    c: "19",
    d: "8",
    answer: "b",
  },
  {
    question: "What is 10 * 3?",
    a: "1000",
    b: "100",
    c: "30",
    d: "20",
    answer: "c",
  },
  {
    question: "What is 10 ^ 3?",
    a: "1000",
    b: "100",
    c: "30",
    d: "20",
    answer: "a",
  },
  {
    question: "What is 10.1 + 2.1?",
    a: "12.11",
    b: "12.2",
    c: "13.11",
    d: "13.10",
    answer: "b",
  },
  {
    question: "What is 12/2?",
    a: "10",
    b: "6",
    c: "3",
    d: "5",
    answer: "b",
  },
  {
    question: "What is is 9 - 1?",
    a: "9",
    b: "5",
    c: "19",
    d: "8",
    answer: "d",
  },
  {
    question: "What is 10 * 2?",
    a: "1000",
    b: "100",
    c: "30",
    d: "20",
    answer: "d",
  },
  {
    question: "What is 10 ^ 2?",
    a: "1000",
    b: "100",
    c: "30",
    d: "20",
    answer: "b",
  },
];

var score = 0;
var timeLeft = 100;
var timerInterval;
var rightAnswer;
var currentQuestionIndex = 0;
var finalQuestionIndex = allQuestions.length;

// Generates Questions and Answers
function displayQuestion() {
  gameOver.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return displayScore();
  }
  var currentQuestion = allQuestions[currentQuestionIndex];
  questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
  optionA.innerHTML = currentQuestion.a;
  optionB.innerHTML = currentQuestion.b;
  optionC.innerHTML = currentQuestion.c;
  optionD.innerHTML = currentQuestion.d;
}

// Starts Quiz and Timer
function startQuiz() {
  gameOver.style.display = "none";
  startQuizDiv.style.display = "none";
  displayQuestion();
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 1) {
      quizTimer.textContent = "Remaining Time: " + timeLeft + " Sec";
    } else {
      quizTimer.textContent = "Remaining Time: " + timeLeft + " Secs";
    }

    if (timeLeft <= 50 && timeLeft > 25) {
      quizTimer.style.color = "yellow";
    } else if (timeLeft <= 25) {
      quizTimer.style.color = "red";
    }

    if (timeLeft <= 0) {
      quizTimer.style.color = "white";
      clearInterval(timerInterval);
      displayScore();
    }
  }, 1000);
  mainQuiz.style.display = "block";
}

// Shows Score
function displayScore() {
  mainQuiz.style.display = "none";
  gameOver.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInitials.value = "";
  finalScoreEl.innerHTML = score + " out of " + allQuestions.length;
  innerBox.style.backgroundImage =
    "url('https://media2.giphy.com/media/fszslx90nGPuByhXs7/200w.webp?cid=ecf05e473g51brjqbg5ju90l97aqg1ejfszo7v36dsqb86ag&rid=200w.webp')";
  finalScoreEl.style.color = "white";
  if (score <= 7) {
    // alert("You lost. Please try again.");
    customAlert("You lost. Please try again",5000,loseAlertStyle);

  } else if (score >= 8) {
    customAlert("You won. Congratulations!!",5000,winAlertStyle);

  }
}

// Creates high scores
function createHighScores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("localStorageScore")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

//Triggered when user enters enters Initils and click Submit
function highscore() {
  if (highscoreInitials.value === "") {
    alert("Initials must be entered!!!");
    return false;
  } else {
    var localStorageScore =
      JSON.parse(localStorage.getItem("localStorageScore")) || [];
    var currentUser = highscoreInitials.value.trim();
    var currentScore = {
      name: currentUser,
      score: score,
    };

    gameOver.style.display = "none";
    scoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    gameOverBtns.style.display = "flex";

    localStorageScore.push(currentScore);
    localStorage.setItem(
      "localStorageScore",
      JSON.stringify(localStorageScore)
    );
    createHighScores();
  }
}

// Triggered when user clicks replay quiz
function replayQuiz() {
  scoreContainer.style.display = "none";
  gameOver.style.display = "none";
  startQuizDiv.style.display = "block";
  timeLeft = 100;
  score = 0;
  currentQuestionIndex = 0;
  innerBox.style.backgroundImage =
    "url('https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg')";
}

function customAlert(msg,duration,styleAlert)
{
 var el = document.createElement("div");
 el.setAttribute("style",styleAlert);
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

// This function checks the response to each answer
function checkAnswer(answer) {
  rightAnswer = allQuestions[currentQuestionIndex].answer;

  if (answer === rightAnswer && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    customAlert("Correct Answer",2000,correctAlertStyle);    
    currentQuestionIndex++;
    displayQuestion();
    console.log("Correct Answer");
  } else if (
    answer !== rightAnswer &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
  customAlert("Incorrect Answer",2000,incorrectAlertStyle);

  //Subtract 10 seconds if the answer is incorrect
    timeLeft -= 10;
    currentQuestionIndex++;
    displayQuestion();
    console.log("Incorrect Answer");
  } else {
    displayScore();
    console.log("show score");
  }
}

// Displays high scores
function displayHighScore() {
  startQuizDiv.style.display = "none";
  gameOver.style.display = "none";
  scoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  gameOverBtns.style.display = "flex";

  createHighScores();
}

// Clears high scores
function clearScores() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

// Starts the quiz
startQuizButton.addEventListener("click", startQuiz);

//Shows high score
startPageHighscore.addEventListener("click", displayHighScore);

//Clear  High Scores  onclick="clearScore()"
clearAllScores.addEventListener("click", clearScores);

//Submits High Score
submitScoreBtn.addEventListener("click", highscore);
