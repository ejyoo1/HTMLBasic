/**
 * 1. 배치는 호출 흐름 순으로 기술
 * 2. 전역변수는 처음 줄에 모두 기술
 * 3. document.ready 작성
 * 4. document.ready 내 화면 초기화 작업들 진행
 */

$(document).ready(function(){
	/**
	 * 화면 초기화 작업 진행
	 * 1. 직업코드 조회 후 세팅 :  initJobSelect();
	 * 2. 기념일 코드 조회 후 세팅 : initMemorialSelect();
	 * 3. '광고 메일 수신 여부' 기본값 세팅 - 미수신
	 * 4. 취미 코드 세팅
	 * 5. 우편번호찾기화면 시 세팅
	 */
	 initJobSelect();
	 initMemorialSelect();
	 $("#recvEmailYnN").prop("checked", true);
	 initHobbyCheck();
	 initCitySelect();
	 
	 /*
	  $("#tbZipResult tbody").dbclick(function(){
	  }); // 동적으로 생성된 요소 포함하지 않음 (문서가 생성된 후 생긴 요소들에 대해서는 이벤트가 적용되지 않음)
	  */
	 
	 /*
	 $("#tbZipResult tbody tr").on("dblclick", function(){
		 
	 }); // 동적으로 생성된 요소 포함 클릭 이벤트 적용(바인딩)(문서가 생성된 후 생긴 요소들 포함하여 이벤트가 적용됨)
	 */
	 
	 $("#tbZipResult").on("dblclick", "tbody tr", function(){ // 파라미터를 더 주어 자식요소 필터링
		 console.log("바인딩");
		 // this ==> tr
//		 $(this).children();
		 var zipcode = $(this).children("td:eq(0)").text(); // 0번째  td 를 가져와서 텍스트
		 var addr = $(this).children("td:eq(1)").text();
		 
//		 console.log($(this));
//		 console.log($(this).children());
		 console.log(zipcode);
		 console.log(addr);
		 
		 // 메인화면 (부모창)의 우편번호, 주소 input에 데이터 세팅
		 $("#memZip").val(zipcode);
		 $("#memAdd1").val(addr);
		 
		 // 주소창(모달창) 닫기
		 $("#zipModal").modal("hide");
	 });
});

/** 직업 코드 조회하여 세팅*/
function initJobSelect(){ 
	$.ajax({
		url : "/JqueryPro/CodeServlet"
			,type : "post"
				,data : {"groupCode" : "A02"} // 직업 코드 조회
	,dataType : "json"
		,success : function(data){
			makeJobSelect(data);
			
		}
	,error : function(xhr){
		console.log(xhr);
		console.log("오류");
	}
	});
}

/** 기념일 셀렉트 박스 생성 */
function initMemorialSelect(){
	$.ajax({
		url : "/JqueryPro/CodeServlet"
			,type : "post"
				,data : {"groupCode" : "A03"} // 기념일 유형 조회
	,dataType : "json"
		,success : function(data){
			makeMemorialSelect(data);
		}
	,error : function(xhr){
		console.log(xhr);
		console.log("오류");
	}
	});
}

function initHobbyCheck(){
	$.ajax({
		url : "/JqueryPro/CodeServlet"
			,type : "post"
				,data : {"groupCode" : "A01"} // 취미 코드 조회
	,dataType : "json"
		,success : function(data){
			makeHobbyCheck(data);
		}
	, error : function(xhr){
		console.log(xhr);
		console.log("오류");
	}
	});
}

function initCitySelect(){
	$.ajax({
		url : "/JqueryPro/ZipServlet"
			,type : "post"
				,dataType : "json"
					,success : function(data){
						makeCitySelect(data);
					}
	,error : function(xhr){
		console.log(xhr);
		alert("오류");
	}
	});
}

/** 직업 셀렉트 박스 생성 */
function makeJobSelect(data){
	// 방법1)
// 	var strHtml = "";
// 	$("#memJob").html(); // <select>
	
	
// 	방법2) ★★★★★★★★★★
// 	$("#memJob").empty();
// 	$("#memJob").append(ele1);
// 	$("#memJob").append(ele2);

	var strHtml = '<option value="">선택하세요</option>';
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].value +'">' + data[i].name + '</option>';
	}
	$("#memJobs").html(strHtml);
}

function makeMemorialSelect(data){
	var strHtml = '<option value="">선택하세요</option>';
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].value +'">' + data[i].name + '</option>';
	}
	$("#memMemorialType").html(strHtml);
	
}

function makeHobbyCheck(data){
	var strHtml = "";
	for(var i = 0 ; i < data.length ; i++){
		strHtml += "<label class='checkbox-inline'>"
			    + "<input type='checkbox' value='" + data[i].value + "'>" + data[i].name
			    + "</label>";
	}
	$("#divHobby").html(strHtml);
}

function makeCitySelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].sido +'">' + data[i].sido + '</option>';
	}
	$("#city").html(strHtml);
	
	setGu();
	
	// 방법 2)
	// setGu();
	// 방법 3)
	// trigger로 change 이벤트 호출
}

function setGu(){
	var param = {
			'sido' : $("#city").val()
			,'flag' : 'GU'
			};
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			makeGugunSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}
	});
	
}

function makeGugunSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].gugun +'">' + data[i].gugun + '</option>';
	}
	$("#gu").html(strHtml);
	$("#gu").prop("disabled", false);
	
	setDong(); // 동 초기화
}

function setDong(){
	var param = {
		'sido' : $("#city").val()
		,'gugun' : $("#gu").val()
		,'flag' : 'DONG'
	};
	
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			makeDongSelect(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}	
	});
}

