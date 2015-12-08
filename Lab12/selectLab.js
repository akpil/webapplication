"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var lablable = $$("#labs>img");
	for(var i= 0; i < lablable.length; i++)
	{
		new Draggable(lablable[i], {revert: true});
	}
	Droppables.add("selectpad", {onDrop: labSelect});   
	Droppables.add("labs", {onDrop: labSelect}); 
	
	
	
	
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	//alert("droppe " +drag.alt +" & "+ drag.parentNode.id + " && "+ drop.id);
	
	if(drag.parentNode.id != drop.id){
		if(drop.id == "selectpad" && $$("#selectpad>").length < 3){
			var ol = $("selection");
			var li = document.createElement("li");
			li.innerHTML = drag.alt;
			
			ol.appendChild(li);
			drag.parentNode.removeChild(drag);
			$("selectpad").appendChild(drag);
			
			Effect.Pulsate(li, {delay:0.5, duration: 1.0});
		}
		else if(drop.id == "labs"){
			var li_list = $$("#selection>");
			for(var i =0; i < li_list.length; i++){
				if(li_list[i].innerHTML == drag.alt){
					var li = li_list[i];
					break;
				}
			}
			li.parentNode.removeChild(li);
			$("selectpad").removeChild(drag);
			$("labs").appendChild(drag);
		}
	}
	
	
		
	
	
	
	
	
	
	
	

}

