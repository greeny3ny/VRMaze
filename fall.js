console.log("leaderboard.js loaded!");

/**
	LEADERBOARD WRITING WITH 2 COLLIDERS
	BOX ID 1 = START BOX
	BOX ID 2 = END BOX
	PLAYER MOVES THROUGH START BOX, STARTS TIMER
	PLAYER MOVES THROUGH END BOX, TIMER ENDS, DATABASE UPDATED
	
	REQUIREMENTS :
	VARIABLE CALLED DB_REF
**/

var DB_REF = new Firebase("https://vrmaze-b0810.firebaseio.com");

readFBTimes();

AFRAME.registerComponent('leaderboard1',
{
  schema:
  { 
    jointCubeSize: {
      type: 'float',
      default: 0.275
    },
	box_id:
	{
		type: 'int'
	}
  },
  init: function ()
  {
    var self = this;
    var object = self.el.object3D;
	
    object.addBehavior(new altspace.utilities.behaviors.JointCollisionEvents
                       ({
      joints: [['Head', 'Center', 0]], jointCubeSize: self.data.jointCubeSize
    }));
	
    object.addEventListener('jointcollisionenter', handleJoin);		
    function handleJoin(event)
    {
		console.log("box " + self.data.box_id);
		if (self.data.box_id===2 && started){
			
			/**Do extra stuff in here!**/
			
			finaltime = time;
			times[0] = user;
			times[1] = finaltime;

			writeUserTimes();
			
			console.log("end");
			started = false;
		}	
		if (self.data.box_id === 1 && !started){
			
			/**Do extra stuff in here!**/
			
			time = 0;
			started = true;
		}	

		if (self.data.box_id === 4){
		
			console.log("cheat detected");
			
			//renders box on players hands when in wall to stop them teleporting
		
			document.querySelector('#wallCollideLeft').setAttribute('position', '-1 0 0');
			document.querySelector('#wallCollideLeft').setAttribute('scale', '0.2 2.5 2.5');
			document.querySelector('#wallCollideLeft').setAttribute('color', 'blue');
			document.querySelector('#wallCollideLeft').setAttribute('opacity', '0.5');
			document.querySelector('#wallCollideLeft').setAttribute('n-skeleton-parent', 'part: head');
			document.querySelector('#wallCollideLeft').setAttribute('altspace-cursor-collider', 'enabled: true');	
			document.querySelector('#wallCollideLeft').setAttribute('material', 'src:#b2; repeat:1 1;visible:true');
			
			document.querySelector('#wallCollideRight').setAttribute('position', '1 0 0');
			document.querySelector('#wallCollideRight').setAttribute('scale', '0.2 2.5 2.5');
			document.querySelector('#wallCollideRight').setAttribute('color', 'blue');
			document.querySelector('#wallCollideRight').setAttribute('opacity', '0.5');
			document.querySelector('#wallCollideRight').setAttribute('material', 'src:#b2; repeat:1 1;visible:true');
			document.querySelector('#wallCollideRight').setAttribute('n-skeleton-parent', 'part: head');
			document.querySelector('#wallCollideRight').setAttribute('altspace-cursor-collider', 'enabled: true');
			
			document.querySelector('#wallCollideFront').setAttribute('position', '0 0 -1');
			document.querySelector('#wallCollideFront').setAttribute('scale', '2.5 2.5 0.2');
			document.querySelector('#wallCollideFront').setAttribute('color', 'blue');
			document.querySelector('#wallCollideFront').setAttribute('opacity', '0.5');
			document.querySelector('#wallCollideFront').setAttribute('material', 'src:#b2; repeat:1.5 1.5;visible:true');
			document.querySelector('#wallCollideFront').setAttribute('n-skeleton-parent', 'part: head');
			document.querySelector('#wallCollideFront').setAttribute('altspace-cursor-collider', 'enabled: true');
			
			document.querySelector('#wallCollideTop').setAttribute('position', '0 1 0');
			document.querySelector('#wallCollideTop').setAttribute('scale', '2.5 0.2 2.5');
			document.querySelector('#wallCollideTop').setAttribute('color', 'blue');
			document.querySelector('#wallCollideTop').setAttribute('opacity', '0.5');
			document.querySelector('#wallCollideTop').setAttribute('material', 'src:#b2; repeat:1 1;visible:true');
			document.querySelector('#wallCollideTop').setAttribute('n-skeleton-parent', 'part: head');
			document.querySelector('#wallCollideTop').setAttribute('altspace-cursor-collider', 'enabled: true');
			
			document.querySelector('#wallCollideBottom').setAttribute('position', '0 -0.75 0');
			document.querySelector('#wallCollideBottom').setAttribute('scale', '2.5 0.2 2.5');
			document.querySelector('#wallCollideBottom').setAttribute('color', 'blue');
			document.querySelector('#wallCollideBottom').setAttribute('opacity', '0.5');
			document.querySelector('#wallCollideBottom').setAttribute('material', 'src:#b2; repeat:1 1;visible:true');
			document.querySelector('#wallCollideBottom').setAttribute('n-skeleton-parent', 'part: head');
			document.querySelector('#wallCollideBottom').setAttribute('altspace-cursor-collider', 'enabled: true');
		}
		
    }// end function handle join
	
	//joint collision leave
    object.addEventListener('jointcollisionleave', handleLeave);
    function handleLeave(event)
    {
		if (self.data.box_id === 4){
			console.log("bush collision ended")
			document.querySelector('#wallCollideLeft').setAttribute('scale', '0.1 0.1 0.1');
			document.querySelector('#wallCollideLeft').setAttribute('color', 'red');
			document.querySelector('#wallCollideLeft').setAttribute('position', '0 0 0');
			
			document.querySelector('#wallCollideRight').setAttribute('scale', '0.1 0.1 0.1');
			document.querySelector('#wallCollideRight').setAttribute('color', 'red');
			document.querySelector('#wallCollideRight').setAttribute('position', '0 0 0');
			
			document.querySelector('#wallCollideTop').setAttribute('scale', '0.1 0.1 0.1');
			document.querySelector('#wallCollideTop').setAttribute('color', 'red');
			document.querySelector('#wallCollideTop').setAttribute('position', '0 0 0');
			
			document.querySelector('#wallCollideBottom').setAttribute('scale', '0.1 0.1 0.1');
			document.querySelector('#wallCollideBottom').setAttribute('color', 'red');
			document.querySelector('#wallCollideBottom').setAttribute('position', '0 0 0');
			
			document.querySelector('#wallCollideFront').setAttribute('scale', '0.1 0.1 0.1');
			document.querySelector('#wallCollideFront').setAttribute('color', 'red');
			document.querySelector('#wallCollideFront').setAttribute('position', '0 0 0');
		}
    }//end function handle leave
  }
}); //end base collision

