import { StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
  btnContainer: {
    width: 300,
    height: 60,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default styles;
