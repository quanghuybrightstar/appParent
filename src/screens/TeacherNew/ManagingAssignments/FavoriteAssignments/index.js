import { connect } from "react-redux"
import { FavoriteAssignment } from "./FavoriteAssignments"

const mapStateToProps = (state) => {
  return {
    listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    listAssignManagent: state.AssignManagentReducer.listAssignManagent,
  }
}

export default connect(mapStateToProps)(FavoriteAssignment)