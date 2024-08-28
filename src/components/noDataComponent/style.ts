import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
    },
    animationView: {
        height: screenContext.isPortrait ? height * .8 : height * .4,
        width: screenContext.isPortrait ? width * .8 : height * .8,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1
    }

})
export default styles