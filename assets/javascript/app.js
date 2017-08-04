var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is 6 * 8?", "What is the capital of the USA?", "How old is Cananda?", "How many legs does an ant have?", "What is the most poisonous snake?", "What is the largest mammal?", "Who founded the United States?", "Which animal is the fastest?"];
var answerArray = [["48", "32", "14", "22"], ["Virginia","Washington D.C.","Arizona","Santa Ana"], ["160", "220", "150", "178"], ["3","4","6","8"], ["King Cobra", "Garden Snake", "Rattle Snake", "Black Mamba"], ["Sperm Whale","Blue Whale","Elephant","Giraffe"], ["John Adams", "George Washington", "Thomas Jefferson", "John Stamos"], ["Bald Eagle","Cheetah","Horse","Peregrine Falcon"]];
var correctAnswers = ["A. 48", "B. Washington D.C.", "C. 150", "C. 6", "D. Black Mamba", "A. Sperm Whale", "B. George Washington", "D. Peregrine Falcon"];
var questionCounter = 0;
var selectedAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;


function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);  
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Congratulations! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Sorry! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();


$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	generateHTML();

	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	resetGame();
});

});

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}