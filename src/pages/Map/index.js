import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Slider,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
  Geojson,
} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts, windowWidth} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {MyButton} from '../../components';

export default function Map({navigation}) {
  let _map = null;
  let _carousel = null;
  const [currentLocation, setcurrentLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [radius, setRadius] = useState(1000);
  const [markers, setMarker] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [cor, setCor] = useState([]);

  useEffect(() => {
    locateCurrentPosition();
  }, []);

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));

      setcurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      });
      setCor({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setLoading(false);
    });
  };

  const onMarkerPressed = (location, index) => {
    console.log(location, index);
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });
    _carousel.snapToItem(index);
  };

  const onCarouselItemChange = index => {
    let location = coordinates[index];

    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    markers[index].showCallout();
  };

  const renderCarouselItem = ({item}) => (
    <View style={styles.cardContainer} key={item.id}>
      <Text style={styles.cardTitle}>{item.nama}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={currentLocation}>
        <Marker
          draggable={true}
          onDragEnd={e => {
            console.log('dragEnd', e.nativeEvent.coordinate);
            setCor(e.nativeEvent.coordinate);
          }}
          coordinate={{
            latitude: -6.928100233623593,
            longitude: 107.63772296840338,
          }}></Marker>
      </MapView>
      <View
        style={{
          // flex: 1,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            color: colors.white,
          }}>
          longitude: {cor.longitude}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            color: colors.white,
          }}>
          longitude: {cor.latitude}
        </Text>
      </View>

      <View
        style={{
          padding: 10,
          position: 'absolute',
          bottom: 0,
          width: windowWidth,
        }}>
        <MyButton
          onPress={() => navigation.navigate('Checkout', cor)}
          warna={colors.primary}
          title="Ambil Koordinat"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: '#274996',
    opacity: 0.8,
    height: 80,
    width: 300,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 24,
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
