<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="kr">
<head>
<meta charset="UTF-8">
<title>회원 등록 화면</title>
<!--   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> -->
  <!-- JS -->
  <script src="/JqueryPro/js/jquery-3.6.0.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script type="text/javascript" src="/JqueryPro/js/common/myutils.js?v=1"></script>
  <script type="text/javascript" src="/JqueryPro/js/member/memberNew.js?v=1"></script>
</head>
<body>
<!-- keyup할 때마다 포맷팅을 바꿀 수 있는 이벤트가 있음 -->
  <div class="container">
    <h2>회원 등록 페이지</h2>
    <form class="form-horizontal" id="fm">
    
    
      <div class="form-group"><!-- start ID DIV -->
        <label class="control-label col-sm-2" for="memId">ID</label>
        <div class="col-sm-10 form-inline">
          <input type="text" class="form-control" id="memId"
            placeholder="id를 입력하세요" name="memId" required>
          <button type="button" class="btn btn-info btn-md" id="btnMemId" onclick="chkId()">중복검사</button>
          <span id="spMemId" style="display:none;">영어 소문자와 숫자 사용 가능. 3~10자리</span>
        </div>
      </div><!-- close ID DIV -->
      
      
      <div class="form-group"><!-- start 이름 DIV -->
        <label class="control-label col-sm-2" for="memName">이름</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memName"
            placeholder="이름을 입력하세요" name="memName" required>
          <span id="spMemName" style="display: none;">영어 대문자와 한글 사용 가능. 2~20자리</span>
        </div>
      </div><!-- close 이름 DIV -->
      
      
      <div class="form-group"><!-- start 비밀번호 DIV -->
        <label class="control-label col-sm-2" for="memPass">비밀번호</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memPass"
            placeholder="비밀번호를 입력하세요" name="memPass" required>
          <span id="spMemPass" style="display: none;">영어와 숫자를 포함한 8~15자리</span>
        </div>
      </div><!-- close 비밀번호 DIV -->
      <div class="form-group"><!-- start 비밀번호 확인 DIV -->
        <label class="control-label col-sm-2 required" for="memPass">비밀번호 확인</label>
        <div class="col-sm-10">
          <input type="password" class="form-control form-control1" id="memPass1" placeholder="비밀번호를 입력하세요" name="memPass1" required>
          <span id="spMemPass1" style="display: none;">비밀번호가 일치하지 않습니다.</span>
        </div>
      </div><!-- close 비밀번호 확인 DIV -->
      
      
      <div class="form-group"><!-- start 이메일 DIV -->
        <label class="control-label col-sm-2" for="memMail">이메일</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="memMail" name="memMail"
            placeholder="email을 입력하세요" required>
          <span id="spMemMail" style="display: none;">이메일 형식이 바르지 않습니다.</span>
        </div>
      </div><!-- close 이메일 DIV -->
      
      
      <div class="form-group">
        <label class="control-label col-sm-2" for="memBir">생년월일</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="memBir" name="memBir"
            placeholder="생년월일을 입력하세요" required>
          <span id="spMemBir" style="display: none;">생년월일 형식이 바르지 않습니다.</span>
        </div>
      </div><!-- 이메일 종료 -->
      
      <div class="form-group row">
        <label class="control-label col-sm-2 required" for="memHp">핸드폰번호</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control1" id="memHp" name="memHp" placeholder="핸드폰번호를 입력하세요" required>
          <span id="spMemHp" style="display: none;">핸드폰번호 형식이 바르지 않습니다.</span>
        </div>
      </div><!-- 핸드폰 번호 종료 -->
      
      
      <div class="form-group"><!-- 주소 시작 -->
        <label class="control-label col-sm-2 required" for="memId">주소</label>
        <div class="col-sm-10 form-inline">
          <input type="text" class="form-control form-inline-zip1" id="memZip" name="memZip" readonly="readonly" required>
          <!-- 모달 자동 오픈 메서드 적용 안한것 -->
          <button type="button" class="btn btn-info btn-small" data-toggle="modal" data-target="#zipModal">검색</button>
          <!-- 모달 자동 오픈 메서드 적용 한 것 -->
          <button type="button" class="btn btn-info btn-sm" onclick="openZip()">검색</button>
          <input type="text" class="form-control form-inline-zip2" id="memAdd1" name="memAdd1" readonly="readonly" required>
          <br>
          <div class="form-group-inner-down">
          <input type="text" class="form-control" id="memAdd2" name="memAdd2" placeholder="상세주소를 입력하세요" required>
          </div>
        </div>
      </div><!-- 직업 종료 -->
      
      <div class="form-group"><!-- 직업 시작 -->
        <label class="control-label col-sm-2" for="memJobs">직업</label>
        <div class="col-sm-10">
          <select class="form-control" id="memJobs" name="memJobs">
          </select>
        </div>
      </div><!-- 직업 끝 -->
      
      
      <div class="form-group"><!-- 기념일 시작 -->
        <label class="control-label col-sm-2" for="memMemorialType">기념일</label>
        <div class="col-sm-5">
          <select class="form-control" id="memMemorialType" name="memMemorialType">
          </select>
        </div>
	      <div class="col-sm-5">
	        <input type="text" class="form-control" id="memMemorialDate"
	          placeholder="Enter memMemorialDate" name="memMemorialDate">
	      </div>
      </div><!-- 기념일 종료 -->
      
      
      <div class="form-group"><!-- 광고메일 시작 -->
       <label class="control-label col-sm-2" for="recvEmail">광고메일</label>
       <div class="col-sm-10">
         <label class="radio-inline"><input type="radio" name="recvEmailYn" value="Y" checked>수신</label>
         <label class="radio-inline"><input type="radio" name="recvEmailYn" value="N" id="recvEmailYnN">미수신</label>
       </div>
      </div><!-- 광고메일 종료 -->
      
      <div class="form-group"><!-- 취미 시작 -->
       <label class="control-label col-sm-2" for="hobby">취미</label>
       <div class="col-sm-10" id="divHobby">
       </div><!-- js 삽입부분 -->
         <input type="hidden" name="memLike" id="memLike">
      </div><!-- 취미 종료 -->
      
      
      <div class="form-group"><!-- 비고 영역 : 비고영역은 글자수 제한을 두어야 함. (해킹 위험) -->
        <label class="control-label col-sm-2" for="memComment">비고</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="5" id="memComment" name="memComment" maxlength="1000"></textarea>
        </div>
      </div><!-- 비고 영역 종료 -->
      
<!--       <input type="hidden" name="action" id="actionFm"> -->
      <input type="hidden" name="flag" id="formFlag">
    </form>
    
    <!-- submit을 하지않고 ajax로 보낼것임 -->
    <!-- submit은 서버로 전송하고 바로 페이지를 변경하므로, 성공여부 실패 여부를 따지기 위해 ajax로 사용할것임. -->
    <div class="form-button text-center">
      <button type="button" class="btn btn-primary" onclick="save()">저장</button>
      <button type="button" class="btn btn-default" onclick="goList()">취소</button>
    </div>
  </div>
  
  <!-- disabled 속성을 주면 서버로 전송되지 않음. -->
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
<!--             <option value="대전">대전</option> -->
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
  <!-- 우편번호 검색 Modal End -->
  
  <form id="tmpFm">
    <input type="hidden" name="action" id="actionTmlFm">
    <input type="hidden" name="memId" id="selectedMemId">
    <input type="hidden" name="targetUrl" id="targetUrl">
  </form>
  <!-- 본문영역 끝 -->
</body>

</html>