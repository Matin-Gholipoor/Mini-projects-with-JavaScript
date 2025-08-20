questions = [
	{
		question: "What is the capital of France?",
		choices: ["Berlin", "Madrid", "Paris", "Rome"],
		correctAnswer: 2
	},
	{
		question: "Which planet is known as the Red Planet?",
		choices: ["Earth", "Mars", "Jupiter", "Saturn"],
		correctAnswer: 1
	},
	{
		question: "What is the largest ocean on Earth?",
		choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
		correctAnswer: 3
	},
	{
		question: "Which of these is NOT a programming language?",
		choices: ["Banana", "Python", "Java", "HTML"],
		correctAnswer: 0
	},
	{
		question: "What is the chemical symbol for gold?",
		choices: ["Go", "Gd", "Au", "Ag"],
		correctAnswer: 2
	}
];

let questionIndex = 0;
let score = 0;

document.querySelector('.js-start-card').style.display = 'flex';
document.querySelector('.js-question-card').style.display = 'none';
document.querySelector('.js-result-card').style.display = 'none';

document.querySelector('.js-start-button').addEventListener('click', () => {
	document.querySelector('.js-start-card').style.display = 'none';
	document.querySelector('.js-question-card').style.display = 'flex';

	loadQuestion(questionIndex);
});

document.querySelectorAll('.js-choice').forEach((choice, index) => {
	choice.dataset.index = index;
});

document.querySelector('.js-restart-button').addEventListener('click', () => {
	questionIndex = 0;
	score = 0;

	document.querySelector('.js-progress').style.width = 0;

	document.querySelector('.js-start-card').style.display = 'flex';
	document.querySelector('.js-question-card').style.display = 'none';
	document.querySelector('.js-result-card').style.display = 'none';
});

function loadQuestion(questionIndex) {
	document.querySelectorAll('.js-choice').forEach((choice, index) => {
		choice.addEventListener('click', handleAswer);
	});

	document.querySelector('.js-question').textContent = questions[questionIndex].question;
	document.querySelectorAll('.js-choice').forEach((choice, index) => {
		choice.textContent = questions[questionIndex].choices[index];

		choice.className = '';
		choice.classList.add('choice');
		choice.classList.add('js-choice');
	});

	document.querySelector('.js-question-number').textContent = `Question ${questionIndex + 1} of ${questions.length}`;
	document.querySelector('.js-score').textContent = `Score: ${score}`;

	document.querySelector('.js-progress').style.width = `${100 / 5 * questionIndex}%`;
}

function handleAswer(event) {
	const index = event.target.dataset.index;
	const choice = event.target;

	if (index == questions[questionIndex].correctAnswer) {
		score++;
		document.querySelector('.js-score').textContent = `Score: ${score}`;
		choice.classList.replace('choice', 'choice-correct');
	}
	else {
		choice.classList.replace('choice', 'choice-incorrect');
		Array.from(document.querySelectorAll('.js-choice'))[questions[questionIndex].correctAnswer].classList.replace('choice', 'choice-correct');
	}

	document.querySelectorAll('.js-choice').forEach((choice) => { choice.removeEventListener('click', handleAswer) });
	questionIndex++;

	setTimeout(() => {
		if (questionIndex !== 5)
			loadQuestion(questionIndex);
		else {
			showResult();
		}
	}, 1000);
}

function showResult() {
	document.querySelector('.js-question-card').style.display = 'none';
	document.querySelector('.js-result-card').style.display = 'flex';

	document.querySelector('.js-score-text').textContent = `You scored ${score} out of ${questions.length}`;

	const percentage = score * 100 / questions.length;
	if (percentage > 80)
		document.querySelector('.js-description-text').textContent = "Perfect! You're a genius!";
	else if (percentage <= 80 && percentage > 60)
		document.querySelector('.js-description-text').textContent = "Great job! You know your stuff!";
	else if (percentage <= 60 && percentage > 40)
		document.querySelector('.js-description-text').textContent = "Good effort! Keep learning!";
	else if (percentage <= 40 && percentage > 20)
		document.querySelector('.js-description-text').textContent = "Not bad! Try again to improve!";
	else if (percentage <= 20)
		document.querySelector('.js-description-text').textContent = "Keep studying! You'll get better!";
}