import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap, MyInput} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;

  const [jumlah, setJumlah] = useState('5000');
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
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
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View style={{flex: 1}}>
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
        <View
          style={{
            marginTop: (windowWidth / 15) * -1,
            backgroundColor: colors.white,
            flex: 1,
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {item.keterangan}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 15,
              color: colors.black,
            }}>
            {item.nama_barang}
          </Text>
          {/* <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.primary,
            }}>
            Rp. {new Intl.NumberFormat().format(item.harga * jumlah)} / Liter
          </Text> */}
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 10,
        }}>
        <MyInput
          onChangeText={val => setJumlah(val)}
          label="Masukan Jumlah Pesanan"
          value={jumlah}
        />
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
          Rp. {new Intl.NumberFormat().format(item.harga * jumlah)}
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
          title="PROSES PESANAN"
          warna={colors.primary}
          onPress={addToCart}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
