import React, { Component, ReactElement, ReactChild } from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
} from 'react-native'

import { CheckboxItemAllCheck } from './CheckboxItemAllCheck'
import checkboxStyles from './styles'
import checkIcon from './check.png'
import disabledCheckIcon from './disabledCheck.png'
import variables from '../common/styles/variables'

interface CheckboxProps {
  activeOpacity?: number                      // 激活透明度
  color?: string                              // Chekcbox.Item icon颜色
  containerStyle?: ViewStyle | ViewStyle[]    // Chekcbox.Item外部样式
  checkedIcon?: ReactElement<any>             // 标签激活图标
  disabledCheckedIcon?: ReactElement<any>     // 禁用标签激活图标
  disabledUncheckedIcon?: ReactElement<any>   // 禁用标签激活图标
  kind?: 'circle' | 'rounded'           // circle-圆形，rounded-圆角方形
  size?: number                         // Chekcbox.Item icon尺寸
  style?: ViewStyle | ViewStyle[]       // Chekcbox.Item样式
  uncheckedIcon?: ReactElement<any>     // 标签非激活图标

  allCheckLabel?: ReactElement<any>     // 全选标签
  children?: ReactChild[] | ReactChild
  defaultValue?: Array<any>             // 默认选中的选项
  disabled?: boolean                    // 所有选项禁用
  value?: Array<any>                    // 指定选中的选项
  showAllCheck?: boolean                // 展示全选
  onChange?: Function                   // 变化时回调函数
  renderItem?: Function                 // 挂载函数
}

const styles = StyleSheet.create<any>(checkboxStyles)

export default class Checkbox extends Component<CheckboxProps, {}> {
  static displayName = 'Checkbox'
  static Item = null
  state: any

  childCount = 0
  childValueArray = []
  lockedCheckedChildren = []
  checkableChildren = []

  static defaultProps = {
    activeOpacity: 0.8,
    size: variables.mainFontSizeL,
    color: variables.mainBrandPrimary,
    kind: 'rounded',
    checkedIcon: <Image source={checkIcon} style={[styles.iconSize]} />,
    containerStyle: {},
    disabledCheckedIcon: <Image source={disabledCheckIcon} style={[styles.iconSize]} />,
    disabledUncheckedIcon: null,
    style: {},
    uncheckedIcon: <Image source={checkIcon} style={[styles.iconSize]} />,
    disabled: false,
    defaultValue: [],
    value: [],
    showAllCheck: false,
    onChange: () => {},
  }

  checkedChildren = (children) => React.Children.toArray(children).reduce((ret: any[], child: any, index) => {
    child.props.checked && ret.push(child.props.value || index)
    return ret;
  }, [])

  // 1-unchecked, 2-indeterminate, 3-checked
  getCheckedStatus = (value) => value.length === 0 ? 1 : (value.length < this.childCount ? 2 : 3 )

  equalArray = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) return false
    const sortedArr1 = arr1.sort();
    const sortedArr2 = arr2.sort();
    return sortedArr1.every((item, index) => item === sortedArr2[index])
  }

  constructor (props) {
    super(props)

    const defaultValue = props.defaultValue && props.defaultValue.length
      ? props.defaultValue
      : this.checkedChildren(props.children)
    React.Children.map(props.children, (child: any, index) => {
      if (child.type.displayName === 'CheckboxItem') {
        this.childCount ++
        const childKey = (child.props.value || index)
        this.childValueArray.push(childKey)
        if (!child.props.disabled && !props.disabled) {
          this.checkableChildren.push(childKey)
        } else if (child.props.checked || defaultValue.includes(childKey)) {
          this.lockedCheckedChildren.push(childKey)
        }
      }
    })
    this.state = {
      value: defaultValue,
      checkedStatus: this.getCheckedStatus(defaultValue),
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.value.length !== this.props.value.length || !this.equalArray(prevProps.value, this.props.value)) {
      const value = [...new Set([...this.lockedCheckedChildren, ...this.props.value])]
      this.setState({
        value,
        checkedStatus: this.getCheckedStatus(value),
      })
    } else {
      const prevChildren = this.checkedChildren(prevProps.children)
      const nextChildren = this.checkedChildren(this.props.children)
      if (prevChildren.length !== nextChildren.length) {
        this.setState({
          value: nextChildren,
          checkedStatus: this.getCheckedStatus(nextChildren),
        })
      }
    }
  }

  // checkbox 变化回调
  handleChange = (itemValue: any, checked: boolean | number, allCheckTag?: boolean) => {
    let nextValue = this.state.value.concat()
    let checkedStatus: number = typeof checked === 'number' ? checked : 1;

    // 点击选项
    if (!allCheckTag) {
      const idx = this.state.value.indexOf(itemValue)

      if (checked && idx <= -1) {
        nextValue.push(itemValue)
      } else if (idx > -1) {
        nextValue.splice(idx, 1)
      }
      checkedStatus = this.getCheckedStatus(nextValue);
    } else {
      // 点击”全选“按钮
      console.log(checked)
      nextValue = checked === 3
        ? [...new Set([...this.lockedCheckedChildren, ...this.checkableChildren])]
        : [...this.lockedCheckedChildren] || []
      checkedStatus = this.getCheckedStatus(nextValue);
    }
    this.setState({ checkedStatus, value: nextValue })
    this.props.onChange && this.props.onChange(nextValue)
  }

  // 验证Checkbox.Item是否选中
  validateChecked = (childProps, index) => this.state.value.indexOf(childProps.value || index) > -1

  render () {
    const {
      disabled,
      showAllCheck,
      allCheckLabel,
      children,
    } = this.props

    const { checkedStatus } = this.state

    const commomProps = {
      checkedIcon: this.props.checkedIcon,
      color: this.props.color,
      disabledCheckedIcon: this.props.disabledCheckedIcon,
      disabledUncheckedIcon: this.props.disabledUncheckedIcon,
      kind: this.props.kind,
      size: this.props.size,
      onChange: this.handleChange,
      uncheckedIcon: this.props.uncheckedIcon,
    }

    return (
      <View>
        {
          showAllCheck
            ? (
              <CheckboxItemAllCheck
                {...commomProps}
                checkedStatus={checkedStatus}
                disabled={disabled}
                label={allCheckLabel}
              />
            ) : null
        }
        {
          React.Children.map(children, (child: any, index) => {
            // 需要子组件自己定义了 displayName
            if (child.type.displayName === 'CheckboxItem') {
              const childProps = child.props
              const checked = this.validateChecked(childProps, index)

              return React.cloneElement(child, {
                key: index,
                value: childProps.value || index,
                checked,
                disabled: disabled === true || childProps.disabled,
                ...commomProps,
              })
            } else {
              return React.cloneElement(child)
            }
          })
        }
      </View>
    )
  }
}