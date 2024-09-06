import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        marginVertical: screenContext ? height * 0.01 : width * 0.01,
        height: 'auto',
        justifyContent: 'center',
        width: 'auto',
        borderRadius:screenContext.isPortrait ? width * 0.01 : height * 0.01,
        padding: screenContext.isPortrait ? width * 0.009 : height * 0.009,
        elevation: 1,
        margin: 1,
        borderBottomRightRadius:0

    }


})

export default styles