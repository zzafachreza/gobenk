import React, {useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Chat() {
  useEffect(() => {
    axios.post('https://zavalabs.com/gobenk/api/company.php').then(res => {
      Linking.openURL('https://api.whatsapp.com/send?phone=' + res.data.tlp);
    });
  });

  return (
    <View>
      <Text>ini chat WA</Text>
    </View>
  );
}
