<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP(Java Server Page)</title>
</head>
<body>
<%
String str = "홍길동";
System.out.println("오잉");

request.setCharacterEncoding("UTF-8");//요청데이터 내 한글 깨짐 현상 처리

String userName = request.getParameter("userName");
System.out.println("userName : " + userName);
String userAge = request.getParameter("userAge");
System.out.println("userAge : " + userAge);
%>
  안녕하세요, '<span id="spUserName"><%= str %></span>' 씨
  올해로 '<span id="spUserAge"><%= str %></span>'살 이시군요~
</body>
</html>