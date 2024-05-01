const questions = [
{
    question: "Which is the longest river in the world?",
    answers: [
        { text: 'The Amazon', correct: false},
        { text: 'The Mississippi', correct: false},
        { text: 'The Nile River', correct: true},
        { text:'The Ganges', correct: false},
    ]
},
{
 question: 'Who painted the Mona Lisa?',
    answers: [
        { text: 'Leonardo da Vinci', correct: true},
        { text: 'Van Gogh', correct: false},
        { text: 'Michelangelo', correct: false},
        { text:'Jean Michel Basquiat', correct: false},
    ]
},
{
    question: 'What is the largest organ in the human body?',
    answers: [
        {text: 'The heart', correct: false},
        {text: 'The kidney', correct: false},
        {text: 'The brain', correct: false},
        {text:'The skin', correct: true},
    ]
},
{
    question: 'Which is the smallest country in the world?',
    answers: [
        {text: 'Bhutan', correct: false},
        {text: 'Vatican City', correct: true},
        {text: 'Nepal', correct: false},
        {text:'Sri Lanka', correct: false},
    ]
}
 ]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0 ;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ',' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === 'true'){
        button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};



nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();