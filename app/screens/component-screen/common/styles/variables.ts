import { StyleSheet } from 'react-native'

// 品牌色
const mainBrandColors = {
  mainBrandPrimary: '#FF542A',
  mainBrandPrimaryDark: '#FF3B2D',
  mainBrandPrimaryLight: '#FF5E40',
  mainBrandSecondary: '#383838',
  mainBrandSecondaryYellow: '#FF9634',
  mainBrandSecondaryGray: '#9E9E9E',
  mainBrandSecondaryBlue: '#1DB6F0',
}
// 灰度
const mainGrayColors = {
  mainGrayBase: '#333',    // 正文，主标题
  mainGrayLight: '#9E9E9E',  // 副标题
  mainGrayLighter: '#C8C8C8',
  mainGrayLightest: '#EAEAEA'
}
// 背景色
const mainFillColors = {
  mainFillBase: '#ffffff',
  mainFillGray: '#F3F3F3',
  mainFillColored: '#FFFAF9',
}
// 字体尺寸
const mainFontSize = {
  mainFontSizeXS: 10,
  mainFontSizeS: 12,
  mainFontSizeM: 14,
  mainFontSizeL: 16,
  mainFontSizeXL: 20,
  mainFontSizeX2L: 27,
}

const mainSpacing = {
  mainSpacingXS: 2,
  mainSpacingS: 4,
  mainSpacingSM: 6,
  mainSpacingM: 8,
  mainSpacingL: 10,
  mainSpacingXL: 12,
  mainSpacingX2L: 16,
  mainSpacingX3L: 18,
  mainSpacingX4L: 20,
  mainSpacingX6L: 24
}
// 圆角
const mainRadius = {
  mainRadiusXS: 2,
  mainRadiusS: 4,
  mainRadiusM: 6,
  mainRadiusL: 8
}
const mainBorder = {
  mainBorderWidth: StyleSheet.hairlineWidth,
  mainBorderColor: '#EAEAEA',
  mainBorderColorLight: '#EFEFEF',
  mainBorderColorDark: '#E0E0E0',
  mainBorderColorDarker: '#DFDFDF'
}

const variables: any = {
  ...mainBrandColors,
  ...mainGrayColors,
  ...mainFillColors,
  ...mainFontSize,
  ...mainSpacing,
  ...mainRadius,
  ...mainBorder,
}

// 自定义主题
function customTheme(args = {}) {
    Object.assign(variables, args)
    return variables
}

export default variables

export { customTheme }
