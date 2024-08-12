import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({


    container: {
        alignItems: 'center',
        paddingTop: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
    },
    headerContainer: {
        backgroundColor: colorPalette.blossom,
        alignItems: 'center',
    },
    personilzedBox: {
        backgroundColor: colorPalette.cherry,
        borderRadius:10,
        paddingHorizontal:screenContext.isPortrait ? height * 0.03 : height * 0.002,
    }
})

export default styles