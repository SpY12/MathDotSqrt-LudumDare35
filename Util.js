var score = 0;

function getScore(){
	return score;
}

function getDataJSON(){
	$.getJSON("data.json", function(data){
		$.each(data, function(k, val){
			console.log(k + " | " + val);
		})
	})
}

function deathScreen(){
	location.href = "scoresheet.html";

	createText("You died!", 10, getCamera().position.x, getCamera().position.y, 100);
	createText("Your score is: " + getScore(), 10, getCamera().position.x, getCamera().position.y - 12, 100);

	createText("Play Again", 10, getCamera().position.x, getCamera().position.y - 24, 100);
	createText("Submit Score", 10, getCamera().position.x, getCamera().position.y - 36, 100);

  	(function(global) {
		global.localStorage.setItem("score", getScore());
		console.log(global.localStorage.getItem("score"));
	}(window));

	/*if(playAgain){
		var queueScores = 0;
		queueScores++;
		setTimeout(function(){
			$.ajax({
				url: "savescores.php",
				type: "POST",
				data: { name: "anonymous", score: getScore() },
				cache: false,
				success: function(response) {
					$('#fromAjax').html(response);
				}
			}).done(function(){
				queueScores--;
			});
		}, queueScores * 0.01);
	}*/

}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}