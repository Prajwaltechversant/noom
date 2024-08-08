import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create(
    {
        container: {
            alignItems: 'center',
            padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
            backgroundColor: colorPalette.white,
            flex: 1,
        },
        optionContainer: {
            flex: 1,
            marginVertical: screenContext.isPortrait ? height * 0.1 : height * 0.1
        },
        options: {
            // marginVertical:1
        },
        checkBoxContainer: {
            width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
            flexDirection: 'row', alignItems: 'center',
            height: screenContext.isPortrait ? width * 0.2 : width * 0.08,
            marginVertical: 5

        }

    }
)

export default styles