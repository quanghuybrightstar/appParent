import { connect } from "react-redux"
import { ResultFilter } from "./ResultFilter"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent,
    listFavorite: state.FavoriteCurriculumReducer.listFavourite,

  }
}

export default connect(mapStateToProps)(ResultFilter)