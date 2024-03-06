import { connect } from "react-redux"
import { ManageAssign } from "./ManageAssign"

const mapStateToProps = (state) => {
    return {
        listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    }
}

export default connect(mapStateToProps)(ManageAssign)