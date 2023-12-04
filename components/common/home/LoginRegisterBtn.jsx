import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'

import styles from './loginregister.style'

const ScreenHeaderBtn = ({text, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn;