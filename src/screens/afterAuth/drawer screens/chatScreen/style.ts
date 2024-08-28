import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.white,
        flex: 1,
        padding: screenContext.isPortrait ? width * .01 : height * .01,
        alignItems: 'center',
        // borderWidth: 1
    },
    messageContainer: {
        width: screenContext.isPortrait ? width * .9 : height * .98,
        // borderWidth: 1,
        // flex: 0.9
        // height:screenContext.isPortrait ? height*0.8 : 20
    }
})

export default styles