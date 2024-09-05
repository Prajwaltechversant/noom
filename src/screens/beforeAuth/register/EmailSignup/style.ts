import { StyleSheet } from "react-native";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        paddingTop: screenContext.isPortrait ? height * 0.1 : height * 0.02,
    }

})

export default styles