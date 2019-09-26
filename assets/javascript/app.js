// array of trivia questions
const triviaQuestions = [{
	question: "In season 1, which nerdy character in Feeny's class has a crush on Topanga?",
	answerChoices: ["Shawn", "Cory", "Minkus", "Eric"],
	answer: 2
},{
	question: "What's the name of Cory's next door neighbor who is also his teacher and then principal?",
	answerChoices: ["Daniel Williams", "George Feeny", "George Weeny", "Eric Matthews"],
	answer: 1
},{
	question: "What is the name of the actor who plays Cory Matthews?",
	answerChoices: ["Ben Savage", "Rider Strong", "Will Friedle", "William Russ"],
	answer: 0
},{
	question: "What grade are Cory, Shawn, and Topanga in during the first season of the show?",
	answerChoices: ["5th", "6th", "7th", "8th"],
	answer: 1
},{
	question: "What name does Eric refer to himself as when he's thinking?",
	answerChoices: ["Eric", "Dylan", "Jacob", "Kyle"],
	answer: 3
},{
	question: "What is the date of Cory and Topanga's wedding?",
	answerChoices: ["November 1st, 1999", "November 3rd, 1999", "November 5th, 1999", "November 7th, 1999"],
	answer: 2
},{
	question: "What band was the first musical guest on the show?",
	answerChoices: ["Journey", "The Monkees", "U2", "the Cure"],
	answer: 1
},{
	question: "What is Frankie's last name?",
	answerChoices: ["Stecchino", "Sabatino", "Sabloni", "Stefano"],
	answer: 0
},{
	question: `Finish this quote from Shawn: "My book is due back I have to ______ __."`,
	answerChoices: ["return it", "find it", "close it", "rewind it"],
	answer: 3
},{
	question: "What state does the Matthews family live in?",
	answerChoices: ["New Jersey", "Philadelphia", "Pennsylvania", "New York"],
	answer: 1
},{
	question: "What is the name of Cory's high school?",
	answerChoices: ["George Washington High", "James Madison High", "John Adams High", "Thomas Jefferson High"],
	answer: 2
},{
	question: "What is Topanga's sister's name?",
	answerChoices: ["Nebula", "Mercury", "Galaxy", "Star"],
	answer: 0
},{
	question: "What university do Cory, Topanga, and Shawn end up going to?",
	answerChoices: ["Yale University", "Pennbrook University", "University of Philadelphia", "New York University"],
	answer: 1
},{
	question: "What year did Boy Meets World premier?",
	answerChoices: ["1993", "1990", "1991", "1994"],
	answer: 0
},{
	question: "How many seasons did the show run?",
	answerChoices: ["6", "8", "7", "9"],
	answer: 2
}]

// array of gifs to display with question
var gifArray = ['question1',
                  'question2',
                  'question3',
                  'question4',
                  'question5',
                  'question6',
                  'question7',
                  'question8',
                  'question9',
                  'question10',
                  'question11',
                  'question12',
                  'question13',
                  'question14',
                  'question15',
                ]

// variables for html elements
var currentQuestion
var correctAnswer
var incorrectAnswer
var unanswered
var seconds
var time
var answered
var userSelect

// variable for messages that show up when answers are chosen or game is over
var messages = {
    correct: `That's correct!!!`,
    incorrect: `Sorry, that's not right.`,
    endTime: `No more time!!`,
    finished: `Congrats you answered them all! Let's see how you did.`
}

// ajax to begin the game
$('#startBtn').on('click', function(){
	$(this).hide()
	newGame()
})

// ajax to start the game over and run newGame()
$('#startOverBtn').on('click', function(){
	$(this).hide()
	newGame()
})

// function to start an empty new game
function newGame(){
	$('#finalMessage').empty()
	$('#correctAnswers').empty()
	$('#wrongAnswers').empty()
	$('#notAnswered').empty()
	currentQuestion = 0
	correctAnswer = 0
	incorrectAnswer = 0
	unanswered = 0
	newQuestion()
}

function newQuestion(){
	$('#msg').empty()
	$('#correctedAnswer').empty()
	$('#gif').empty()
	answered = true
	
	//sets up new questions & answerChoices
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length)
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>')
	for(var i = 0; i < 4; i++){
		var choices = $('<div>')
		choices.text(triviaQuestions[currentQuestion].answerChoices[i])
		choices.attr({'data-index': i })
		choices.addClass('thisChoice')
		$('.answerChoices').append(choices)
	}
	countdown()
	//pauses time for answers
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index')
		clearInterval(time)
		answerPage()
	})
}

// sets up timer function
function countdown(){
	seconds = 15
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>')
	answered = true
	//timer goes down
	time = setInterval(showCountdown, 1000)
}

// displays the timer function
function showCountdown(){
	seconds--
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>')
	if(seconds < 1){
		clearInterval(time)
		answered = false
		answerPage()
	}
}

// answers
function answerPage(){
	$('#currentQuestion').empty()
	$('.thisChoice').empty()
	$('.question').empty()

    // game is working, unable to incorporate gifs correctly for some reason
	var rightAnswerText = triviaQuestions[currentQuestion].answerChoices[triviaQuestions[currentQuestion].answer]
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer
    // possibly where mistake is (wrong pathway)
	$('#gif').html(`<img src = "../images/"`+ gifArray[currentQuestion] +'.gif" width = "400px">')
	//checks for answer validity
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++
		$('#message').html(messages.correct)
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++
		$('#message').html(messages.incorrect)
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText)
	} else{
		unanswered++
		$('#message').html(messages.endTime)
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++
		setTimeout(newQuestion, 5000)
	}	
}

// shows score
function scoreboard(){
	$('#timeLeft').empty()
	$('#msg').empty()
	$('#correctedAnswer').empty()
	$('#gif').empty()

	$('#lastMsg').html(messages.finished)
	$('#correctAnswers').html("Correct Answers: " + correctAnswer)
	$('#wrongAnswers').html("Wrong Answers: " + incorrectAnswer)
	$('#notAnswered').html("Unanswered: " + unanswered)
	$('#startOverBtn').addClass('reset')
	$('#startOverBtn').show()
	$('#startOverBtn').html('Start Over???')
}