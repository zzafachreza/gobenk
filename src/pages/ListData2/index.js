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

export default function ListData2({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
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
  });

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(res);

        axios
          .post('https://zavalabs.com/gobenk/api/transaksi2.php', {
            id_member: res.id,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
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
                margin: 5,
                borderRadius: 10,
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
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    Nomor Transaksi
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
                      fontSize: windowWidth / 25,
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
                    Tanggal
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.black,
                    }}>
                    {item.tanggal}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}></View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        // borderBottomRightRadius: 10,
                        // backgroundColor: colors.border,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.primary,
                        padding: 10,
                      }}>
                      Rp. {item.total}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor:
                    item.status == 'SEDANG DI ANTAR'
                      ? colors.secondary
                      : colors.primary,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                  }}>
                  {item.status}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
