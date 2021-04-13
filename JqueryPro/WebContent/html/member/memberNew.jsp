<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>Insert title here</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <!-- JS -->
  <script src="/JqueryPro/js/jquery-3.6.0.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="/JqueryPro/js/com/dditUtils.js?v=1"></script>
  <script type="text/javascript" src="/JqueryPro/js/member/memberNew.js?v=1"></script>
<!--     <script type="text/javascript" src="../../js/lib/moment.min.js"></script> -->
<!--     <script type="text/javascript" src="../../js/lib/daterangepicker.js"></script> -->
<!--     <script type="text/javascript" src="../../js/comm/ui.js"></script> -->

  <link rel="stylesheet" href="/JqueryPro/js/lib/jquery-ui.css">
<!--   <link rel="stylesheet" href="/resources/demos/style.css"> -->
<!--   <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
  <script src="/JqueryPro/js/lib/jquery-ui.js"></script>
  <script src="/JqueryPro/js/lib/datepicker-ko.js"></script>
  <script src="../../js/common/myutils.js"></script>
  
  
  <style type="text/css">
  body {background-color: #eaf0f7;color: #50649c;}
  .container .form-horizontal .form-group:first-child {
/*    border-top: 1px solid; */
    border-top: 1px solid rgb(80, 100, 156, .3);
    border-left: 1px solid rgb(80, 100, 156, .3);
    border-right: 1px solid rgb(80, 100, 156, .3);
  }
  .container .form-horizontal .form-group {
/*    border-bottom: 1px solid; */
    border-bottom: 1px solid rgb(80, 100, 156, .3);
    border-left: 1px solid rgb(80, 100, 156, .3);
    border-right: 1px solid rgb(80, 100, 156, .3);
    padding: 5px 0px;
    margin: 0 -15px;
    background-color: #f1f5fa;
      
      display: flex;
      align-items: center;
  }
  .container .form-horizontal .form-group .control-label {}
  .form-button {padding: 10px 0px;}
  .form-inline .form-inline-zip1 {width: 90px;}
  .form-inline .form-inline-zip2 {width: calc(100% - 90px - 54px);}
  .form-group-inner-down{width: 100%; margin-top: 5px;}
  .form-group-inner-down .form-control{width: 100%}
  .form-control1{width: 50%;}
  .form-control {padding-left: 16px;}
/*  .form-control:required {background:#fff url(../../images/bg-required.png) no-repeat left 7px center} */
  .form-control:disabled, .form-control[readonly] {background: #f2f5fa;}
  
  
  .form-control.singleDate {min-width:125px;padding-right:25px;background:#fff url(/JqueryPro/images/ico-date.png) no-repeat right 7px center}
/*  .form-control.singleDate:required {background:#fff url(../../images/bg-required.png) no-repeat left 7px center, url(../../images/ico-date.png) no-repeat right 5px center} */
  .form-group label.required {background: url(/JqueryPro/images/bg-required.png) no-repeat right 5px center}
  
  </style>
  
  <script type="text/javascript">
  $(document).ready(function(){
    
  });
  
  // [중복검사] 버튼에 클릭 이벤트
  function chkId1(){
    var memId = $("#memId").val();
    
    // 빈 값 확인     
    if(isEmpty(memId)) {
      alert("ID 값이 입력되지 않았습니다.");
      $("#memId").focus();
      $("#spMemId").show();
      return;
    }
    
    // 유효성 검사 - 영어소문자와 숫자로 구성. 3글자 이상 10글자 이하 
    var regExp = /^[a-z0-9]{3,10}$/;
    if(!regExp.test(memId)) {
      alert("ID 값이 유효하지 않습니다.");
      $("#memId").focus();
      $("#spMemId").show();
      return;
    }
    
    // DB에서 중복검사 수행
    $.ajax({
      url : "/JqueryPro/MemberServlet"
      ,type : "post"
      ,data : {"memId" : memId, "flag" : "CHKID"}
      ,dataType : "json"
      ,success : function(data){
        console.log(data);
        if(isEmpty(data.result)){
          $("#spMemId").html("중복된 ID가 존재합니다.");
          $("#spMemId").show();
        } else {
          $("#spMemId").hide();
        }
      }
      ,error : function(xhr){
        console.log(xhr);
        alert("ID 중복 검사 중 오류가 발생했습니다.");
      }
        
    });
    
  }
  
  </script>
  
  
</head>
<body>
  <!-- 본문영역 시작 -->
  <div class="container">
    <h2>회원 등록</h2>
    <form class="form-horizontal" id="fm">
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memId">ID</label>
        <div class="col-sm-10 form-inline">
          <input type="text" class="form-control" id="memId" placeholder="id를 입력하세요" name="memId" required>
          <button type="button" class="btn btn-default btn-sm" id="btnMemId" onclick="chkId1()">중복검사</button>
          <span id="spMemId" style="display: none;">영어 소문자와 숫자 사용 가능. 3~10자리</span>
          <input type="hidden" id="checkedMemId" >
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memName">이름</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control1" id="memName" placeholder="이름을 입력하세요" name="memName" required>
          <span id="spMemName" style="display: none;">영어 대문자와 한글 사용 가능. 2~20자리</span>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memPass">비밀번호</label>
        <div class="col-sm-10">
          <input type="password" class="form-control form-control1" id="memPass" placeholder="비밀번호를 입력하세요" name="memPass" required>
          <span id="spMemPass" style="display: none;">영어와 숫자를 포함한 8~15자리</span>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memPass">비밀번호 확인</label>
        <div class="col-sm-10">
          <input type="password" class="form-control form-control1" id="memPass1" placeholder="비밀번호를 입력하세요" name="memPass" required>
          <span id="spMemPass1" style="display: none;">비밀번호가 일치하지 않습니다.</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="control-label col-sm-2 required" for="memMail">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control form-control1" id="memMail" name="memMail" placeholder="email을 입력하세요" required>
          <span id="spMemMail" style="display: none;">이메일 형식이 바르지 않습니다.</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="control-label col-sm-2 required" for="memBir">생년월일</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control1 singleDate" id="memBir" name="memBir" placeholder="생년월일을 입력하세요" required>
          <span id="spMemBir" style="display: none;">생년월일 형식이 바르지 않습니다.</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="control-label col-sm-2 required" for="memHp">핸드폰번호</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control1" id="memHp" name="memHp" placeholder="핸드폰번호를 입력하세요" required>
          <span id="spMemHp" style="display: none;">핸드폰번호 형식이 바르지 않습니다.</span>
        </div>
      </div>
<!--      <div class="form-group"> -->
<!--        <label class="control-label col-sm-2" for="memBir">생년월일</label> -->
<!--        <div class="col-sm-4"> -->
<!--          <input type="text" class="form-control singleDate" id="memBir" name="memBir" placeholder="생년월일을 입력하세요" required> -->
<!--        </div> -->
<!--        <label class="control-label col-sm-2" for="memHp">핸드폰번호</label> -->
<!--        <div class="col-sm-4"> -->
<!--          <input type="text" class="form-control" id="memHp" name="memHp" placeholder="핸드폰번호를 입력하세요" required> -->
<!--        </div> -->
<!--      </div> -->
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memId">주소</label>
        <div class="col-sm-10 form-inline">
          <input type="text" class="form-control form-inline-zip1" id="memZip" name="memZip" readonly="readonly" required>
          <button type="button" class="btn btn-info btn-sm" id="btnAddr" onclick="openZip()">검색</button>
          <input type="text" class="form-control form-inline-zip2" id="memAdd1" name="memAdd1" readonly="readonly" required>
          <br>
          <div class="form-group-inner-down">
          <input type="text" class="form-control" id="memAdd2" name="memAdd2" placeholder="상세주소를 입력하세요" required>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2 required" for="memJob">직업</label>
        <div class="col-sm-5">
          <select class="form-control" id="memJob" name="memJob">
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memMemorial">기념일</label>
        <div class="col-sm-10 form-inline">
          종류 : <select class="form-control" id="memMemorial" name="memMemorial"></select>
          날짜 : <input type="text" class="form-control singleDate" id="memMemorialday" name="memMemorialday">
        </div>
      </div>
      
      <div class="form-group">
        <label class="control-label col-sm-2" for="recvEmail">광고메일</label>
        <div class="col-sm-10">
          <label class="radio-inline"><input type="radio" name="recvEmailYn" value="Y" checked>수신</label>
          <label class="radio-inline"><input type="radio" name="recvEmailYn" value="N" >미수신</label>
        </div>
<!--        <label class="control-label col-sm-2" for="memJob">직업</label> -->
<!--        <div class="col-sm-4"> -->
<!--          <select class="form-control" id="memJob" name="memJob"> -->
<!--          </select> -->
<!--        </div> -->
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="hobby">취미</label>
        <div class="col-sm-10" id="divHobby">
        </div>
          <input type="hidden" name="memLike" id="memLike">
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="memComment">비고</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5" id="memComment" name="memComment" maxlength="1000"></textarea>
        </div>
      </div>
      <input type="hidden" name="action" id="actionFm">
    </form>
    <div class="form-button text-center">
      <button type="button" class="btn btn-primary" onclick="save()">저장</button>
      <button type="button" class="btn btn-default" onclick="goList()">취소</button>
    </div>
  </div>
  
  <!-- 우편번호 검색 Modal -->
  <div class="modal fade" id="zipModal" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h5 class="modal-title">주소 검색</h5>
        </div>
        <div class="modal-body">
          시: <select id="city" onchange="setGu()">
            <option value="">선택하세요</option>
            <option value="대전">대전</option>
            <option value="세종">세종</option>
            <option value="충남">충남</option>
          </select>
          구: <select id="gu" onchange="setDong()" disabled="disabled">
            <option>선택하세요</option>
          </select>
          동: <select id="dong" disabled="disabled">
            <option>선택하세요</option>
          </select>
          <button type="button" onclick="searchZipCode()" id="btnZip">검색</button>
          <hr>
          <div id="divZipResult" style="display: none;">
            <table class="table table-striped" id="tbZipResult">
              <thead>
                <tr>
                  <th>우편번호</th>
                  <th>주소</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseZipModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
  
  <form id="tmpFm">
    <input type="hidden" name="action" id="actionTmlFm">
    <input type="hidden" name="memId" id="selectedMemId">
    <input type="hidden" name="targetUrl" id="targetUrl">
  </form>
  <!-- 본문영역 끝 -->

</body>
</html>