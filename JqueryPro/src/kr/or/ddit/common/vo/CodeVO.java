package kr.or.ddit.common.vo;

/**
 * 입력값을 코드 값으로 관리하는데, 그때 사용하는 것이 CodeVo임
 * 배포하고 수정할 일이 더없음.
 * @author 유은지
 * 관련 DB table : TB_CODE
 */
public class CodeVO {
	private String groupCode;
	private String groupCodeName;
	private String code;
	private String codeName;
	private String description;
	private String useYn;
	
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	public String getGroupCodeName() {
		return groupCodeName;
	}
	public void setGroupCodeName(String groupCodeName) {
		this.groupCodeName = groupCodeName;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	
	
}
