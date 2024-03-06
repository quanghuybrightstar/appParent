import { connect } from "react-redux"
import { ListTutorial } from "./ListTutorial"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent,
    managingTutorial: state.AssignReducer.managingTutorial

  }
}

export default connect(mapStateToProps)(ListTutorial)