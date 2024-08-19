import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        alignItems: 'center',
    }
})

export default styles