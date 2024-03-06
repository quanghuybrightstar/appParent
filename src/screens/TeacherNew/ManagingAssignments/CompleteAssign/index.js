import { connect } from "react-redux"
import { CompleteAssign } from "./CompleteAssign"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent,
    listAssign: state.AssignReducer.listAssign,
    managingTutorial: state.AssignReducer.managingTutorial
  }
}

export default connect(mapStateToProps)(CompleteAssign)