import { connect } from "react-redux"
import { LessonListTCScreen } from "./LessonListTCScreen"

const mapStateToProps = (state) => {
    return {
        listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    }
}

export default connect(mapStateToProps)(LessonListTCScreen)