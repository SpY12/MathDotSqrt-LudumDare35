function addScore(name, score){
	var queueScores = 0;
	queueScores++;
	console.log("test")
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
}

function getDataJSON(){
	$.getJSON("data.json", function(data){
		$.each(data, function(k, val){
			console.log(k + " | " + val);
		})
	})
}

function endGame(){
	location.href = "http://www.jellotime.com";
}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}


var keyboard = new THREEx.KeyboardState();