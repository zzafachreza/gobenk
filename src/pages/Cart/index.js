import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';

import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Cart({navigation, route}) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        __getDataBarang(res.id);
      });
    }
  }, [isFocused]);

  const __getDataBarang = id_member => {
    axios
      .post('https://zavalabs.com/gobenk/api/cart.php', {
        id_member: id_member,
      })
      .then(res => {
        if (res.data.length == 0) {
          console.log('data barang,', res.data);
          setData(res.data);
          storeData('cart', false);
        } else {
          console.log('data barang,', res.data);
          setData(res.data);
        }
      });
  };

  const hanldeHapus = (id, id_member) => {
    console.log(id + id_member);

    Alert.alert('Go - Benk', 'Apakah Anda yakin akan hapus ini ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          axios
            .post('https://zavalabs.com/gobenk/api/cart_hapus.php', {
              id: id,
              id_member: id_member,
            })
            .then(res => {
              console.log('delete', res);
              __getDataBarang(id_member);
            });
        },
      },
    ]);
  };

  const tambah = (id, id_member) => {
    axios
      .post('https://zavalabs.com/gobenk/api/cart_add.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        __getDataBarang(id_member);
      });
  };

  const kurang = (id, id_member) => {
    axios
      .post('https://zavalabs.com/gobenk/api/cart_min.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        __getDataBarang(id_member);
      });
  };

  var sub = 0;
  data.map(item => {
    sub += parseFloat(item.total);

    console.log(sub);
  });

  const __renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: colors.border,
          elevation: 1,
          padding: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              borderRadius: 10,
              width: windowWidth / 4,
            }}
            source={{uri: item.foto}}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{fontFamily: fonts.secondary[600]}}>
              {item.nama_barang}
            </Text>

            <Text style={{fontFamily: fonts.secondary[600], flex: 1}}>
              Harga : {new Intl.NumberFormat().format(item.harga)}
            </Text>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => kurang(item.id, item.id_member)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  elevation: 2,
                  backgroundColor: colors.border,
                  borderRadius: 10,
                }}>
                <Text>
                  <Icon
                    type="ionicon"
                    name="remove"
                    size={20}
                    color={colors.black}
                  />
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text>{item.qty}</Text>
              </View>
              <TouchableOpacity
                onPress={() => tambah(item.id, item.id_member)}
                style={{
                  justifyContent: 'center',
                  elevation: 2,
                  alignItems: 'center',
                  padding: 5,
                  backgroundColor: colors.border,
                  borderRadius: 10,
                }}>
                <Text>
                  <Icon
                    type="ionicon"
                    name="add"
                    size={20}
                    color={colors.black}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, item.id_member)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={18}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                margin: 5,
                fontSize: windowWidth / 23,
              }}>
              {new Intl.NumberFormat().format(item.total)}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}></View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{padding: 10, flex: 1}}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: windowWidth / 15,
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          TOTAL
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 13,
            fontFamily: fonts.secondary[600],
            color: colors.primary,
          }}>
          Rp. {new Intl.NumberFormat().format(sub)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Checkout', {
            total: sub,
            id_member: user.id,
            nama_lengkap: user.nama_lengkap,
            nohp: user.tlp,
            email: user.email,
            nama_perusahaan: user.nama_perusahaan,
            alamat: user.alamat,
          })
        }
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          padding: 25,
          marginTop: '10%',
          marginBottom: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.secondary[600],
            color: 'white',
          }}>
          CHECKOUT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MainApp')}
        style={{
          backgroundColor: colors.primary,
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.secondary[600],
            color: 'white',
          }}>
          LANJUT BELANJA
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
