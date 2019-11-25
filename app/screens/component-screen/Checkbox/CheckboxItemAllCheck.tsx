import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from 'react-native'
import { CheckboxItem, CheckboxItemProps } from './CheckboxItem'
import styles from './styles'
import variables from '../common/styles/variables'

export interface CheckboxItemAllCheckProps extends CheckboxItemProps {
  checkedStatus?: number
}

export class CheckboxItemAllCheck extends CheckboxItem<CheckboxItemAllCheckProps, any> {
  static defaultProps = {
    ...CheckboxItem.defaultProps,
    disabled: false,
    label: '全选',
    value: '',
  }

  indeterminateStyle = (disabled?: boolean) => {
    const { size, color, kind } = this.props
    const innerSize = (size - 2) / 2
    const style: ViewStyle = { width: innerSize, height: innerSize, backgroundColor: disabled ? variables.mainGrayLighter : color }
    kind === 'circle' && (style.borderRadius = innerSize / 2)
    return style
  }

  state = {
    checkedStatus: this.props.checkedStatus,
    iconMap: {
      1: { // unchecked
        disabled: this.props.disabledUncheckedIcon,
        default: this.props.uncheckedIcon,
      },
      2: { // indeterminate
        disabled: <View style={this.indeterminateStyle(true)} />,
        default: <View style={this.indeterminateStyle()} />,
      },
      3: { // checked
        disabled: this.props.disabledCheckedIcon,
        default: this.props.checkedIcon,
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checkedStatus !== this.props.checkedStatus) {
      this.animated && this.animated.toIn()
      this.setState({ checkedStatus: this.props.checkedStatus })
    }
  }

  handlePress = () => {
    const { disabled, checkedStatus, onChange } = this.props
    if (disabled) {
      return
    }

    const nextCheckedStatus = ([1, 2].includes(checkedStatus)) ? 3 : 1
    this.animated && this.animated.toIn()
    onChange && onChange(null, nextCheckedStatus, true)
  }

  renderIcon = () => {
    const { disabled } = this.props
    const { checkedStatus } = this.state
    
    const iconView = this.state.iconMap[checkedStatus][disabled ? 'disabled' : 'default']

    const { size, color, kind, style } = this.props
    const dftStyle: ViewStyle = {
      width: size,
      height: size,
      borderColor: color,
      backgroundColor: checkedStatus === 3 ? color : "#fff"
    }
    kind === 'circle' && (dftStyle.borderRadius = size / 2)
    disabled && Object.assign(dftStyle, styles.disabledCheckboxItem)

    const animatedStyle: any = {
      transform: [{ scale: this.animated.getState().scale }],
      opacity: this.animated.getState().opacity
    }

    return (
      <View style={[styles.checkboxItem, dftStyle, style]}>
        <Animated.View style={animatedStyle}>
          <View>{iconView}</View>
        </Animated.View>
      </View>
    )
  }
  
  render() {
    const { label, activeOpacity, containerStyle } = this.props
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        activeOpacity={activeOpacity}
      >
        <View style={[styles.checkboxItemContainer, containerStyle]}>
          {this.renderIcon()}
          {typeof label === 'string' ? <Text style={styles.checkboxLabel}>{label}</Text> : label}
        </View>
      </TouchableOpacity>
    )
  }
}