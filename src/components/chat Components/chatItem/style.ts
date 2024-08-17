import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({

    container: {
        marginVertical: 15,
        height: height * .04,
        justifyContent: 'center',
        width: width * .3,
        borderRadius: 20,
        paddingHorizontal: 10,
        elevation:3

    }


})

export default styles