import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TextInput,
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
  console.log('render', route.params);
  const isFocused = useIsFocused();
  const [kirim, setKirim] = useState(route.params);

  const simpan = () => {
    console.log(kirim);
    if (kirim.nama_perusahaan.length === 0) {
      showMessage({
        message: 'Maaf Silahkan Masukan Nama Perusahaan',
      });
    } else {
      navigation.navigate('Bayar', kirim);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setKirim({
        ...kirim,
        nama_perusahaan: '',
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
    }
  }, [isFocused]);

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
            iconname="business"
            placeholder="Masukan nama perusahaan"
            value={kirim.nama_perusahaan}
            onChangeText={val =>
              setKirim({
                ...kirim,
                nama_perusahaan: val,
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
            multiline={true}
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
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingRight: 2.5, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                  left: 5,
                }}>
                Latitude
              </Text>
              <TextInput
                value={
                  route.params.latitude && route.params.latitude.toString()
                }
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.primary,
                }}
              />
            </View>
            <View style={{flex: 1, paddingLeft: 2.5, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.primary,
                  left: 5,
                }}>
                Longtitude
              </Text>
              <TextInput
                value={
                  route.params.longitude && route.params.longitude.toString()
                }
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.primary,
                }}
              />
            </View>
          </View>
          <MyButton
            title="Buka Maps"
            warna={colors.primary}
            Icons="map-outline"
            onPress={() => navigation.navigate('Map')}
          />
          <MyGap jarak={5} />
          <MyInput
            multiline={true}
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
