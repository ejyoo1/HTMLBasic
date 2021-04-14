<%@page import="kr.or.ddit.common.vo.CodeVO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
[
<%
// JSON 배열 생성

List<CodeVO> list = (List<CodeVO>) request.getAttribute("list");


for(int i = 0 ; i < list.size() ; i++){
	if(i > 0){
		%>,<%
	}
	
	String code = list.get(i).getCode();
	String codeName = list.get(i).getCodeName();
	%>
	 {
	   "value" : "<%= code %>",
	   "name" : "<%= codeName %>"
	 }
	<%
}

/*
[
 {"value" : "07", "name" : "군인"}
 ,{"value" : "08", "name" : "전업주부"}
 ,{"value" : "09"}
 ,{"value" : "10"}
]
*/
%>
]