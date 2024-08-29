import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: width * .05,
        // borderWidth: 1
    },
    cardContainer: {
        borderWidth: 1,
        marginVertical: screenContext.isPortrait ? height * 0.01 : width * 0.01,
        height: screenContext.isPortrait ? height * 0.15 : width * 0.4,
        // elevation:1,
        marginHorizontal: 1,
        borderRadius: 10,
        padding: screenContext.isPortrait ? width * 0.03 : height *0.03,
        justifyContent:'space-evenly',

    },
    cardHeader:{
        justifyContent:'center'
    }
})

export default styles