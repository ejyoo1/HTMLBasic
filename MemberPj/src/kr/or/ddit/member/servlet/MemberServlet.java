package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet(name = "MemberServlet", urlPatterns = "/MemberServlet") // web.xml 에 서블릿 연결하는 것을 어노테이션으로 자동화
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp); // 서버를 Debug모드로 돌리면 마우스 갖다댔을 때, 그 값이 뭔지 나옴(sysout 안찍어도 됨)
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String flag = req.getParameter("flag"); 
		
		try {
			if("C".equals(flag)) { // 등록
				createMember(req);
				
				req.setAttribute("resultCnt",1);
				RequestDispatcher  disp = req.getRequestDispatcher("/jsp/common/checkResult.jsp"); // 결과를 받을 url 세팅
				disp.forward(req, resp);
			} else if("CHKID".equals(flag)) { //ID검사
				System.out.println("★★★★★★CHKID로 옴");
				
				MemberVO memberVo = checkMemberId(req);
				
				int resultCnt = 0;
				if(memberVo != null) {
					resultCnt = 1; // 중복된 ID가 있음
				}
				
				req.setAttribute("resultCnt", resultCnt);
				RequestDispatcher  disp = req.getRequestDispatcher("/jsp/common/checkResult.jsp"); // 결과를 받을 url 세팅(jsp 만들어서 데이터 받아서 처리)
				disp.forward(req, resp);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

	private MemberVO checkMemberId(HttpServletRequest req) throws SQLException {
		String memId = req.getParameter("memId");
		
		MemberService service = new MemberService();
		MemberVO memberVo = service.retrieveMember(memId);
		
		return memberVo;
	}

	private void createMember(HttpServletRequest req) throws Exception {
		// 맵으로 가져와 BeanUtils 를 사용하는 방법
		MemberVO memberVo = new MemberVO();
		//Map형태로 가져와 memberVO에 저장
		BeanUtils.populate(memberVo, req.getParameterMap()); // req.getParameterMap() request 에 원래 Map으로 들어와 있는것을 req.getParameter 로 가져옴. 
		System.out.println("★★★★★" + memberVo.getMemJob() + ", " + memberVo.getMemJobName());
		
		MemberService service = new MemberService();
		service.createMember(memberVo);
		
	}


}
