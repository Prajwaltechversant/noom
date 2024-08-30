import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? height * 0.003 : height * 0.002,
        backgroundColor: colorPalette.offWhite,
        flex: 1,
        
    },
    eachItem: {
        width: screenContext.isPortrait ? width : height,
        alignItems: 'center',
        
        
    },
    image: {
        width: screenContext.isPortrait ? width*.8 : height*0.8,
        height: screenContext.isPortrait ? width*0.5 : height*0.2,
        resizeMode:'cover',
        borderRadius:5
        
    },
    paragraph: {
        lineHeight: 30,
        textAlign: 'justify',
        textAlignVertical: 'center',
        // flexGrow:1,
        width:screenContext.isPortrait ? width*.8 : height*0.8

        
    },
})

export default styles