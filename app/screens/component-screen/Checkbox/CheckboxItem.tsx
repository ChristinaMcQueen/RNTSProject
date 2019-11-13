import React, { Component, ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Image,
} from 'react-native'
import checkboxItemStyle from './styles'
import { FadeAnimated } from '../common/animations'

import checkIcon from './check.png';


const styles = StyleSheet.create<any>(checkboxItemStyle)

export interface CheckboxItemProps {
  size?: number   // 尺寸
  color?: string  // 颜色
  kind?: 'circle' | 'rounded' // circle-圆形，rounded-圆角方形

  style?: ViewStyle
  label?: string
  value?: any | null | undefined
  disabled?: boolean
  checked?: boolean
  iconPosition?: 'left' | 'right'
  onChange?: Function
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  renderItem?: Function,
  activeOpacity?: number,
}

export class CheckboxItem<T extends CheckboxItemProps, P > extends Component<T, any> {
  static displayName = 'CheckboxItem'
  static defaultProps = {
    size: 18,   // 尺寸
    color: '#FF5E40',  // 颜色
    kind: 'rounded', // circle-圆形，rounded-圆角方形

    style: {},
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    checkedIcon: null
  }
  animated: any

  constructor (props) {
    super(props)
    this.state = {
    }

    this.animated = new FadeAnimated({})
  }

  componentDidMount () {
    this.animated && this.animated.toIn()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.animated && this.animated.toIn()
    }
  }

  handlePress = () => {
    const { disabled, checked, value, onChange } = this.props
    if (disabled) {
      return
    }

    this.animated && this.animated.toIn()
    onChange && onChange(value, !checked)
  }

  getIconStyle = () => {
    const { checked, size, color, disabled } = this.props
    const style = { width: size, height: size, borderColor: color, backgroundColor: checked ? color : "#fff" }
    Object.assign(style, disabled ? styles.disabledCheckboxItem : {})
    return style
  }

  renderIcon = () => {
    const { checked, checkedIcon, uncheckedIcon } = this.props

    const iconView = checked ? checkedIcon : uncheckedIcon

    const animatedStyle: any = {
      transform: [{ scale: this.animated.getState().scale }],
      opacity: this.animated.getState().opacity
    }

    return (
      <View style={[styles.checkboxItem, this.getIconStyle()]}>
        <Animated.View style={animatedStyle}>
          <View>{iconView}</View>
        </Animated.View>
      </View>
    )
  }

  renderLabel () {
    const { label, checked } = this.props

    console.log(checked)

    return (
      <Text
        style={[
          styles.checkboxLabel,
          checked ? { color: '#FF5E40', fontWeight: 'bold' } : null
        ]}>
        {label}
      </Text>
    )
  }

  render () {
    const { style, disabled, checked, renderItem, activeOpacity } = this.props

    return (
      <TouchableOpacity
        style={[
          {
            opacity: disabled ? activeOpacity : 1
          }
        ]}
        onPress={this.handlePress}
        activeOpacity={activeOpacity}>

        {
          typeof renderItem === 'function' ? renderItem(checked) :
          <View
            style={[
              styles.checkboxItemContainer,
              style,
            ]}>
            {this.renderIcon()}
            {this.renderLabel()}
          </View>
        }
      </TouchableOpacity>
    )
  }
}