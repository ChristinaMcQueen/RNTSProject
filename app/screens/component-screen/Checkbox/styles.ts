import { StyleSheet } from 'react-native';
import variables from '../common/styles/variables'

export default StyleSheet.create({
  checkboxItemContainer: {
    paddingVertical: variables.mainSpacingSM,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconSize: {
    width: variables.mainFontSizeL - 2,
    height: variables.mainFontSizeL - 2,
  },
  checkboxItem: {
    borderWidth: 1,
    borderRadius: variables.mainRadiusS,
    marginRight: variables.mainSpacingS,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledCheckboxItem: {
    backgroundColor: variables.mainFillGray,
    borderColor: variables.mainGrayLighter,
  },
  checkboxLabel: {
    fontSize: variables.mainFontSizeM,
    color: variables.mainBrandSecondary
  },
});