/**
 * xml파일 파싱 ==> 테이블로 표현하기
 * ★Element Log★
	console.log(arr);// [CD 가져오기] HTMLCollection(26) [CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD]
	console.log(arr.length);// [CD 개수 가져오기] 26
	console.log(★★★★★★★★★★★★★★★★★★★★★★★★★★★);
	console.log(arr[0].innerHTML); // [첫번째 CD HTML가져오기] <TITLE>Empire Burlesque</TITLE><ARTIST>Bob Dylan</ARTIST><COUNTRY>USA</COUNTRY><COMPANY/><PRICE>10.90</PRICE><YEAR>1985</YEAR>
	console.log(arr[0].getElementsByTagName("TITLE")); // [TITLE인 HTML 가져오기] HTMLCollection [TITLE]
	console.log(arr[0].getElementsByTagName("TITLE")[0]); // [HTML 가져오기] <TITLE>Empire Burlesque</TITLE>
	console.log(arr[0].getElementsByTagName("TITLE")[0].innerHTML); // [TITLE 내 값 가져오기] Empire Burlesque
	console.log(★★★★★★★★★★★★★★★★★★★★★★★★★★★);
	console.log(arr[0].children);//태그 가져오기 // [자식 태그 가져오기] HTMLCollection(6) [TITLE, ARTIST, COUNTRY, COMPANY, PRICE, YEAR]
	console.log(arr[0].childElementCount);// [자식 태그 개수 가져오기] 6
	console.log(arr[0].children[0].nodeName);// [첫번째 자식 태그의 태그명 가져오기] TITLE
	console.log(★★★★★★★★★★★★★★★★★★★★★★★★★★★);
	console.log(arr[0].children[0].innerHTML);// [첫번째 자식 태그 값 가져오기] Empire Burlesque 
	console.log(★★★★★★★★★★★★★★★★★★★★★★★★★★★);
	console.log(arrCount); // 부모 태그 중 제일 많은 자식 태그 수를 출력
	console.log(maxEle); // 자식 태그가 가장 많은 부모 태그 element를 가져옴
 */
  
function fnXmlTable(){
	$.ajax({
		url : "./cd_catalog1.xml"
		,dataType : "xml"
		,success : function(data){
			console.log(data);//#document
			makeAllList(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류발생");
		}
	});
}

// table 생성하기
function makeAllList(param){
	var arr = param.getElementsByTagName("CD");//$("CD",param); cd 개수
	//컬럼의 최대 카운트 개수 구하기
	var arrCount = 0;
	var maxEle;
	var tharr = []; // 가장 많은 자식을 소유한 부모 태그의 자식 태그 태그명 목록
	var str =   "<table class='test'><tr>";
	for(var i = 0 ; i < arr.length ; i++){
		var temp = arr[i].childElementCount;
		if(arrCount < temp){
			arrCount = temp;
			maxEle = arr[i];
		}
	}
	
	//가장 많은 자식을 가진 부모 태그 내 존재하는 자식 태그 목록을 th로 설정함.
	for(var i = 0 ; i < arrCount ; i++){
		str += "<th>" + maxEle.children[i].nodeName + "</th>" ;
		tharr.push(maxEle.children[i].nodeName); //노드 길이 세팅
	}
	
	str += "<tr>";
	for(var i = 0 ; i < arr.length; i++){//cd 개수
		str += "<tr>";
		var childMaxLength = arr[i].children.length;//자식 노드 최대 길이수 설정
		var childCount = 0;
		for(var j = 0 ; j < tharr.length ; j++){// 가장 많은 자식을 가진 부모 태그 내 존재하는 자식 태그 목록 길이
			// 삽입하려는 태그명이 tharr과 같은지 확인
			if(arr[i].children[childCount] == undefined){// 부모 태그 내 자식 태그가 없을 때
				str += "<td>undefined</td>";
				childCount++;
			}else{// 부모 태그 내 자식 태그가 있는 경우
				if(arr[i].children[childCount].nodeName == tharr[j]){// 태그 이름이 같으면
					if(arr[i].children[childCount].innerHTML == ""){// 해당 태그의 값이 공백이면
						str += "<td>empty</td>";
					}else{// 공백이 아니면
						str += "<td>" + arr[i].children[childCount].innerHTML + "</td>";
					}
					childCount++;
				}else{
					str += "<td>undefined</td>";
				}
			}
			if(childCount > childMaxLength){
				childCount--;
			}
		}
		
		console.log(test);
		
		/*//cd의 하위 요소만큼 돌림
		for(var j = 0 ; j < arr[i].childElementCount ; j++){
			console.log("■");
			console.log(arr[i].children[j]);
			if(arr[i].children[j].innerHTML == ""){
				str += "<td>empty</td>";
			}else{
				str += "<td>" + arr[i].children[j].innerHTML + "</td>";
			}
		}
		*/
		str += "</tr>";
		
//		return;//[요령] for문에서 1건만 찍도록 리턴사용
	}
	str += "<table>";
	console.log(str);
	$("#divResult").html(str);
	
	/*
	 향상된 for문
	 for(var obj of arr){
	 	console.log(obj);
	 	console.log($(obj).children());
	 	console.log($(obj).child().eq(0));
	 	console.log($(obj).children().eq(0).html());
	 }
	 
	 $.each()
	*/
}