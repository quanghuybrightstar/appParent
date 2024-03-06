/**
 * Infinity list components
 *
 * @summary Infinity list components
 * @author Thuan <nguyenbuiducthuan@gmail.com>
 *
 * Created at     : 2021-06-03 09:40:00
 * Last modified  : 2021-06-03 15:48:41
 */

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
// import PropTypes from 'prop-types';
import config from './config';

const {FETCH_STATUS, PAGE_LIMIT} = config;

class InfinityList extends React.Component {
  state = {
    fetchStatus: FETCH_STATUS.IDLE,
    data: [],
    pagination: {},
  };

  fetchedData = [];

  componentDidMount() {
    this.mounted = true;
    this.fetchNew();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchNew = async () => {
    const {fetchData, handleData} = this.props;
    const {fetchStatus} = this.state;
    if (fetchStatus !== FETCH_STATUS.IDLE) {
      return;
    }
    this.setState({
      data: [],
      pagination: {},
      fetchStatus: FETCH_STATUS.REFRESH,
    });
    const {data, pagination} = await fetchData(1, PAGE_LIMIT);
    if (this.mounted) {
      this.fetchedData = data;
      this.setState({
        data: handleData(this.fetchedData),
        pagination,
        fetchStatus: FETCH_STATUS.IDLE,
      });
    }
  };

  fetchNext = async () => {
    const {fetchStatus, pagination: currentPagination} = this.state;
    if (fetchStatus !== FETCH_STATUS.IDLE) {
      return;
    }
    if (
      currentPagination?.current_page >= currentPagination?.total_pages_count
    ) {
      return;
    }
    const {fetchData, handleData} = this.props;
    this.setState({fetchStatus: FETCH_STATUS.LOAD_MORE});
    const {data: incomeData, pagination} = await fetchData(
      currentPagination.next_page || 1,
      PAGE_LIMIT,
    );

    if (this.mounted) {
      this.fetchedData = [...this.fetchedData, ...incomeData];
      this.setState({
        data: handleData(this.fetchedData),
        pagination,
        fetchStatus: FETCH_STATUS.IDLE,
      });
    }
  };

  onRefresh = () => {
    this.fetchNew();
  };

  onEndReached = () => {
    this.fetchNext();
  };

  // keyExtractor = item => `${item.id}`;

  renderListEmpty = () => {
    const {emptyMessage = ' Not found', ListEmptyComponent} = this.props;
    const {fetchStatus} = this.state;
    if (fetchStatus === FETCH_STATUS.IDLE) {
      if (ListEmptyComponent) {
        return ListEmptyComponent;
      }
      return (
        <View>
          <Text>{emptyMessage}</Text>
        </View>
      );
    }

    return null;
  };

  renderFooter = () => {
    const {fetchStatus} = this.state;
    if (fetchStatus === FETCH_STATUS.LOAD_MORE) {
      return <ActivityIndicator size="large" />;
    }
    return null;
  };

  render() {
    const {fetchData, handleData, ...rest} = this.props;
    const {data, fetchStatus} = this.state;
    return (
      <FlatList
        {...rest}
        data={data}
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            refreshing={fetchStatus === FETCH_STATUS.REFRESH}
          />
        }
        onEndReached={this.onEndReached}
        ListEmptyComponent={this.renderListEmpty()}
        ListFooterComponent={this.renderFooter()}
      />
    );
  }
}
// TODO: temp disable this because this project do not use prop-types
// InfinityList.propTypes = {
//   onEndReachedThreshold: PropTypes.number,
//   fetchData: PropTypes.func.isRequired,
//   renderItem: PropTypes.func.isRequired,
//   emptyMessage: PropTypes.string,
//   handleData: PropTypes.func,
//   ListEmptyComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
// };

InfinityList.defaultProps = {
  onEndReachedThreshold: 0.2,
  emptyMessage: '',
  handleData: (data) => data,
  ListEmptyComponent: undefined,
};

export default InfinityList;
