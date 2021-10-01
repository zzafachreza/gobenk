import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  // Icon,
  Button,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyButton} from '../../components';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  let foto = '';
  if (user.foto === '') {
    foto = 'https:/zavalabs.com/avatar.png';
  } else {
    foto = user.foto;
  }

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      console.log('data users', res);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'blue',

          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: 150,
              elevation: 2,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 75,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: foto}}
              style={{width: 150, height: 150, borderRadius: 75}}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              fontFamily: fonts.secondary[600],
              top: 10,
              color: colors.black,
            }}>
            {user.nama_lengkap}
          </Text>
          <Divider style={{backgroundColor: colors.border, height: 1}} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.secondary[400],
              top: 10,
              color: colors.black,
            }}>
            {user.tlp}
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'green',
            flex: 1,
          }}>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: colors.success,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.white,
              }}>
              {user.tipe}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              E-mail
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.email}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              backgroundColor: colors.white,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              Alamat
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.alamat}
            </Text>
          </View>
          <MyButton
            title="Edit Profile"
            warna={colors.primary}
            Icons="person"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <Button
            onPress={handleSave}
            title="Sign Out"
            icon={
              <Icon
                style={{
                  marginRight: 5,
                }}
                name="sign-out"
                size={15}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: colors.secondary,
              height: 50,
              marginTop: '5%',
              borderRadius: 10,
              marginBottom: 20,
              padding: 20,
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
