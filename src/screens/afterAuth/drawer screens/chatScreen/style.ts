import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.white,
        flex: 1,
        paddingHorizontal: screenContext.isPortrait ? width * .01 : width * .07,
        alignItems: 'center',
    },
    messageContainer: {
        width: width * .98,
        height:'90%',
    }
})

export default styles