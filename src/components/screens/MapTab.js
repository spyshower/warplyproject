import React from 'react'

import { Marker } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';

import { View, Text, StyleSheet } from 'react-native'

class MapTab extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      markers: [],
    }
  }

  componentDidMount = () => {

    let markers = []

    for (let i=0; i<this.props.places.length; i++) {

      markers.push({
        latlng: {
          latitude: Number(this.props.places[i].latitude),
          longitude: Number(this.props.places[i].longitude),
          // latitude: Number(this.props.places[i].latitude),
          // longitude: Number(this.props.places[i].longitude),
        },
        address: this.props.places[i].address,
        id: this.props.places[i].id
      })

    }

    this.setState({
      markers: markers,
    })

  }

  render() {


    return (

      <View style={styles.container}>

        <MapView
          // clustering={false}
          style={styles.map}
          region={{
            latitude: 40.6431833,
            longitude: 22.9311412,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >

          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.address}
            />
          ))}


        </MapView>

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

export default connect(mapStateToProps, mapDispatchToProps)(MapTab)


const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 map: {
   flex: 1,
 },
});
