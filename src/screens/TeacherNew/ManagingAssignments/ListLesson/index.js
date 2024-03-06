import { connect } from "react-redux"
import { ListLesson } from "./ListLesson"

const mapStateToProps = (state) => {
  return {
    listAssignManagent: state.AssignManagentReducer.listAssignManagent,
    listFavorite: state.FavoriteCurriculumReducer.listFavourite,

  }
}

export default connect(mapStateToProps)(ListLesson)