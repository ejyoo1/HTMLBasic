/**
 * bom_basic.html 에서 쓸 js
 */

var pop;
function proc1(){
	/*새창 띄우기*/
	pop = window.open("https://www.google.com");
// 	pop = open("https://www.google.com"); 'window' 생략 가능
}

function proc2(){
	/*창 닫기*/
	pop.close();
}
/*3초 후에 메시지 열기*/
function proc3(){
// 	widow.setTimeout();
//  setTimeout(호출할 함수~, 3000); 3초
	setTimeout(alertMsg, 3000);
}

function alertMsg(){
	alert("3초후에 뜨는 메시지");
}
/*3초후에 메시지 열기 - 무명함수*/
function proc4(){
//  widow.setTimeout();
//  setTimeout(호출할 함수~, 3000); 3초
    setTimeout(function (){
    	alert("타이머 썻어요");
    }, 3000);
}

/*색 랜덤으로*/
function proc5(){
    setInterval(changeColorbg, 100);
}

/*색 랜덤 설정*/
function changeColorbg(){
	//랜덤으로 색을 만들어서 p태그의 배경을 넣어주기
	//1. 랜덤 색 뽑기
	//2. p태그에 배경색 주기
	var r = 255; var g = 255; var b = 255;
	r = Math.floor(Math.random() * 255) + 1;
	g = Math.floor(Math.random() * 255) + 1;
	b = Math.floor(Math.random() * 255) + 1;
	document.getElementById("pInterval").style.backgroundColor = "rgb("+r+","+g+","+b+")";
}
