import { StyleSheet } from "react-native";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext, width, height) => StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        paddingTop: screenContext.isPortrait ? height * 0.1 : height * 0.002,
        backgroundColor: colorPalette.white
    }

})

export default styles