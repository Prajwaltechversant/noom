import { StyleSheet } from "react-native";
import { colorPalette } from "../../assets/colorpalette/colorPalette";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        width: screenContext.isPortrait ? width * 0.8 : width * 0.8,
        marginVertical: 10,
        backgroundColor: 'white',
        color: 'black',
        alignSelf: 'center'

    }

})

export default styles