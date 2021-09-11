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

import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function Bayar({navigation, route}) {
  const [data, setData] = useState(route.params);

  console.log('data dari bayar', data);
  const [loading, setLoading] = useState(false);
  // console.log('pembayaran', data);
  const [foto1, setfoto1] = useState(
    'http://mti.fti.upnyk.ac.id/asset/images/no-image.png',
  );

  const options = {
    includeBase64: true,
    quality: 0.5,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const UploadFoto = ({onPress1, onPress2, label, foto}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: foto,
          }}
          style={{
            width: '100%',
            aspectRatio: 2,
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.black}
              title="KAMERA"
              warna={colors.border}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };

  const simpan = () => {
    setLoading(true);
    console.log('kirim ke server last', data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/gobenk/api/transaksi_add.php', data)
        .then(res => {
          const kode = res.data.substring(0, 16);
          console.log('kode adalah', kode);
          setLoading(false);
          navigation.replace('ListView', {
            kode: kode,
          });
        });

      showMessage({
        type: 'success',
        message: 'Transaksi Berhasil, Terima kasih',
      });
    }, 1200);
    storeData('cart', false);
  };
  return (
    <>
      <SafeAreaView
        style={{
          padding: 10,
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                textAlign: 'center',
                fontSize: windowWidth / 25,
                color: colors.black,
              }}>
              Harap melakukan pembayaran 2 Jam dari sekarang
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: windowWidth / 25,
                color: colors.black,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Transfer Ke BANK :
            </Text>
            <Image
              source={require('../../assets/mandiri.png')}
              style={{width: 100, height: 30}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Nomor Rekening
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              1480017415012
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Atas Nama
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              PT. Manolo Berkah Energy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Total
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: windowWidth / 25,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Rp. {new Intl.NumberFormat().format(route.params.total)}
            </Text>
          </View>

          <UploadFoto
            onPress1={() => getCamera(1)}
            onPress2={() => getGallery(1)}
            label="Upload Bukti Pembayaran"
            foto={foto1}
          />
        </View>

        <View>
          <MyButton
            onPress={simpan}
            title="KONFIRMASI PEMBAYARAN"
            warna={colors.primary}
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </SafeAreaView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
