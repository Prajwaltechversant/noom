import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.white,
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    profileContainer: {
        width: screenContext.isPortrait ? width * .8 : height * .8,
        height: screenContext.isPortrait ? height * .4 : width * .5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
    },
    profileImage: {
        width: width * .3,
        height: width * .3,
        borderRadius: 100,
        resizeMode: 'cover',
        alignSelf:'center'
    }
})

export default styles