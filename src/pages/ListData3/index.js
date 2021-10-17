import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('');

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    Ambildata();
    // console.log('list transaksi', obj.notification);
  });

  const Ambildata = () => {
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      axios
        .post('https://zavalabs.com/gobenk/api/transaksi2.php', {
          id_member: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  };

  useEffect(() => {
    getDataTransaksi();
  }, []);

  const getDataTransaksi = (x = 'SELESAI') => {
    setStatus(x);
    console.log(x);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      axios
        .post('https://zavalabs.com/gobenk/api/transaksi2.php', {
          id_member: res.id,
          status: x,
        })
        .then(res => {
          console.log('getTransaksi', res.data);
          setData(res.data);
        });
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginBottom: 10,
      }}>
      <View>
        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{padding: 10}}>
          <TouchableOpacity
            onPress={() => getDataTransaksi('SEMUA')}
            style={{
              backgroundColor:
                status == 'SEMUA' ? colors.primary : colors.secondary,
              padding: 10,
              marginHorizontal: 5,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontFamily: fonts.secondary[600], color: colors.white}}>
              SEMUA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => getDataTransaksi('SELESAI')}
            style={{
              backgroundColor:
                status == 'SELESAI' ? colors.primary : colors.secondary,
              padding: 10,
              marginHorizontal: 5,
              marginRight: 20,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontFamily: fonts.secondary[600], color: colors.white}}>
              SELESAI
            </Text>
          </TouchableOpacity>
        </ScrollView> */}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 10,

          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              key={item.id}
              style={{
                margin: 10,
                borderRadius: 5,
                overflow: 'hidden',
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('cek detail', item);

                  if (item.status == 'SELESAI') {
                    navigation.navigate('ListView4', item);
                  } else if (item.status == 'SEDANG DI ANTAR') {
                    navigation.navigate('ListView3', item);
                  } else {
                    navigation.navigate('ListView2', item);
                  }
                }}>
                <View
                  style={{
                    flex: 1,
                    padding: 5,

                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image
                      style={{
                        borderRadius: 10,
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={{uri: item.foto}}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      Nomor PO
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      {item.kode}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      Customer
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      {item.nama_pemesan}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30,
                        color: colors.black,
                      }}>
                      Customer
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                      }}>
                      {item.tanggal}
                    </Text>
                    {/* <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.primary,
                      }}>
                      Rp. {item.total}
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>

              {item.status === 'SEDANG DIPROSES' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.tertiary,
                      color: colors.white,
                      textAlign: 'center',
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                    }}>
                    SEDANG DIPROSES
                  </Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      axios
                        .post(
                          'https://zavalabs.com/gobenk/api/transaksi_hapus.php',
                          {
                            id_member: item.id_member,
                            kode: item.kode,
                          },
                        )
                        .then(res => {
                          axios
                            .post(
                              'https://zavalabs.com/gobenk/api/transaksi.php',
                              {
                                id_member: item.id_member,
                              },
                            )
                            .then(res => {
                              console.log(res.data);
                              setData(res.data);
                            });
                        });
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.danger,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                      }}>
                      Batalkan Transaksi
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}

              {item.status === 'SEDANG DI ANTAR' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.secondary,
                      color: colors.white,
                      textAlign: 'center',
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                    }}>
                    SEDANG DIANTAR
                  </Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      axios
                        .post(
                          'https://zavalabs.com/gobenk/api/transaksi_hapus.php',
                          {
                            id_member: item.id_member,
                            kode: item.kode,
                          },
                        )
                        .then(res => {
                          axios
                            .post(
                              'https://zavalabs.com/gobenk/api/transaksi.php',
                              {
                                id_member: item.id_member,
                              },
                            )
                            .then(res => {
                              console.log(res.data);
                              setData(res.data);
                            });
                        });
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.danger,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                      }}>
                      Batalkan Transaksi
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}

              {item.status === 'SELESAI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                    }}>
                    SELESAI
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
