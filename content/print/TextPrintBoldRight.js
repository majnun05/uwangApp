import React from 'react';
import {Platform, Text} from 'react-native';

export default function TextPrintBoldRight({children}) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';

  return (
    <Text
      style={{
        marginTop: 5,
        fontFamily,
        alignSelf: 'flex-end',
        color: '#515151',
        fontSize: 12,
        fontWeight: 'bold',
      }}>
      {children}
    </Text>
  );
}
