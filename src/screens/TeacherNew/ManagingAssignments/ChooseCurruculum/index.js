import { connect } from "react-redux"
import { ChooseCurruculum } from "./ChooseCurrulum"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent
  }
}

export default connect(mapStateToProps)(ChooseCurruculum)