import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: width * .05,
        // borderWidth: 1
    },
})

export default styles