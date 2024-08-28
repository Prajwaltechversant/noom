import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        padding: screenContext.isPortrait ? width * .01 : height * .01,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    // animationView: { height: height * .8, width: width * .8, justifyContent: 'center', alignItems: 'center', borderWidth: 1 }
})

export default styles