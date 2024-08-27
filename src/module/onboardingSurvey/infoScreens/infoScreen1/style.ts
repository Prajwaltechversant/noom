import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";
import { colorPalette } from "../../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? height * 0.03 : height * 0.002,
        backgroundColor: colorPalette.blossom,
        flex: 1,
        alignItems: 'center',
    },
    contentImage:{
        width:screenContext.isPortrait ? width * .8 : width *.7,
        height:screenContext.isPortrait ? height * 0.5 : height*0.2

    },
    contentWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly'

    }
})

export default styles