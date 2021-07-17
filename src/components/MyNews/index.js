import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';

export default function MyCarouser2() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://zavalabs.com/gobenk/api/artikel_get.php').then(res => {
      setData(res.data);
      console.log('artikel get', data);
    });
  }, []);

  const [data, setData] = useState([]);

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('Artikel', item)}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            paddingBottom: 5,
            borderBottomColor: colors.border,
          }}>
          <View
            style={{
              width: 100,
              height: 70,
              borderRadius: 10,
              backgroundColor: 'red',
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: item.image}}
              style={{
                resizeMode: 'cover',
                height: 80,
                width: 100,
              }}
            />
          </View>
          <View style={{flex: 1, paddingLeft: 5}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              {item.judul}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.secondary,
              }}>
              {item.tanggal}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          marginTop: 10,
          marginBottom: 5,
          // justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}>
        <Icon
          type="ionicon"
          name="newspaper-outline"
          color={colors.primary}
          size={16}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: colors.primary,
            left: 10,
            fontSize: 16,
          }}>
          INFO BUAT KAMU
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList data={data} renderItem={_renderItem} />
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
    // position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: colors.black,
    opacity: 1,
    height: 100,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 50,
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
