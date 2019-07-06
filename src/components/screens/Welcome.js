import React from 'react'

import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native'

import Geolocation from '@react-native-community/geolocation';
import Permissions from 'react-native-permissions'

import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';


class Welcome extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      places: []
    }
  }

  componentDidMount = async () => {

    Permissions.request('location', { type: 'always' })
    .then(response => {
      console.log(response)

      return fetch('https://warply.s3.amazonaws.com/data/test_pois.json')
      .then((data) => data.json())
      .then((places) => {

        for (let i=0; i<places.length; i++) {
          if (!places[i].longitude) {
            places.splice(i, 1)
          }
        }

        let placesSorted = []

        if (response !== 'authorized') {

          this.showAlert()

          placesSorted = places.sort(function (a, b) {

             return a.address.localeCompare(b.address, 'gr');

          });

          this.props.add(placesSorted)

        }
        else {

          Geolocation.getCurrentPosition(currentPosition => {

            let temp
            for (let i=0; i<places.length; i++) {

              temp = this.getDistanceFromLatLonInKm(currentPosition.coords.latitude, currentPosition.coords.longitude, places[i].latitude, places[i].longitude)
              places[i].distance = Math.floor(temp)

            }

            placesSorted = places.sort( (a, b) => {
              return a.distance - b.distance
            })

            this.props.add(placesSorted)

          })

        }
      })
      .catch(error => {
        console.log('fetch error: ' + error)
      })
    })
    .catch(error => {
      console.log('permission error: ' + error)
    })

  }

  showAlert = () => {

    Alert.alert(
      'This is sad...',
      'Some functionality will not work :(',
      [
        {text: 'Okay'},
      ],
      {cancelable: false},
    );

  }

  getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {

    const R = 6371;
    const dLat = this.deg2rad(lat2-lat1)
    const dLon = this.deg2rad(lon2-lon1)
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c

    return d;
  }

  deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }


  render() {

    return (

      <View style={styles.container}>

        <View style={styles.mainContainer}>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Main')}>
            <Text>Navigate to the SuperCool Map</Text>
          </TouchableOpacity>

        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: 'rgb(42,208,88)',
  }

})
