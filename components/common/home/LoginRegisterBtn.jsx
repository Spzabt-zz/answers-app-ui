import React, {useContext} from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'
import { Link } from 'expo-router'

import styles from './loginregister.style'

const ScreenHeaderBtn = ({text, path, handlePress}) => {

  return (
    <Link href={path} asChild>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default ScreenHeaderBtn;