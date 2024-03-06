import { connect } from "react-redux"
import { CourseFilterResultScreen } from "./CourseFilterResultScreen"

const mapStateToProps = (state) => {
    return {
        listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    }
}

export default connect(mapStateToProps)(CourseFilterResultScreen)