function makeDongSelect(data){
	var strHtml = "<option value=''>선택하세요</option>";
	for(var i=0 ; i<data.length ; i++){
		strHtml += '<option value="' + data[i].dong +'">' + data[i].dong + '</option>';
	}
	$("#dong").html(strHtml);
	$("#dong").prop("disabled", false);
}

function searchZipCode(){
	var sido = $("#city").val();
	var gu = $("#gu").val();
	var dong= $("#dong").val();
	
	var param = {
			'sido' : sido
			,'gugun' : gu
			,'dong' : dong
			,'flag' : 'SEARCH'
		};
	$.ajax({
		url : "/JqueryPro/ZipServlet"
		,type : "post"
		,data : param
		,dataType : "json"
		,success : function(data){
			makeZipTable(data);
		}
		,error : function(xhr){
			console.log(xhr);
			alert("오류");
		}	
	});
}

function makeZipTable(data){
	$('#divZipResult').show();
	$("#tbZipResult tbody").empty();
	
	  var str = "";
	  for(var i = 0 ; i < data.length ; i++){
//		  str += "<tr onclick='fntest1(\"" + data[i].sido + "\");'>" (비추천)
//		  str += "<tr onclick='fntest1(\"" + data + "\");'>"// html 에서 obj는 허용하지 않음. (비추천)
		  str += "<tr>" 
			  + "<td>" + data[i].zipcode + "</td>"
			  + "<td>" + data[i].sido + " " 
			  + data[i].gugun + " " 
			  + data[i].dong + " " 
			  + changeEmptyVal(data[i].bunji) + "</td>"
			  + "</tr>";
	  }
	  $("#tbZipResult tbody").html(str);
}

function fntest1(str1){
	console.log(str1);
}

function fntest2(str1, str2){
	console.log(str1);
	console.log(str2);
}

//ID 중복검사
function chkId(){
    var memId = $("#memId").val();
    
    if(isEmpty(memId)){
      alert("ID 값이 입력되지 않았습니다.");
      $("#memId").focus();
      $("#spMemId").text("ID 값이 유효하지 않습니다");
      $("#spMemId").show();
      return;
    }
    
    // 유효성 검사 - 영어 소문자와 숫자로 구성, 3글자 이상 10글자 이하
    var regExp = /^[a-z0-9]{3,10}$/;
    if(!regExp.test(memId)){ // 정규식 값에 맞는지 확인함.
      alert("ID 값이 유효하지 않습니다.");
      $("#memId").focus();
      $("#spMemId").text("ID 값이 유효하지 않습니다");
      $("#spMemId").show();
      return;
    }
    
    $.ajax({ // DB에서 중복검사 수행 
      url : "/JqueryPro/MemberServlet" // 서블릿 가져오기(jsp 통째로 넘어온 것)
      ,type : "post"
      ,data : {"memId" : memId, "flag" : "CHKID"} // 서블릿에게 행할 행위 명령
      ,dataType : "json"
      ,success : function(data){
        if(data.resultCnt == 0){
        	alert("사용 가능한 아이디 입니다.");
        	$("#spMemId").text("사용 가능한 아이디 입니다.");
        	$("#spMemId").show();
        }else if(data.resultCnt == 1){
        	alert("중복된 아이디 입니다.");
        	$("#spMemId").text("중복된 아이디입니다.");
        	$("#spMemId").show();
        }
      }
      ,error : function(xhr){
        console.log(xhr);
        alert("ID 중복 검사 중 오류가 발생했습니다.");
      }
    });
 }


///////////////////////////////////////////////////////////////
function openZip(){
	// 시 셀렉트 박스 조회하고 초기화
	initCitySelect();
	// 테이블 초기화
	$("#tbZipResult tbody").empty();
	// 주소창(모달창) 열기 - 부트스트랩의 모달 창 호출
	$("#zipModal").modal("hide");
}
////////////////////////////////////////////////////////////////


/** 회원정보 저장하기 */
function save(){
	// 회원 정보 유효성 체크
	var result = validate();
	if(!result) {
		return;
	}
	
	// 사용자 컨펌
	if(!confirm("저장하시겠습니까?")) {
		return;
	}
	
	// DB에 저장하는 ajax 호출
	$("#formFlag").val("C");
	// 폼을 전송하는 방법 : $("#fm").serialize() ==> json 텍스트 타입으로 알아서 싹다 가져감(input, select 요소만 가져감, 단 name이 존재해야 함. 이때 VO와 동일하게 써주면 좋음. 서버쪽에서 받을 떄 VO 명과 알아서 매핑해주는 util이 있음.)
	$.ajax({
		url : "/JqueryPro/MemberServlet"
		,type : "post"
		,data : $("#fm").serialize()
		,dataType : "json"
		,success : function(data){
			alert("저장되었습니다.");
			
			//페이지 이동
			changePage("/JqueryPro/html/member/memberList2.html");
		}
		, error : function(xhr){ // 사용자가 잘못한 것이 아니라 관리자가 처리해야 하는 오류
			alert("실패하였습니다. \n관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}

function changePage(strUrl){
	// 방법1
//	window.location.href = "/JqueryPro/html/member/memberList2.html"; // 직접 지정해주는 방법
	
	// 방법 2 ==> form submit
	var fm = document.getElementById("fm");
	fm.action = strUrl;// 서블릿을 호출하기도 함
	fm.method = "post";
	fm.submit();
}

function validate(){
	// 체크 로직
//	return false;
	
	// 체크가 끝나면
	return true;
}

