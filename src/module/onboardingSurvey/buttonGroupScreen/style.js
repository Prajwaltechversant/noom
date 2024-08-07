import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext, width, height) => StyleSheet.create(
    {
        container: {
            alignItems: 'center',
            padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
            backgroundColor: colorPalette.white,
            backgroundColor: colorPalette.white,
            flex: 1,
        },
        optionContainer: {
            flex:1,
            marginVertical: screenContext.isPortrait ? height * 0.1 : height * 0.1
        },
        options:{
            // marginVertical:1
        }

    }
)

export default styles