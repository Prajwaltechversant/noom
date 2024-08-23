import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        // paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',
    },
    eachItem: {
        height: height * 0.8, width,
        alignItems: 'center'
    },
    image: {
        width,
        height: height * 0.3
    },
    paragraph: {
        lineHeight: 30,
        textAlign: 'justify',
        textAlignVertical: 'center',
    },
})

export default styles