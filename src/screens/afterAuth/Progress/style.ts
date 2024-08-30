import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
        padding: screenContext.isPortrait ? width * .03 : height * 0.008
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
        fontSize: 14,
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'cover'
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardFooter: {
        alignSelf: 'center'
    },
    footerBtn: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',



    },
    card2: {
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        margin: 1,
        padding: screenContext.isPortrait ? width * 0.01 : height * 0.01,
        alignItems:'center',
        height:screenContext.isPortrait ? width*0.5 : height*0.2,
        justifyContent:'space-around'

    },
    cardImage2: {
        width: screenContext.isPortrait ? width * 0.2 : height * 0.2,
        height: screenContext.isPortrait ? width * 0.2 : height * 0.1,
        // borderRadius: 100,
        resizeMode: 'center'
    },
})

export default styles