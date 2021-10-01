import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Login,
  Register,
  Home,
  Account,
  Success,
  Berita,
  Tambah,
  Success2,
  ListDetail,
  Search,
  Kategori,
  ListData,
  Barang,
  Cart,
  Checkout,
  Bayar,
  Pemakaian,
  PemakaianTambah,
  BarangPemakaian,
  Akses,
  Bayar2,
  Search2,
  Laporan,
  Chat,
  Artikel,
  Barang2,
  Barang3,
  ListView,
  ListData2,
  ListView2,
  ListView3,
  Bayar3,
  ListView4,
  Map,
  EditProfile,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import {colors} from '../utils/colors';
import {getData} from '../utils/localStorage';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainApp = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getData('user').then(res => {
      console.log('user pada routes', res);
      setUser(res);
    });
  }, []);

  if (user.tipe == 'MEMBER') {
    return (
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Transaksi" component={ListData} />
        <Tab.Screen name="ChatWa" component={Chat} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab.Screen name="Pesanan" component={ListData2} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    );
  }
};

const ChatWA = () => {
  alert('jajaj');
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chat"
        component={ChatWA}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ListData"
        component={ListData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ListData2"
        component={ListData2}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pemakaian"
        component={Pemakaian}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PemakaianTambah"
        component={PemakaianTambah}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Success2"
        component={Success2}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Login',
          headerShown: false,

          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Search2"
        component={Search2}
        options={({route, navigation}) => ({
          title: 'Layanan',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({route, navigation}) => ({
          title: 'Edit Profile',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Kategori"
        component={Kategori}
        options={({route, navigation}) => ({
          title: 'Detail Pembantu',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({route, navigation}) => ({
          title: 'Keranjang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({route, navigation}) => ({
          title: 'Checkout',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar"
        component={Bayar}
        options={({route, navigation}) => ({
          title: 'PEMBAYARAN VIA TRANSFER',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar3"
        component={Bayar3}
        options={({route, navigation}) => ({
          title: 'KONFIRMASI PENGANTARAN',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Artikel"
        component={Artikel}
        options={({route, navigation}) => ({
          headerShown: false,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Bayar2"
        component={Bayar2}
        options={({route, navigation}) => ({
          title: 'PEMBAYARAN VIA COD',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Barang"
        component={Barang}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
      <Stack.Screen
        name="Barang2"
        component={Barang2}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
      <Stack.Screen
        name="Barang3"
        component={Barang3}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListView"
        component={ListView}
        options={({route, navigation}) => ({
          title: 'INVOICE',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.replace('MainApp')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 5,
                }}>
                <Icon type="ionicon" name="home-outline" color={colors.white} />
              </TouchableOpacity>
            </View>
          ),
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListView2"
        component={ListView2}
        options={({route, navigation}) => ({
          title: 'INVOICE FOR KURIR',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListView3"
        component={ListView3}
        options={({route, navigation}) => ({
          title: 'INVOICE',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListView4"
        component={ListView4}
        options={({route, navigation}) => ({
          title: 'INVOICE',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="BarangPemakaian"
        component={BarangPemakaian}
        options={({route, navigation}) => ({
          title: 'Detail Barang',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Akses"
        component={Akses}
        options={({route, navigation}) => ({
          title: 'Masukan Kode Akses',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="Tambah"
        component={Tambah}
        options={({route, navigation}) => ({
          title: 'TAMBAH',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />

      <Stack.Screen
        name="ListDetail"
        component={ListDetail}
        options={({route, navigation}) => ({
          title: 'LIST DETAIL',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
