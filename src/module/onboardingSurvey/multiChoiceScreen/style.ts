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
            marginVertical: screenContext.isPortrait ? height * 0.04 : height * 0.01,
        },
        options: {
        },
        checkBoxContainer: {
            width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
            flexDirection: 'row', alignItems: 'center',
            height: screenContext.isPortrait ? width * 0.2 : width * 0.08,
            marginVertical: 5

        },
        contentText: { textAlign: 'center', marginVertical: screenContext.isPortrait ? 10 : 20, fontStyle: 'italic' },


    }
)

export default styles