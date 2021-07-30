import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {fonts, windowWidth} from '../../utils/fonts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

export default function ListView2({route}) {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);

  const hideSpinner = () => {
    setVisible(false);
  };

  const createPDF = async (nama_file, html) => {
    let options = {
      html: html,
      fileName: 'GO_BENK_' + nama_file,
      directory: '',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    alert(file.filePath);
    // showMessage({
    //   type: 'success',
    //   message: 'Berhsil di simpan di ' + file.filePath,
    // });

    // navigation.navigate('MaterialReportDetail', {
    //   link: file.filePath,
    // });
  };
  const myUrl =
    `https://zavalabs.com/gobenk/api/inv.php?kode=` + route.params.kode;

  const myUrl2 =
    `https://zavalabs.com/gobenk/api/inv2.php?kode=` + route.params.kode;

  const sendServer = () => {
    axios.post(myUrl2).then(res => {
      console.log(res.data);
      createPDF(route.params.kode, res.data);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <WebView
        onLoad={hideSpinner}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); `}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: myUrl,
        }}
      />
      {visible && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            width: '100%',
            top: 0,
            opacity: 0.7,
            height: '100%',
          }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
      <TouchableOpacity
        onPress={sendServer}
        style={{
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: colors.primary,
        }}>
        <Icon type="ionicon" name="cloud-upload-outline" color={colors.white} />
        <Text
          style={{
            left: 10,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white,
          }}>
          ANTAR PESANAN
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
