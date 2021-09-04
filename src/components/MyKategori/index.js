import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FadeInOut from 'react-native-fade-in-out';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IconCategory = ({img, title, onPress, image}) => {
  let imageFix = '';
  if (title == 'Go Bunker') {
    imageFix = require('../../assets/bunker.png');
  } else if (title == 'Go Ship') {
    imageFix = require('../../assets/ship.png');
  } else if (title == 'Go Truck') {
    imageFix = require('../../assets/truck.png');
  }

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          // flex: 1,
          width: windowWidth / 3.5,
          height: 120,

          // backgroundColor: '#F8781D',
          // backgroundColor: '#FFF',
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          // margin: 5,
          // borderWidth: 1,
          // borderColor: colors.secondary,

          // elevation: 2,
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Image
            source={imageFix}
            style={{
              resizeMode: 'contain',
              width: title == 'Go Bunker' ? 68 : 80,
              height: 80,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              // color: '#F8781D',
              color: colors.white,
              fontSize: windowWidth / 30,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function MyKategori() {
  const [comp, setComp] = useState({});
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.post('https://zavalabs.com/gobenk/api/company.php').then(res => {
      setComp(res.data);
      setInfo([
        {
          desc: res.data.nama,
        },
        {
          desc: res.data.deskripsi,
        },
        {
          desc: res.data.tw,
        },
      ]);
    });
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://zavalabs.com/gobenk/api/barang.php').then(res => {
      setDataKategori(res.data);
      console.log('artikel barang', res.data);
    });
  }, []);

  const [visible, setVisible] = useState(true);

  const [dataKategori, setDataKategori] = useState([]);

  const renderCarouselItem = ({item}) => (
    <Text
      style={{
        flex: 1,
        color: colors.white,
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 25,
        textAlign: 'center',
      }}>
      {item.desc}
    </Text>
  );

  return (
    <View
      style={{
        // margin: 10,
        padding: 10,
        // borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#046504',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        <Carousel
          loop={true}
          data={info}
          autoplay={true}
          autoplayDelay={4000}
          autoplayInterval={5000}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 20}
          removeClippedSubviews={false}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.primary,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        {dataKategori.map(item => {
          let tujuan = '';
          if (item.nama_barang == 'Go Bunker') {
            tujuan = 'Barang';
          } else if (item.nama_barang == 'Go Ship') {
            tujuan = 'Barang2';
          } else if (item.nama_barang == 'Go Truck') {
            tujuan = 'Barang3';
          }

          return (
            <IconCategory
              title={item.nama_barang}
              image={item.foto}
              onPress={() => navigation.navigate(tujuan, item)}
            />
          );
        })}
      </View>
    </View>
  );
}
