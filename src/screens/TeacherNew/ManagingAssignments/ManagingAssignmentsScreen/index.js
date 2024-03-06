import { connect } from "react-redux"
import { ManagingAssignmentsScreen } from "./ManagingAssignmentsScreen"

const mapStateToProps = (state) => {
    return {
        listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    }
}

export default connect(mapStateToProps)(ManagingAssignmentsScreen)