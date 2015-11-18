"use strict";
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;
var getScore = 0;
var maxScore = 0;

document.observe('dom:loaded', function(){
$("start").observe("click",stopToStart);
$("stop").observe("click",stopGame);
});
function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").innerHTML = "stop";
	var blocks = $$(".block");
	for(var i = 0; i < blocks.length; i++){
		if(blocks[i].hasClassName("selected")){
			blocks[i].removeClassName("selected");
		}
		if(blocks[i].hasClassName("target")){
			blocks[i].removeClassName("target");
		}
	}
	targetBlocks = [];
	selectedBlocks = [];
	timer=0;
	var getScore = 0;
	var maxScore = 0;
	$("answer").innerHTML = getScore+"/"+maxScore;
}

function startToSetTarget(){
	$("state").innerHTML = "ready";
	targetBlocks = [];
	selectedBlocks = [];
	timer=0;
	var getScore = 0;
	var blocks = $$(".block");
	var numarr = [];
	var checker = 0;
	for(var i = 0; i < numberOfTarget;){
		var rand = Math.floor(Math.random()*blocks.length);
		if(i == 0){
			targetBlocks.push(blocks[rand]);
			numarr.push(rand);
			i++;
			rand = Math.floor(Math.random()*9);
		}
		else{
			for(var j = 0; j <= i; j++)
			{
				if(numarr[j] == rand){
					checker = 1;
				}
			}
			if(checker == 0){
				numarr.push(rand);
				targetBlocks.push(blocks[rand]);
				i++;
			}
			checker = 0;
		}
	}
	setTimeout(setTargetToShow, interval);
}

function setTargetToShow(){
	$("state").innerHTML = "Memorize";
	for(var i = 0; i < numberOfTarget; i++){
		targetBlocks[i].addClassName("target");
	}
	setTimeout(showToSelect, interval);
}

function showToSelect(){
	$("state").innerHTML = "Select!";
	for(var i = 0; i < numberOfTarget; i++){
		targetBlocks[i].removeClassName("target");
	}
	$("blocks").observe("click", function(event){
		if(selectedBlocks.length >= numberOfTarget){}
		else{
			var checker = 0;
			var selected = event.element();
			for(var i = 0; i < selectedBlocks.length; i++){
				if(selected == selectedBlocks[i]){
					checker = 1;
				}
			}
			if(checker == 0){
				selectedBlocks.push(selected);
				selected.addClassName("selected");
			}
		}
	});
	setTimeout(selectToResult, interval);
}

function selectToResult(){
	$("state").innerHTML = "Checking";
	maxScore+=numberOfTarget;
	for(var i = 0; i < selectedBlocks.length; i++){
		selectedBlocks[i].removeClassName("selected");
		for(var j = 0; j < targetBlocks.length; j++){
			if(selectedBlocks[i] == targetBlocks[j])
			{
				getScore += 1;
			}
		}
	}
	
	$("answer").innerHTML = getScore+"/"+maxScore;
	$("blocks").stopObserving();
	
	setTimeout(startToSetTarget,interval);
}