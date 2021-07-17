import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';

export default function Checkout({navigation, route}) {
  const item = route.params;

  const [kirim, setKirim] = useState(item);

  const simpan = () => {
    console.log(item);

    navigation.navigate('Bayar', item);
  };

  const simpan2 = () => {
    console.log(item);

    navigation.navigate('Bayar2', item);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 10}}>
          <MyInput
            label="Nama Penerima"
            iconname="person"
            placeholder="Masukan nama penerima"
            value={kirim.nama_lengkap}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nama_lengkap: val,
              })
            }
          />

          <MyInput
            label="Nama Perusahaan"
            iconname="person"
            placeholder="Masukan nama perusahaan"
            value={kirim.company}
            onChangeText={val =>
              setKirim({
                ...kirim,
                company: val,
              })
            }
          />

          <MyGap jarak={5} />
          <MyInput
            label="Nomor Handphone"
            iconname="call"
            keyboardType="number-pad"
            placeholder="Masukan nomor telepon"
            value={kirim.nohp}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nohp: val,
              })
            }
          />
          <MyGap jarak={5} />
          <MyInput
            label="E-Mail"
            iconname="mail"
            placeholder="Masukan alamat email"
            value={kirim.email}
            onChangeText={val =>
              setKirim({
                ...kirim,
                email: val,
              })
            }
          />
          <MyGap jarak={5} />
          <MyInput
            label="Alamat Pengiriman"
            iconname="map"
            placeholder="Alamat Lengkap"
            value={kirim.alamat}
            onChangeText={val =>
              setKirim({
                ...kirim,
                alamat: val,
              })
            }
          />
          <MyGap jarak={5} />
          <MyInput
            label="Catatan Pembelian"
            iconname="map"
            placeholder="Catatan Pembelian"
            value={kirim.keterangan}
            onChangeText={val =>
              setKirim({
                ...kirim,
                keterangan: val,
              })
            }
          />
          <MyGap jarak={5} />
        </View>
        <View style={{padding: 10}}>
          <MyButton
            onPress={simpan}
            title="KONFIRMASI PEMBAYARAN"
            warna={colors.primary}
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
