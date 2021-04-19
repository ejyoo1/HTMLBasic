package kr.or.ddit.common.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.common.service.CodeService;
import kr.or.ddit.common.vo.CodeVO;

@WebServlet(name = "CodeServlet", urlPatterns = "/CodeServlet") // web.xml 에 서블릿 연결하는 것을 어노테이션으로 자동화
public class CodeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		super.doGet(req, resp); // 서버를 Debug모드로 돌리면 마우스 갖다댔을 때, 그 값이 뭔지 나옴(sysout 안찍어도 됨)
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			// 파라미터로 가져오기
			String groupCode = req.getParameter("groupCode"); //그룹코드로 코드 테이블 조회
			
			CodeVO codeVo = new CodeVO();
			codeVo.setGroupCode(groupCode);
			
			//Service 호출
			CodeService codeService = new CodeService();
//			codeService.retrieveCodeList(groupCode);
			List<CodeVO> list = codeService.retrieveCodeList(codeVo);
			System.out.println(list);
			
			//request에 담아 보내기
			req.setAttribute("list", list);
			RequestDispatcher disp = req.getRequestDispatcher("/html/common/codeListResult.jsp");
			disp.forward(req, resp);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
