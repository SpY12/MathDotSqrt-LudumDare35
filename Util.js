var score = 0;

/*function addScore(name, score){
	var queueScores = 0;
	queueScores++;
	setTimeout(function(){
		$.ajax({
			url: "savescores.php",
			type: "POST",
			data: { name: name, score: score },
			cache: false,
			success: function(response) {
				$('#fromAjax').html(response);
			}
		}).done(function(){
			queueScores--;
		});
	}, queueScores * 0.01);
}*/

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
	//location.href = "http://www.jellotime.com";

	createText("You died!", 10, getCamera().position.x, getCamera().position.y, 100);
	createText("Your score is: " + getScore(), 10, getCamera().position.x, getCamera().position.y - 10, 100);

	createText("Play Again", 10, getCamera().position.x, getCamera().position.y - 20, 100);
	createText("Submit Score", 10, getCamera().position.x, getCamera().position.y - 30, 100);
}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}


var keyboard = new THREEx.KeyboardState();