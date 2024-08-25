import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container:{
        height,
        paddingHorizontal:width*.05,
    },
})

export default styles