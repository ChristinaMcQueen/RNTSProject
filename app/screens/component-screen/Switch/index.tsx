import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Platform,
  ViewStyle,
  Text,
} from 'react-native';

import styles from './styles';

const SCALE = 6 / 5;
const switchSizeMap = {
  large: {
    width: 50,
    height: 30,
    rocker: 26,
  },
  small: {
    width: 40, 
    height: 24,
    rocker: 20,
  }
};

export interface SwitchProps {
  testID?: string,
  disabled?: boolean, // 组件是否禁用
  color?: string, // Switch颜色
  size?: 'large' | 'small', // Switch尺寸
  style?: ViewStyle | ViewStyle[], // 组件样式
  containerStyle?: ViewStyle | ViewStyle[], // 组件外部样式
  disabledStyle?: ViewStyle | ViewStyle[], // 组件禁用样式
  checked?: boolean, // 组件选中状态。true-'on'，false-'off'
  onPress?: Function, // 点击回调
}

export default class Switch extends Component<SwitchProps> {
  static defaultProps = {
    disabled: false,
    color: '#FF5E40',
    size: 'small',
    style: {},
    containerStyle: {},
    disabledStyle: {},
    checked: false,
    onPress: () => {}
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.toggleSwitchToValue(true, this.props.checked);
    }
  }

  switchSize = switchSizeMap[this.props.size];
  offset = this.switchSize.width - this.switchSize.height + 1;
  state = {
    checked: this.props.checked,
    toggleable: true,
    handlerAnimation: new Animated.Value(this.switchSize.rocker),
    switchAnimation: new Animated.Value(this.props.checked ? -1 : 1)
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderTerminationRequest: () => true,
    onPanResponderGrant: () => {
      if (this.props.disabled) return;
      this.setState({ toggleable: true });
      this.animateHandler(this.switchSize.rocker * SCALE);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (this.props.disabled) return;
      this.setState({
        toggleable: this.state.checked ? (gestureState.dx < 10) : (gestureState.dx > -10),
      });
    },
    onPanResponderRelease: () => {
      if (this.props.disabled) return;
      if (this.state.toggleable) {
        this.toggleSwitch(true);
      } else {
        this.animateHandler(this.switchSize.rocker);
      }
    }
  });

  // 切换
  toggleSwitch = (result) => this.toggleSwitchToValue(result, !this.state.checked)

  toggleSwitchToValue = (result, toValue) => {
    this.animateHandler(this.switchSize.rocker);
    if (result) {
      this.animateSwitch(toValue, () => {
        this.setState({
          checked: toValue,
          alignItems: toValue ? 'flex-end' : 'flex-start',
        }, () => {
          this.props.onPress && this.props.onPress(toValue);
        })
        this.state.switchAnimation.setValue(toValue ? -1 : 1);
      });
    }
  }

  animateSwitch = (checked, callback = () => null) => {
    Animated.timing(this.state.switchAnimation,
      {
        toValue: checked ? this.offset : -this.offset,
        duration: 200,
        easing: Easing.linear,
      }
    ).start(callback);
  }

  animateHandler = (checked, callback = () => null) => {
    Animated.timing(this.state.handlerAnimation,
      {
        toValue: checked,
        duration: 200,
        easing: Easing.linear,
      }
    ).start(callback);
  }

  circlePosition = (checked) => {
    const modifier = checked ? 1 : -1;
    return modifier * -1;
  }

  // 默认组件外部样式
  getContainerStyle = () => {
    const { switchAnimation, checked } = this.state;
    const { width, height } = this.switchSize;

    return {
      width,
      height,
      alignItems: checked ? 'flex-end' : 'flex-start',
      borderRadius: height / 2,
      backgroundColor: switchAnimation.interpolate({
        inputRange: checked ? [-this.offset, -1] : [1, this.offset],
        outputRange: ['#fff', this.props.color],
        extrapolate: 'clamp',
      }),
    }
  }

  getRockerStyle = () => {
    const { switchAnimation, handlerAnimation, checked } = this.state;
    const { height, rocker } = this.switchSize;

    return {
      backgroundColor: switchAnimation.interpolate({
        inputRange: checked ? [-this.offset, -1] : [1, this.offset],
        outputRange: ['#fff', '#fff'],
        extrapolate: 'clamp',
      }),
      width: handlerAnimation,
      height: rocker,
      marginHorizontal: (height - rocker) / 2 - 1,
      borderRadius: height / 2,
      transform: [{
        translateX: switchAnimation.interpolate({
          inputRange: checked ? [-this.offset, -1] : [1, this.offset],
          outputRange: checked ? [-this.offset, this.circlePosition(checked)] : [this.circlePosition(checked), this.offset],
          extrapolate: 'clamp',
        }),
      }],
    }
  }

  render() {
    const { style, containerStyle, disabled, disabledStyle, testID } = this.props;
    const elevation = disabled ? 1 : 5;
    const customContainer = disabled
      ? { ...styles.disableContainer, ...disabledStyle }
      : { ...containerStyle };
    const containerStyles = [styles.container, this.getContainerStyle(), customContainer];
    const customRocker = disabled ? styles.disableRocker : style;
    const rockerStyles = [
      styles.rocker,
      this.getRockerStyle(),
      { borderWidth: (Platform.OS === 'android' && Platform.Version < 21 || Platform.OS === 'web') ? StyleSheet.hairlineWidth : 0 },
      (Platform.OS === 'android' && Platform.Version >= 21) ? { elevation } : {},
      customRocker,
    ]

    return (
      <Animated.View
        testID={testID}
        {...this.panResponder.panHandlers}
        style={containerStyles}>
          <Animated.View style={rockerStyles}/>
      </Animated.View>
    );
  }
};
