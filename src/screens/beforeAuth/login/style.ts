import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        height: screenContext.isPortrait ? height : width,
        width: screenContext.isPortrait ? width : height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        marginTop: screenContext.isPortrait ? width * 0.2 : 0
    },
    privacyPolicy: {
        position: 'absolute',
        bottom:screenContext.isPortrait ? width * 0.04 : width * 0.007,
        padding:screenContext.isPortrait ? width * 0.02 : width * 0.001,
        alignSelf: 'center'
    },
})

export default styles