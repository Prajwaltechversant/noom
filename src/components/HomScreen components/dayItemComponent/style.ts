import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        width: screenContext.isPortrait ? width * 0.1 : width * 0.1,
        height: screenContext.isPortrait ? width * 0.1 : width * 0.1,
        marginHorizontal: 5,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    innerCircle: {
        width: screenContext.isPortrait ? width * 0.08 : width * 0.075,
        height: screenContext.isPortrait ? width * 0.08 : width * 0.075,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        // textAlign:'center'
    }
})

export default styles