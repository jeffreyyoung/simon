(function(){

	var randomStr = "";
	var inputStr = "";

	function nextLevel() {
		addToString();
		updateLevel();
		console.log(randomStr);
		animate();
		setTimeout(function() {
			acceptInput();
		}, 1000 * randomStr.length);
	}

	function gameOver() {
		randomStr = "";
			$('#current-level').html("You loooooose");
		setTimeout(function() {
			nextLevel();
		}, 3000);
	}

	function updateLevel(){
		$('#current-level').html(randomStr.length);
	}

	function addToString() {
		var newChar = Math.floor((Math.random()*4));
		randomStr = randomStr + newChar;
	}

	function doSetTimeOutAnimate(i, delayTime) {
		setTimeout(function() {
			var curChar = randomStr.charAt(i);
			var curBox = $("#box-" + curChar);
		    curBox.effect("highlight", {}, delayTime);
		}, delayTime * i);
	}

	function animate() {
		for (var i = 0; i < randomStr.length; i++) {
			doSetTimeOutAnimate(i, 1000);
		}
	}

	function acceptInput() {	
		for (var i = 0; i < 4; i++) {
			acceptInputClosure(i);
		}
	}
	function acceptInputClosure(i){
		var curBox = $("#box-" + i);
		jQuery.data(curBox, "data-num", i);
		curBox.css({"cursor":"pointer"});
		curBox.hover(function(){
			curBox.css({"background-color": "gray" });
		}, function(){
			curBox.css({"background-color": "none"});
		});
		curBox.click(function() {
			console.log(jQuery.data(curBox, "data-num"));
			inputStr = inputStr + jQuery.data(curBox, "data-num");
			if (inputStr.length == randomStr.length) {
				closeInput();
				if (validate() == true){
					inputStr = "";
					setTimeout(function() {
						nextLevel();
					}, 500);
				}
				else {
					inputStr = "";
					gameOver();
				}
			}
		});
	}

	function closeInput() {
		for (var i = 0; i < 4; i++) {
			var curBox = $("#box-" + i);
			curBox.css({"cursor":"default"});
			curBox.unbind("click");
			curBox.unbind("hover");
		}
	}

	function validate(){
		if (inputStr == randomStr)
			return true;
		else
			return false;
	}

	nextLevel();


})();
