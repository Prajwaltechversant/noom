import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        marginVertical: 15,
        height: 'auto',
        justifyContent: 'center',
        width: 'auto',
        borderRadius: 20,
        paddingHorizontal: 10,
        elevation: 1,
        margin:1

    }


})

export default styles