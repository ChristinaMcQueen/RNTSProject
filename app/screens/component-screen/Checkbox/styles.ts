import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  disableContainer: {
  },

  checkboxContainer: {
    backgroundColor: '#fff'
  },

  checkboxItemContainer: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  checkboxItem: {
    borderWidth: 1,
    borderRadius: 4,
  },
  disabledCheckboxItem: {
    backgroundColor: '#e6e6e6',
    borderColor: '#cdcdcd',
  },

  checkboxLabel: {
    fontSize: 14,
    color: '#111'
  },

  uncheckedIcon: {
    // width: 16,
    // height: 16,
    borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 16,
    // borderColor: '#d5d5d5',
    // backgroundColor: '#ffffff',
  },
  iconLeftPosition: {
    marginRight: 8
  }
});