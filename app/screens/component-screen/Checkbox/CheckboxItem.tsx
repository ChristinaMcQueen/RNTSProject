import React, { Component, ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from 'react-native'
import checkboxItemStyle from './styles'
import { FadeAnimated } from '../common/animations'

const styles = StyleSheet.create<any>(checkboxItemStyle)

export interface CheckboxItemProps {
  activeOpacity?: number
  checked?: boolean
  color?: string
  checkedIcon?: ReactElement<any>
  containerStyle?: ViewStyle | ViewStyle[]
  disabled?: boolean
  disabledCheckedIcon?: ReactElement<any>
  disabledUncheckedIcon?: ReactElement<any>
  kind?: 'circle' | 'rounded'
  label?: ReactElement<any>
  size?: number
  style?: ViewStyle | ViewStyle[]
  uncheckedIcon?: ReactElement<any>
  value: string

  onChange?: Function
  renderItem?: Function
}

export class CheckboxItem<T extends CheckboxItemProps, P > extends Component<T, any> {
  static displayName = 'CheckboxItem'

  static defaultProps = {
    disabled: false,
    label: '选项',
  }

  animated: any = new FadeAnimated({})
  state: any = {
    checked: this.props.checked,
  }

  componentDidMount () {
    this.animated && this.animated.toIn()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.animated && this.animated.toIn()
      this.setState({ checked: this.props.checked })
    }
  }

  handlePress = () => {
    const { value, disabled, onChange } = this.props
    if (disabled) {
      return
    }

    this.animated && this.animated.toIn()
    const nextState = !this.state.checked
    this.setState({ checked: nextState }, () => {
      onChange && onChange(value, nextState)
    })
  }

  // render checkbox icon
  renderIcon = () => {
    const { disabled, checkedIcon, uncheckedIcon, disabledCheckedIcon, disabledUncheckedIcon } = this.props
    const { checked } = this.state
    const iconView = disabled
      ? (checked ? disabledCheckedIcon : disabledUncheckedIcon)
      : (checked ? checkedIcon : uncheckedIcon)

    const { size, color, kind, style } = this.props
    const dftStyle: ViewStyle = {
      width: size,
      height: size,
      borderColor: color,
      backgroundColor: checked ? color : "#fff"
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

  render () {
    const { label, containerStyle, renderItem, activeOpacity } = this.props

    const { checked } = this.state

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        activeOpacity={activeOpacity}
      >
        {
          typeof renderItem === 'function' ? renderItem(checked) :
          <View style={[styles.checkboxItemContainer, containerStyle]}>
            {this.renderIcon()}
            {typeof label === 'string' ? <Text style={styles.checkboxLabel}>{label}</Text> : label}
          </View>
        }
      </TouchableOpacity>
    )
  }
}