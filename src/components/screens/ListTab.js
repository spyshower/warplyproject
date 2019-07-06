import React from 'react'

import { Dimensions, View, Text, FlatList, StyleSheet } from 'react-native'

import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';

const paddingExtra = 0.01 * Dimensions.get('window').width


class ListTab extends React.Component {


  renderItem = ({ item }) => {

    return (
      <View style={styles.listItemContainer}>

        <View style={styles.listItemLeftContainer}>

          <View style={{ flex: 1 }}>
            <Text>{item.id}</Text>
          </View>

          <View style={{ flex: 5 }}>
            <Text>{item.address.length > 26 ? item.address.substring(0,25) + '...' : item.address}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text>{item.distance ? item.distance : ''}</Text>
          </View>

        </View>

      </View>
    )


  }

  render() {

    return (

      <View style={styles.container}>

        <FlatList
          data={this.props.places}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />

      </View>

    )

  }

}


const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (info) => {
      dispatch(addPlace(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTab)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 4 + paddingExtra,
    backgroundColor: 'yellow',
  },
  listItemLeftContainer: {
    flexDirection: 'row',
  },
  listItemDistanceContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
  }
})
