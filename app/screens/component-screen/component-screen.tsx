import * as React from "react"
import { View, ViewStyle, Text, TextStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen, Header } from "../../components"
import { color, spacing } from "../../theme"

import Switch from "./Switch/index";
import Checkbox from "./Checkbox/index";

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export interface ComponentScreenProps extends NavigationScreenProps<{}> {}

export const ComponentScreen: React.FunctionComponent<ComponentScreenProps> = props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  return (
    <View testID="ComponentScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="demoScreen.howTo"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={{ borderBottomWidth: 1, paddingBottom: 10, }}>
          <Text>Switch</Text>
          <Switch checked />
        </View>
        <View style={{ borderBottomWidth: 1, paddingBottom: 10, }}>
          <Text>Checkbox</Text>
          <Checkbox size={18} color="#FF5E40" value={['test']}>
            <Checkbox.Item label="ewefr" value="test" />
          </Checkbox>
        </View>
      </Screen>
    </View>
  )
}
