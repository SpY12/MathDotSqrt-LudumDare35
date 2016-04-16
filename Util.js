function addScore(name, score){
	var queueScores = 0;
	queueScores++;
	setTimeout(function(){
		$(document).ready(function(){
			$.ajax({
				url: "php/savescores.php",
				type: "POST",
				data: {name: name, score: score},
				cache: false,
				success: function(response){
					$('#scoreCallback'.html(response));
				}
			}).done(function(){
				queueScores--;
			});
		});
	}, queueScores * 0.01);
}

function getDataJSON(){
	$.getJSON("php/data.json", function(data){
		$.each(data, function(k, val){
			console.log(k + " | " + val);
		})
	})
}

function randomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}