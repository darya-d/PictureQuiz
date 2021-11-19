const images = {
"dog": "./assets/img/dog.jpg",
"cow": "./assets/img/cow.jpg",
"cat": "./assets/img/cat.jpg",
"goat": "./assets/img/goat.jpg",
"deer": "./assets/img/deer.jpg",
"hen": "./assets/img/hen.jpg",
"lion": "./assets/img/lion.jpg",
"parrot": "./assets/img/parrot.jpg",
"tiger": "./assets/img/tiger.jpg"
}

function startQuiz() {
  if (quiz.isEnded()) {
    showScores();
  } else {
  // show question
  const element = document.getElementById("question");
  element.innerHTML = quiz.getQuestionIndex().text;

  // show options
  const choices = quiz.getQuestionIndex().choices;
  for (let i = 0; i < choices.length; i++) {
    const element = document.getElementById("choice" + i);
    element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
    guess("btn" + i, choices[i]);
  }

  showProgress();
  }
};

function guess(id, guess) {
  const button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    startQuiz();
  }
};

function showProgress() {
  const currentQuestionNumber = quiz.questionIndex + 1;
  const element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";

  let element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions
const questions = [
  new Question("Which one is dog?", ["cow", "goat", "cat", "dog"], "dog"),
  new Question("Select tiger below", ["parrot", "deer", "tiger", "lion"], "tiger"),
  new Question("Which one is  parrot?", ["hen", "parrot", "goat",  "dog"], "parrot"),
  new Question("Select cat below?", ["parrot", "goat", "cat", "tiger"], "cat"),
  new Question("Which one is lion?", ["lion", "goat", "tiger", "dog"], "lion")
];

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
  }

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

// create quiz
const quiz = new Quiz(questions);

// display quiz
startQuiz();