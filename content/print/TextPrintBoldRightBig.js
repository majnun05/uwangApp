import React from 'react';
import {Platform, Text} from 'react-native';

export default function TextPrintBoldRightBig({children}) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace';

  return (
    <Text
      style={{
        fontFamily,
        alignSelf: 'flex-end',
        color: '#515151',
        fontSize: 13,
        fontWeight: 'bold',
      }}>
      {children}
    </Text>
  );
}
