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
        .post('https://zavalabs.com/gobenk/api/transaksi.php', {
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

  const getDataTransaksi = (x = 'SEMUA') => {
    setStatus(x);
    console.log(x);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      axios
        .post('https://zavalabs.com/gobenk/api/transaksi.php', {
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
      }}>
      <View>
        <ScrollView
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
            onPress={() => getDataTransaksi('MENUNGGU KONFIRMASI')}
            style={{
              backgroundColor:
                status == 'MENUNGGU KONFIRMASI'
                  ? colors.primary
                  : colors.secondary,
              padding: 10,
              marginHorizontal: 5,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontFamily: fonts.secondary[600], color: colors.white}}>
              MENUNGGU KONFIRMASI
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getDataTransaksi('SEDANG DIPROSES')}
            style={{
              backgroundColor:
                status == 'SEDANG DIPROSES' ? colors.primary : colors.secondary,
              padding: 10,
              marginHorizontal: 5,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text
              style={{fontFamily: fonts.secondary[600], color: colors.white}}>
              SEDANG DIPROSES
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
        </ScrollView>
      </View>
      <ScrollView
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
                  navigation.navigate('ListDetail', item);
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
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.primary,
                      }}>
                      Rp. {item.total}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {item.status === 'SEDANG DIPROSES' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
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

              {item.status === 'MENUNGGU KONFIRMASI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      textAlign: 'center',
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                    }}>
                    MENUNGGU KONFIRMASI
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
