/**
 * 1. 배치는 호출 흐름 순으로 기술
 * 2. 전역변수는 처음 줄에 모두 기술
 * 3. document.ready 작성
 * 4. document.ready 내 화면 초기화 작업들 진행
 */

var idFlag = false;
var runIdCheckFlag = false;
var runZipCheckFlag = false;
$(document).ready(function(){
	 initCitySelect();
	 
	 $("#tbZipResult").on("dblclick", "tbody tr", function(){ // 파라미터를 더 주어 자식요소 필터링
		 console.log("바인딩");
		 runZipCheckFlag = true;
		 var zipcode = $(this).children("td:eq(0)").text(); // 0번째  td 를 가져와서 텍스트
		 var addr = $(this).children("td:eq(1)").text();
		 
		 // 메인화면 (부모창)의 우편번호, 주소 input에 데이터 세팅
		 $("#memZip").val(zipcode);
		 $("#memAdd1").val(addr);
		 
		 // 주소창(모달창) 닫기
		 $("#zipModal").modal("hide");
	 });
	 
	 $("#memId").keydown(function(){ // 아이디 입력 시 check 초기화
		 console.log("키보드 입력 이벤트 발생");
		 $("#spMemId").text("");
		 idFlag = false;
		 runIdCheckFlag = false;
	 });
});


/**
 * ID 중복 검사
 * @returns 유효하지 않은 경우 ID 포커스 위치
 */
