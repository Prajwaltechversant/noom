import { StyleSheet } from "react-native";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: any, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        justifyContent: 'space-between',
    },
    btnContainer: {

    },
    contentContainer: {

    }

})

export default styles