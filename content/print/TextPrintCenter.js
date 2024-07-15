import React from 'react'
import { Platform, Text } from 'react-native'

export default function TextPrint ({ children }) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

  return (
      <Text style={{fontFamily, color: '#515151', fontSize: 11, textAlign:'center'}}>{ children }</Text>
  )
}