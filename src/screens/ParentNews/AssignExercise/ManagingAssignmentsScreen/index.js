import {connect} from 'react-redux';
import {ManagingAssignmentsParentScreen} from './ManagingAssignmentsParentScreen';

const mapStateToProps = state => {
  return {
    listFavorite: state.FavoriteCurriculumReducer.listFavourite,
  };
};

export default connect(mapStateToProps)(ManagingAssignmentsParentScreen);
