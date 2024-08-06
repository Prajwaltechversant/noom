import { StyleSheet } from "react-native";
import { colorPalette } from "../../assets/colorpalette/colorPalette";

const styles = (screenContext, width ,height)=>StyleSheet.create({
    container:{

            width:screenContext.isPortrait ? width * 0.8 : width *0.8,
            marginVertical:20,
            backgroundColor:colorPalette.white,
            color:'black'
    }
    
})

export default styles