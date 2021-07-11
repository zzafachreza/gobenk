import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {color} from 'react-native-elements/dist/helpers';

export default function MyTerbaik() {
  useEffect(() => {
    // axios.get('https://zavalabs.com/mylaundry/api/barang.php').then(res => {
    //   console.log(res.data);
    //   setData(res.data);
    //   // setData(res.data.data);
    // });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: '1',
      nama_barang: 'FULL LAUNDRY',
      foto: require('../../assets/full.png'),
      menu: 'Search2',
    },
    {
      id: '2',
      nama_barang: 'SETRIKA',
      foto: require('../../assets/setrika.png'),
      menu: 'Search2',
    },
    {
      id: '3',
      nama_barang: 'CUCI',
      foto: require('../../assets/cuci.png'),
      menu: 'Search2',
    },
    {
      id: '4',
      nama_barang: 'BED COVER',
      foto: require('../../assets/bedcover.png'),
      menu: 'Search2',
    },
    {
      id: '5',
      nama_barang: 'BONEKA',
      foto: require('../../assets/boneka.png'),
      menu: 'Search2',
    },
    {
      id: '6',
      nama_barang: 'MENU ADMIN',
      foto: require('../../assets/Admin.png'),
      menu: 'Akses',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(item.menu, {
            key: item.nama_barang,
          })
        }
        activeOpacity={1.0}>
        <Image style={styles.image} source={item.foto} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              flex: 1,
              backgroundColor: colors.secondary,
              paddingHorizontal: 10,
              paddingVertical: 10,
              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              color: colors.white,
              textAlign: 'center',
            }}>
            {item.nama_barang}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: colors.primary,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon type="ionicon" name="grid" color={colors.white} size={16} />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              left: 10,
              fontSize: 16,
            }}>
            LAYANAN KAMI
          </Text>
        </View>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 0.5,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.black,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
