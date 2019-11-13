import React, { Component, ReactElement, ReactChild } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  RegisteredStyle,
  Image,
  } from 'react-native'
import { CheckboxItemAllCheck } from './CheckboxItemAllCheck'
import checkboxStyles from './styles'
import checkIcon from './check.png';

interface CheckboxProps {
  size?: number,
  color?: string,

  style?: ViewStyle | RegisteredStyle<ViewStyle>,
  value?: any[]
  onChange?: Function

  showAllCheck?: boolean
  children?: ReactChild[] | ReactChild
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
}

const styles = StyleSheet.create<any>(checkboxStyles)

export default class Checkbox extends Component<CheckboxProps, {}> {
  static displayName = 'Checkbox'
  static Item = null

  childCount = 0
  childValueArray = []

  static defaultProps = {
    size: 18,
    value: [],
    showAllCheck: false,
    onChange: null,
    checkedIcon: <Image source={checkIcon} style={{ width: 16, height: 16 }} />,
    uncheckedIcon: <Image source={checkIcon} style={{ width: 16, height: 16 }} />
  }

  constructor (props) {
    super(props)

    React.Children.map(this.props.children, (child) => {
      if ((child as any).type.displayName === 'CheckboxItem') {
        this.childCount ++
        this.childValueArray.push((child as any).props.value)
      }
    })
  }

  componentDidMount () {
  }

  handleChange = (itemValue: any, checked: boolean | number, allCheckTag?: boolean) => {
    const { value } = this.props
    let tmpValue = value.concat()

    // 点击选项
    if (!allCheckTag) {
      const idx = value.indexOf(itemValue)

      if (checked) {
        if (idx > -1) {
          // donothing
        } else {
          tmpValue.push(itemValue)
        }
      } else {
        if (idx > -1) {
          tmpValue.splice(idx, 1)
        }
      }
    } else {
      // 点击”全选“按钮
      if (checked === 1) {
        tmpValue = []
      }

      if (checked === 3) {
        tmpValue = this.childValueArray.concat()
      }
    }

    this.props.onChange && this.props.onChange(tmpValue)
  }


  validateChecked (childProps) {
    console.log(this.props.value.indexOf(childProps.value))
    const idx = this.props.value.indexOf(childProps.value)
    return idx > -1 ? true : false
  }

  getAllCheckedStatus() {
    const { value } = this.props
    if (value.length === 0) {
      return 1
    }

    if (value.length < this.childCount) {
      return 2
    }

    if (value.length >= this.childCount) {
      return 3
    }
  }

  render () {
    const {
      showAllCheck,
      children,
      style,
      checkedIcon,
      uncheckedIcon
    } = this.props

    return (
      <View style={[styles.checkboxContainer, style]}>
        {
          showAllCheck ? <CheckboxItemAllCheck
            checkedStatus={this.getAllCheckedStatus()}
            label='全选'
            onChange={this.handleChange}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
          /> : null
        }
        {
          React.Children.map(children, (child, index) => {
            // 需要子组件自己定义了 displayName
            if ((child as any).type.displayName === 'CheckboxItem') {
              const childProps = (child as any).props
              const checked = this.validateChecked(childProps)

              return React.cloneElement((child as any), {
                key: index,
                checked,
                onChange: this.handleChange,
                checkedIcon,
                uncheckedIcon,
              })
            } else {
              return React.cloneElement((child as any))
            }
          })
        }
      </View>
    )
  }
}