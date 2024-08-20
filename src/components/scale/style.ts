import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        height
    },
    scaleWrapper: {
        borderWidth: 1,
        width: width * 0.8,
        height: height * 0.1,
        alignItems:'center'
    },
    innerWrapper:{
        borderWidth:1,
        width:50,
    },
    pointer:{
        height:10,
        width:10,
        backgroundColor:'yellow'
    }
})

export default styles