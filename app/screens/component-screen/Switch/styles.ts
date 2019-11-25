import { StyleSheet } from 'react-native'
import variables from '../common/styles/variables'

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    borderColor: variables.mainGrayLighter,
    borderWidth: StyleSheet.hairlineWidth,
  },
  disableContainer: {
    backgroundColor: variables.mainFillColored,
  },
  rocker: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowColor: variables.mainGrayLight,
    borderColor: variables.mainBorderColorDarker,
  },
  disableRocker: {
    shadowColor: '#ebebeb',
    borderColor: '#ebebeb',
  },
});