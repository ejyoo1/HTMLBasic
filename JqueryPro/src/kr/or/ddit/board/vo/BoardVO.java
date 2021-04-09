package kr.or.ddit.board.vo;

/**
 * 
 * @author 유은지
 * - Table 당 VO 1개
 * - 데이터 가공 위한 변수도 VO에 추가 가능
 * - Table 내 존재하는 컬럼은 필수로 VO에 들어가야 함
 * - 컬럼 추가된 경우 getter Setter도 변수 순서대로 추가하는것이 좋음(Insertion point)
 * 
 * C + S + 'A'
 * C + S + 'Y'
 * S + 방향키 이동
 * A + S + 'S'
 * Getter Setter 생성
 */
public class BoardVO {
	private String boardId;
	private String boardTitle;
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}
}
