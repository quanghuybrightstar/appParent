import { connect } from "react-redux"
import { FavouriteLesson } from "./FavouriteLesson"

const mapStateToProps = (state) => {
    return {
        listFavorite: state.FavoriteCurriculumReducer.listFavourite,
    }
}

export default connect(mapStateToProps)(FavouriteLesson)