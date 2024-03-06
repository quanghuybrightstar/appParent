import { connect } from "react-redux"
import { DetailCurriculum } from "./DetailCurriculum"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent
  }
}

export default connect(mapStateToProps)(DetailCurriculum)