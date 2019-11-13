import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Platform,
  ViewStyle,
  Image,
} from 'react-native';

import styles from './styles';
import checkIcon from './check.png';

import CheckboxItemAllCheck from './CheckboxItemAllCheck';
import CheckboxItem from './CheckboxItem';

export default class Checkbox extends Component<CheckboxItem> {
  static Item: typeof CheckboxItem;

  static defaultProps = {
    defaultValue: [], // 默认选中的选项 string[]
    activeOpacity: 0.8, // 激活时透明度
    kind: 'rounded', //checkbox形状。circle-圆形，rounded-圆角方形
    color: '#FF5E40', //' checkbox颜色
    size: 18, // checkbox尺寸
    style: {}, // 组件样式
    containerStyle: {}, // 组件外部样式
    disabled: false, // 组件是否禁用
    disabledStyle: {}, // 组件禁用样式
    onChange: () => {}, // 变化时回调函数
    showAllCheck: false, // 显示全选
    allChecked: false, // 全选
    allCheckLabel: '全选', // 全选文案
    checkedIcon: <Image source={checkIcon} />,
    uncheckedIcon: <Image source={checkIcon} />,
    children: null,
  }

  render() {
    const { children } = this.props;
    const { showAllCheck, allChecked, allCheckLabel } = this.props;
    const { containerStyle, disabled, disabledStyle, checkedIcon, uncheckedIcon } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {showAllCheck && (
          <CheckboxItemAllCheck label={allCheckLabel} />
        )}
      </View> 
    );
    // return <Image source={checkIcon} />
  }
}
