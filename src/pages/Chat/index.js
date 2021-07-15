import React from 'react';
import {View, Text, Linking} from 'react-native';

export default function Chat() {
  Linking.openURL('https://api.whatsapp.com/send?phone=6289653763986');

  return (
    <View>
      <Text>ini chat WA</Text>
    </View>
  );
}
