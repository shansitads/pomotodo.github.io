// Required variables
var curr_seconds = 25,
	curr_minutes = '00';
var minutes_interval, seconds_interval;
var isTimerOn, isTimerNew; // knows state of timer when it is paused (paused timer = false, new timer = true)

// Audio files
var click_sound = new Audio('click.mp3');
var bell = new Audio('bell.mp3');

// Starting template for the timer: set timer view as 25:00
function template() {
	curr_seconds = '00';
	curr_minutes = 25;
	document.getElementById('seconds').innerHTML = curr_seconds;
	document.getElementById('minutes').innerHTML = curr_minutes;
	isTimerNew = true;
	isTimerOn = false;
}

function playPause_clicked() {
	// toggle play vs pause
	var ppbtn = document.getElementById('playPauseButton');
	if (ppbtn.getAttribute('name') == 'play') {
		// toggle icon to pause
		ppbtn.name = 'pause';
		document.getElementById('playPauseIcon').className = 'fas fa-pause fa-2x';
		play();
	} else {
		// toggle icon to play
		stopTimer();
		isTimerNew = false;

		ppbtn.name = 'play';
		document.getElementById('playPauseIcon').className = 'fas fa-play fa-2x';
	}
}

function play() {
	if (isTimerNew) {
		// if a fresh timer is being started
		click_sound.play();

		// Change the minutes and seconds to starting time
		curr_minutes = 24;
		curr_seconds = 59;
		document.getElementById('minutes').innerHTML = curr_minutes;
		document.getElementById('seconds').innerHTML = curr_seconds;
	} else {
		// if a paused timer is being resumed
		// do nothing extra
	}

	// Start the countdown
	minutes_interval = setInterval(minutesTimer, 60000);
	seconds_interval = setInterval(secondsTimer, 1000);
	isTimerOn = true;
	isTimerNew = false;

	// Count down minutes
	function minutesTimer() {
		curr_minutes = curr_minutes - 1;
		document.getElementById('minutes').innerHTML = curr_minutes;
	}

	// Count down seconds
	function secondsTimer() {
		curr_seconds = curr_seconds - 1;
		document.getElementById('seconds').innerHTML = curr_seconds;

		// End session is zero is reached
		if (curr_seconds <= 50) {
			if (curr_minutes <= 24) {
				resetTimer();
				bell.play();
			}
			// Reset the session seconds to 60
			curr_seconds = 60;
		}
	}
}

function resetTimer() {
	isTimerNew = true;
	if (isTimerOn) {
		stopTimer();
	}
	template();
	// toggle playPause button
	document.getElementById('playPauseButton').name = 'play';
	document.getElementById('playPauseIcon').className = 'fas fa-play fa-2x';
	// !! add prompt: Are you sure you want to reset your timer?
}

function stopTimer() {
	clearInterval(minutes_interval);
	clearInterval(seconds_interval);
	isTimerOn = false;
	// add information about isTimerNew whenever stopTimer is called
}

function setDuration() {
	var duration = 25;
	askDuration();

	function askDuration() {
		duration = prompt('Enter number of minutes', 'Text');
		duration = parseInt(duration);
		if (isNaN(duration)) {
			alert('You have not input a number');
		}
	}
}
