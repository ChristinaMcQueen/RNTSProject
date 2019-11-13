import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    borderColor: '#c5c5c5',
    borderWidth: StyleSheet.hairlineWidth,
  },
  disableContainer: {
    backgroundColor: '#ccc',
  },
  rocker: {
    shadowOffset: { h : 2, w : 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowColor: '#888',
    borderColor: '#c5c5c5',
  },
  disableRocker: {
    shadowColor: '#ebebeb',
    borderColor: '#ebebeb',
  },
});