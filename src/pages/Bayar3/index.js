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
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function Bayar3({navigation, route}) {
  const [data, setData] = useState({
    kode: route.params.kode,
  });
  const [company, setComapny] = useState({});
  const [kurir, setKurir] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foto1, setfoto1] = useState(
    'https://www.tomonet.co.id/asset/images/noimage-large.jpg',
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
              colorText={colors.black}
              warna={colors.primary}
            />
          </View>
        </View>
      </View>
    );
  };

  const simpan = () => {
    console.log('kirim ke server', data);
    setLoading(true);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/gobenk/api/inv_update2.php', data)
        .then(res => {
          console.log(res);
          setLoading(false);
          showMessage({
            type: 'success',
            message: 'Pesanan Berhasil Di Konfirmasi',
          });
          navigation.navigate('ListData2');
        });
    }, 1200);
  };

  useEffect(() => {
    getData('user').then(res => {
      setData({
        ...data,
        kurir: res.nama_lengkap,
      });
    });
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          padding: 10,
          flex: 1,
        }}>
        <ScrollView style={{flex: 1}}>
          <MyInput
            label="Nama Penerima"
            iconname="person"
            value={data.nama_penerima}
            onChangeText={val =>
              setData({
                ...data,
                nama_penerima: val,
              })
            }
          />
          <MyInput
            label="Jabatan / Hubungan"
            iconname="analytics"
            value={data.jabatan_penerima}
            onChangeText={val =>
              setData({
                ...data,
                jabatan_penerima: val,
              })
            }
          />
          <MyGap jarak={3} />
          <MyInput
            label="Nomor Telepon"
            iconname="call"
            value={data.hp}
            onChangeText={val =>
              setData({
                ...data,
                hp: val,
              })
            }
          />
          <MyGap jarak={3} />
          <MyInput
            label="Nomor Segel"
            iconname="documents"
            value={data.nomor_segel}
            onChangeText={val =>
              setData({
                ...data,
                nomor_segel: val,
              })
            }
          />
          <MyGap jarak={10} />
          <UploadFoto
            onPress1={() => getCamera(1)}
            onPress2={() => getGallery(1)}
            label="Upload Bukti Terima"
            foto={foto1}
          />
        </ScrollView>

        <View>
          {data.buktibayar && (
            <MyButton
              onPress={simpan}
              title="KONFIRMASI"
              warna={colors.danger}
              style={{
                justifyContent: 'flex-end',
              }}
            />
          )}
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
