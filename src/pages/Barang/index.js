import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap, MyInput} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);

  const [cart, setCart] = useState(false);

  const [jumlah, setJumlah] = useState('5000');
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });

    getData('cart').then(res => {
      setCart(res);
    });

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const addToCart = () => {
    const kirim = {
      id_member: user.id,
      id_barang: item.id,
      nama_barang: item.nama_barang,
      qty: jumlah,
      harga: item.harga,
      total: jumlah * item.harga,
      foto: item.foto,
    };
    storeData('cart', true);
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/gobenk/api/barang_add.php', kirim)
      .then(res => {
        console.log(res);
        // navigation.navigate('Success2', {
        //   message: 'Berhasil Tambah Keranjang',
        // });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
        setCart(true);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            height: 50,
            // padding: 10,
            paddingRight: 10,
            backgroundColor: colors.primary,

            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="arrow-back" color={colors.white} />
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.white,
              }}>
              Detail Pesanan
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              padding: 10,
              position: 'relative',
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
                  right: 10,
                  top: 15,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          {!keyboardStatus && (
            <Image
              resizeMode="stretch"
              style={{
                // marginTop: (windowWidth / 5) * -1,
                width: '100%',
                aspectRatio: 1.5,
                // margin: 5,
              }}
              source={{
                uri: item.foto,
              }}
            />
          )}
          <Text
            style={{
              marginTop: '5%',
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.black,
              textAlign: 'center',
              marginBottom: '15%',
            }}>
            Minimal Pemesanan 5.000 Liter
          </Text>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/iconbenk.png')}
                style={{width: 35, height: 35}}
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 25,
                  color: colors.black,
                }}>
                Jumlah Pesanan
              </Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={val => setJumlah(val)}
                placeholder="Masukan Jumlah Pesanan"
                value={jumlah}
                style={{
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 12,
              color: colors.primary,
              textAlign: 'center',
            }}>
            Rp. {new Intl.NumberFormat().format(item.harga * jumlah)}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35,
              color: colors.black,
              textAlign: 'center',
              marginTop: 10,
            }}>
            *) Harga sudah termasuk ongkos kirim dan PPN 10%
          </Text>
        </View>
      </ScrollView>
      <View>
        <MyButton
          fontWeight="bold"
          radius={0}
          title="PROSES PESANAN"
          warna={colors.primary}
          onPress={addToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
