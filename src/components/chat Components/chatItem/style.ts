import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        marginVertical: 15,
        height: 'auto',
        justifyContent: 'center',
        width: 'auto',
        borderRadius: 10,
        paddingHorizontal: screenContext.isPortrait ? width * 0.08 : height * 0.02,
        elevation: 1,
        margin: 1

    }


})

export default styles