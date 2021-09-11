import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap, MyInput, MyPicker} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang2({navigation, route}) {
  const item = route.params;

  navigation.setOptions({
    headerShown: false,
  });

  const [jumlah, setJumlah] = useState('5000');
  const [ongkir, setOngkir] = useState('0');
  const [user, setUser] = useState({});

  const [data, setData] = useState([
    {
      value: 0,
      label: 'Pilih Wilayah',
    },
    {value: 0, label: 'Bontang'},
    {value: 150, label: 'Marangkayu'},
    {value: 225, label: 'Muara Badak'},
    {value: 250, label: 'Sei Siring'},
    {value: 375, label: 'Samarinda'},
    {value: 200, label: 'Sangata'},
    {value: 225, label: 'Rantau Pulung'},
    {value: 400, label: 'Muara Wahau'},
    {value: 350, label: 'Pengadan'},
    {value: 275, label: 'Muara Kaman'},
    {value: 350, label: 'Kaubun'},
    {value: 450, label: 'Sangkulirang'},
    {value: 150, label: 'Tenggarong'},
    {value: 150, label: 'Jonggon'},
    {value: 150, label: 'Senoni'},
    {value: 250, label: 'Kembang Janggut'},
    {value: 300, label: 'Kota Bangun'},
    {value: 300, label: 'Resak'},
    {value: 500, label: 'Barong Tongkok'},
    {value: 150, label: 'Loa Kulu'},
    {value: 150, label: 'Bakungan'},
    {value: 150, label: 'Tanjung Laung'},
    {value: 150, label: 'Loa Buah'},
    {value: 150, label: 'Batuah'},
    {value: 150, label: 'Bukuan'},
    {value: 200, label: 'Samboja'},
    {value: 200, label: 'Dondang'},
    {value: 150, label: 'Balikpapan'},
    {value: 250, label: 'Babulu'},
    {value: 350, label: 'Long Kali'},
    {value: 400, label: 'Long Ikis'},
    {value: 500, label: 'Long Pinang'},
    {value: 600, label: 'Tanah Grogot / PPU'},
  ]);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
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
      harga: parseInt(item.harga) + parseInt(ongkir),
      total: jumlah * item.harga,
      foto: item.foto,
    };
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
        backgroundColor: colors.primary,
        position: 'relative',
      }}>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white,
            }}>
            Detail Produk
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
              width: '100%',
              aspectRatio: 1.5,
              // margin: 5,
            }}
            source={{
              uri: item.foto,
            }}
          />
        )}
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 23,
              color: colors.black,
              textAlign: 'center',
            }}>
            Minimal Pemesanan 50.000 Liter,
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 23,
              color: colors.black,
              textAlign: 'center',
              marginBottom: '10%',
            }}>
            Khusus Wilayah Bontang 5.000 Liter
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/iconbenk.png')}
                style={{width: 35, height: 35, left: 4}}
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 10,
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
                onChangeText={val => {
                  setJumlah(val);
                  if (val >= 5000 && val < 10000) {
                    setData([
                      {value: 0, label: 'Bontang'},
                      {value: 150, label: 'Marangkayu'},
                      {value: 225, label: 'Muara Badak'},
                      {value: 250, label: 'Sei Siring'},
                      {value: 375, label: 'Samarinda'},
                      {value: 200, label: 'Sangata'},
                      {value: 225, label: 'Rantau Pulung'},
                      {value: 400, label: 'Muara Wahau'},
                      {value: 350, label: 'Pengadan'},
                      {value: 275, label: 'Muara Kaman'},
                      {value: 350, label: 'Kaubun'},
                      {value: 450, label: 'Sangkulirang'},
                      {value: 150, label: 'Tenggarong'},
                      {value: 150, label: 'Jonggon'},
                      {value: 150, label: 'Senoni'},
                      {value: 250, label: 'Kembang Janggut'},
                      {value: 300, label: 'Kota Bangun'},
                      {value: 300, label: 'Resak'},
                      {value: 500, label: 'Barong Tongkok'},
                      {value: 150, label: 'Loa Kulu'},
                      {value: 150, label: 'Bakungan'},
                      {value: 150, label: 'Tanjung Laung'},
                      {value: 150, label: 'Loa Buah'},
                      {value: 150, label: 'Batuah'},
                      {value: 150, label: 'Bukuan'},
                      {value: 200, label: 'Samboja'},
                      {value: 200, label: 'Dondang'},
                      {value: 150, label: 'Balikpapan'},
                      {value: 250, label: 'Babulu'},
                      {value: 350, label: 'Long Kali'},
                      {value: 400, label: 'Long Ikis'},
                      {value: 500, label: 'Long Pinang'},
                      {value: 600, label: 'Tanah Grogot / PPU'},
                    ]);
                  } else if (val >= 10000) {
                    setData([
                      {value: 0, label: 'Bontang'},
                      {value: 125, label: 'Marangkayu'},
                      {value: 200, label: 'Muara Badak'},
                      {value: 225, label: 'Sei Siring'},
                      {value: 350, label: 'Samarinda'},
                      {value: 175, label: 'Sangata'},
                      {value: 200, label: 'Rantau Pulung'},
                      {value: 375, label: 'Muara Wahau'},
                      {value: 325, label: 'Pengadan'},
                      {value: 250, label: 'Muara Kaman'},
                      {value: 325, label: 'Kaubun'},
                      {value: 425, label: 'Sangkulirang'},
                      {value: 125, label: 'Tenggarong'},
                      {value: 125, label: 'Jonggon'},
                      {value: 125, label: 'Senoni'},
                      {value: 225, label: 'Kembang Janggut'},
                      {value: 275, label: 'Kota Bangun'},
                      {value: 275, label: 'Resak'},
                      {value: 475, label: 'Barong Tongkok'},
                      {value: 125, label: 'Loa Kulu'},
                      {value: 125, label: 'Bakungan'},
                      {value: 125, label: 'Tanjung Laung'},
                      {value: 125, label: 'Loa Buah'},
                      {value: 125, label: 'Batuah'},
                      {value: 125, label: 'Bukuan'},
                      {value: 175, label: 'Samboja'},
                      {value: 175, label: 'Dondang'},
                      {value: 125, label: 'Balikpapan'},
                      {value: 225, label: 'Babulu'},
                      {value: 325, label: 'Long Kali'},
                      {value: 375, label: 'Long Ikis'},
                      {value: 475, label: 'Long Pinang'},
                      {value: 575, label: 'Tanah Grogot / PPU'},
                    ]);
                  }
                }}
                placeholder="Masukan Jumlah Pesanan"
                value={jumlah}
                style={{
                  borderBottomWidth: 1,
                }}
              />
            </View>
          </View>

          <MyGap jarak={5} />
          <MyPicker
            onValueChange={val => setOngkir(val)}
            label="Zona Pengiriman"
            data={data}
            value={ongkir}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.white,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 12,
            color: colors.primary,
            textAlign: 'center',
          }}>
          Rp.{' '}
          {new Intl.NumberFormat().format(
            parseInt(item.harga) + parseInt(ongkir),
          )}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 35,
            color: colors.black,
            textAlign: 'center',
            marginTop: 10,
          }}>
          *) Harga sudah termasuk ongkos kirim dan PPN 10%
        </Text>
      </View>
      <View>
        <MyButton
          fontWeight="bold"
          radius={0}
          title={
            `Rp.` +
            new Intl.NumberFormat().format(
              (parseInt(item.harga) + parseInt(ongkir)) * jumlah,
            ) +
            ` -  PROSES PESANAN`
          }
          warna={colors.primary}
          onPress={addToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
