import { connect } from "react-redux"
import { ManagingTutorial } from "./ManagingTutorial"

const mapStateToProps = (state) => {
  return {
    listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    managingTutorial: state.AssignReducer.managingTutorial

  }
}

export default connect(mapStateToProps)(ManagingTutorial)