function chkId(){ 
	runIdCheckFlag = true;
    var memId = $("#memId").val();
    
    if(isEmpty(memId)){
      idFlag = false;
      alert("ID 값이 입력되지 않았습니다.");
      $("#memId").focus();
      $("#spMemId").text("ID 값이 유효하지 않습니다");
      $("#spMemId").show();
      return;
    }
    
    // 유효성 검사 - 영어 소문자와 숫자로 구성, 3글자 이상 10글자 이하
    var regExp = /^(?=.*[a-z])[a-z0-9]{4,20}$/; // 숫자 반드시 포함
    //^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{6,29}$
    if(!regExp.test(memId)){ // 정규식 값에 맞는지 확인함.
      idFlag = false;
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
        	idFlag = true;
        	alert("사용 가능한 아이디 입니다.");
        	$("#spMemId").text("사용 가능한 아이디 입니다.");
        	$("#spMemId").show();
        }else if(data.resultCnt == 1){
        	idFlag = false;
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

function openZip(){
	// 시 셀렉트 박스 조회하고 초기화
	initCitySelect();
	// 테이블 초기화
	$("#tbZipResult tbody").empty();
	// 주소창(모달창) 열기 - 부트스트랩의 모달 창 호출
	$("#zipModal").modal();
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

function reset(){
	$(":input").val("");
	
	$("#spMemName").hide();
	$("#spMemBir").hide();
	$("#spMemPass").hide();
	$("#spMemHp").hide();
	$("#spMemMail").hide();
	$("#spMemAdd2").hide();
}

/**
 * 회원 정보 저장 버튼 클릭 시
 * @returns 
 */
function save(){
	console.log("idFlag : " + idFlag);
	console.log("runIdCheckFlag : " + runIdCheckFlag);
	
	if(runIdCheckFlag && runZipCheckFlag){ // 중복검사와 우편번호를 모두 수행한 경우
		// 회원 정보 유효성 체크
		var result = validate();
		console.log("result : " + result);
		if(!result) {
			return;
		}
		// 사용자 컨펌
		if(!confirm("저장하시겠습니까?")) {
			return;
		}
	}else if(!runIdCheckFlag){
		alert("아이디 중복 검사는 필수입니다.");
		$("#btnMemId").focus();
		return;
	}else if(!runZipCheckFlag){
		alert("우편번호를 검색해주세요.");
		$("#memZipBtn").focus();
		return;
	}
}

function formSeting(str,spanId,focusId){
	alert(str);
	$(spanId).show();
    $(spanId).text(str);
    $(focusId).focus();
}

function validate(){ // 저장 버튼 클릭 시 유효성 검사
	$("#spMemName").hide();
	$("#spMemBir").hide();
	$("#spMemPass").hide();
	$("#spMemHp").hide();
	$("#spMemMail").hide();
	$("#spMemAdd2").hide();
	
	//정규식
	var userNameExp   = /^[가-힣]{2,5}$/;
	var userBirExp    = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	var userPwExp     = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_.]).{8,12}/;
	var userPhoneExp  = /^\d{3}-\d{3,4}-\d{4}$/;
	var userEmailExp  = 
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

	/** 이름 검사*/
    val = $("#memName").val();
    
	if(isEmpty(val)){ // 빈 값 체크
		var str = "이름은 필수 정보 입니다.";
		formSeting(str,"#spMemName","#memName");
        return false;
    }
	
    if(checkRegExp(userNameExp, val)){ // 정규식 체크(길이, 공백, 올바른 입력)
    	var str = "한글 2~5자를 입력해주세요.";
    	formSeting(str,"#spMemName","#memName");
        return false;
    }
    
    
    /** 생년월일 검사 */
    val = $("#memBir").val();
    
    if(isEmpty(val)){ // 빈 값 체크
    	var str = "생년월일은 필수 정보 입니다.";
    	alert(str);
    	formSeting(str,"#spMemBir","#memBir");
        return false;
    }
    
    if(checkRegExp(userBirExp, val)){ // 정규식 체크(길이, 공백, 올바른 입력)
    	var str = "올바른 생년월일을 입력하세요. (1993-12-06)";
    	alert(str);
    	formSeting(str,"#spMemBir","#memBir");
        return false;
    }
    
    var dateArr = val.split("-");
    console.log("dateArr : " + dateArr);
    var age = 18;
    var mydate = new Date();
    mydate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);

    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age);
    
    if ((currdate - mydate) < 0){
    	var str = "가입할 수 없는 연령입니다.";
        alert(str);
        formSeting(str,"#spMemBir","#memBir");
        return false;
    }
    
    /** 비밀번호 검사 */
    val = $("#memPass").val();
    
	if(isEmpty(val)){ // 빈 값 체크
		var str = "비밀번호는 필수 정보 입니다.";
    	alert(str);
    	formSeting(str,"#spMemPass","#memPass");
        return false;
    }
	
    if(checkRegExp(userPwExp, val)){ // 정규식 체크(길이, 공백, 올바른 입력)
    	var str = "영문 대소문자, 숫자, 특수문자 -_. 조합으로 8~12자를 입력해주세요.";
    	alert(str);
    	formSeting(str,"#spMemPass","#memPass");
        return false;
    }
    
    /** 휴대전화 검사 */
    val = $("#memHp").val();
    
	if(isEmpty(val)){ // 빈 값 체크
		var str = "휴대전화는 필수 정보 입니다.";
    	alert(str);
    	formSeting(str,"#spMemHp","#memHp");
        return false;
    }
	
    if(checkRegExp(userPhoneExp, val)){ // 정규식 체크(길이, 공백, 올바른 입력)
    	var str = "숫자로 구성된 올바른 휴대전화 번호를 입력해주세요.(000-0000-0000)";
    	alert(str);
    	formSeting(str,"#spMemHp","#memHp");
        return false;
    }
    
    /** 이메일 검사 */
    val = $("#memMail").val();
    
	if(isEmpty(val)){ // 빈 값 체크
		var str = "이메일은 필수 정보입니다.";
    	alert(str);
    	formSeting(str,"#spMemMail","#memMail");
        return false;
    }
	
    if(checkRegExp(userEmailExp, val)){ // 정규식 체크(길이, 공백, 올바른 입력)
    	var str = "올바른 이메일 형식을 입력해주세요.";
    	alert(str);
    	formSeting(str,"#spMemMail","#memMail");
        return false;
    }
    
    /** 상세주소 검사 */
    val = $("#memAdd2").val();
    
	if(isEmpty(val)){ // 빈 값 체크
		var str = "상세주소는 필수 정보입니다.";
    	alert(str);
    	formSeting(str,"#spMemAdd2","#spMemAdd2");
        return false;
    }
	
	if(!idFlag){
		alert("아이디 중복검사를 진행해주세요.");
	}
}

