import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MyCarouser2() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      go: 'Barang3',
      image: require('../../assets/sb1.png'),
      id: '19',
      nama_barang: 'Go Truck',
      harga: '9500',
      keterangan: 'Go Truck',
      foto: 'https://zavalabs.com/gobenk/upload/211002035029image%2052.png',
    },
    {
      go: 'Barang',
      image: require('../../assets/sb2.png'),
      id: '17',
      nama_barang: 'Go Bunker',
      harga: '9500',
      keterangan: 'Go Bunker',
      foto: 'https://zavalabs.com/gobenk/upload/211002034938image%2050.png',
    },
    {
      go: 'Barang2',
      image: require('../../assets/sb3.png'),
      id: '18',
      nama_barang: 'Go Ship',
      harga: '9500',
      keterangan: 'Go Ship',
      foto: 'https://zavalabs.com/gobenk/upload/211002035023image%2051.png',
    },
  ]);

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.go, item)}
      style={styles.cardContainer}
      key={item.id}>
      <Image
        source={item.image}
        style={{widht: 200, height: 100, resizeMode: 'cover'}}
      />
    </TouchableOpacity>
  );

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback>
        <ImageBackground
          key={item.id}
          resizeMode="contain"
          source={item.image}
          style={{
            height: Math.round((windowWidth * 9) / 14),
          }}
        />
      </TouchableNativeFeedback>
    );
  };

  return (
    <View>
      <View
        style={{
          padding: 10,
          marginBottom: 0,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: colors.primary,

            fontSize: 16,
          }}>
          INFORMASI LAYANAN
        </Text>
      </View>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
      />
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