var time = 0;
var finaltime = 0;
var started = false;

var user;
var times=[];
var leaderBoard = [];
getUser1();

setInterval(tick, 100);
function tick(){
	time+=0.1;
	time = Math.round(time*10)/10;
	if (started){
		/**INSERT TEXT OBJECT HERE**/
		document.querySelector('#time').setAttribute('n-text','text: Your time is : ' + time);
	}
	else 
	{
		/**INSERT TEXT OBJECT HERE**/
		document.querySelector('#time').setAttribute('n-text','text: Your final time is : ' + finaltime);
	}
}

function writeUserTimes(){
	console.log("writing user times");
	DB_REF.child("times").push({times:times});
}

var isMod = false;
function getUser1(){
	altspace.getUser().then(function(user1){
		console.log(user1);
		user = user1.displayName;
		isMod = user1.isModerator;
		console.log(user);
		console.log(isMod);
	});
}

var test = [];
var counter = 0;
var top5_board = "";
var board = "";
function readFBTimes(){
	console.log("reading times...");
	DB_REF.child("times").on("child_added", function(snapshot){
		leaderBoard = snapshot.val();
		test[counter] = leaderBoard;
		counter ++;
		//console.log("counter" + counter);
	});
	DB_REF.child("times").on("value", function(snap) {
		//console.log("promise over");
		updateLeaderboard();
	});
}
function updateLeaderboard(){
	/**CHANGE TITLE OF BOARD HERE**/
	board="Highscores:";
	top5_board="Top 5:";
	//SORT TEST TIMES
	quickSort(0,test.length-1);
	
	/**
	CHOOSE WHAT SORT!
	
	REVERSE SORT
	(var i=test.length-1; i>=0;i--)
	NORMAL SORT
	(var i=0; i<test.length-1;i++)
	**/
	for (var i=0; i<test.length;i++){
		console.log(test[i].times);
		board = board + "\n" + (i+1) + ": " + test[i].times[0] + " " + test[i].times[1];
		
		if (i < 5){
			top5_board =  top5_board + "\n" + (i+1) + ": " + test[i].times[0] + " " + test[i].times[1];
		}
			
	}
	document.querySelector('#lb_top5').setAttribute('n-text','text:' + top5_board);
	document.querySelector('#leaderboard').setAttribute('n-text','fontSize:4; text:' + board);
};

//quickSORT!!!!! (nicked this online bc i cba writing it myself
function quickSort(left, right){
	console.log("sorting");
    var len = test.length, 
    pivot,
    partitionIndex;
    if(left < right){
		pivot = right;
		partitionIndex = partition(pivot, left, right);
		//sort left and right
		quickSort(left, partitionIndex - 1);
		quickSort(partitionIndex + 1, right);
	}
}
function partition(pivot, left, right){
	var pivotValue = test[pivot].times[1],
		partitionIndex = left;

	for(var i = left; i < right; i++){
		if(test[i].times[1] < pivotValue){
			swap(i, partitionIndex);
			partitionIndex++;
		}
  }
	swap(right, partitionIndex);
	return partitionIndex;
}
function swap(i, j){
	var temp = test[i];
	test[i] = test[j];
	test[j] = temp;
}

