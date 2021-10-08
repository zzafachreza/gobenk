import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyNews from '../../components/MyNews';
import MyKategori from '../../components/MyKategori';
import axios from 'axios';
import MyCarouser2 from '../../components/MyCarouser2';
import {useIsFocused} from '@react-navigation/native';

export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const images = [
    {
      image:
        'https://images.bisnis-cdn.com/posts/2019/09/27/1153079/rruk-dynamix2.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton8.jpg',
    },
  ];

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [cart, setCart] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        getData('token').then(res => {
          console.log('data token,', res);
          setToken(res.token);
        });
      });
      axios
        .post('https://zavalabs.com/gobenk/api/update_token.php', {
          id_member: user.id,
          token: token,
        })
        .then(res => {
          console.log('update token', res);
        });
    }

    // storeData('cart', false);
    getData('cart').then(res => {
      setCart(res);
      console.log('cart', res);
    });
  }, [isFocused]);

  let foto = '';
  if (user.foto === '') {
    foto = 'https:/zavalabs.com/avatar.png';
  } else {
    foto = user.foto;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <ScrollView>
        <View
          style={{
            height: 80,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={{
              width: 60,
              elevation: 2,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: foto}}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
          </TouchableOpacity>
          <View style={{flex: 1, paddingTop: 15, paddingLeft: 10}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.white,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 22,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="cart-outline" color={colors.white} />
            {cart && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: colors.danger,
                  position: 'absolute',
                  right: 15,
                  top: 15,
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        <MyCarouser />

        <MyKategori />
        <MyCarouser2 />
        {/* <MyTerbaik /> */}
        <MyNews />
      </ScrollView>
    </ImageBackground>
  );
}
