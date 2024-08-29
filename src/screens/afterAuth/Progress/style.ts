import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
    container: {
        flex: 1,
    },
    // cardContainer: {
    //     borderWidth: 1,
    //     marginVertical: screenContext.isPortrait ? height * 0.01 : width * 0.01,
    //     height: screenContext.isPortrait ? height * 0.15 : width * 0.4,
    //     // elevation:1,
    //     marginHorizontal: 1,
    //     borderRadius: 10,
    //     padding: screenContext.isPortrait ? width * 0.03 : height *0.03,
    //     justifyContent:'space-evenly',

    // },
    // cardHeader:{
    //     justifyContent:'center'
    // }
    card: {
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        margin: 1,
        padding: screenContext.isPortrait ? width * 0.01 : height * 0.01,
        // alignSelf:'center'
        
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
        // borderRadius: 50,
        resizeMode: 'cover'
    },
    cardHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardFooter:{
        alignSelf:'center'
    },
    footerBtn: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        


    }
})

export default styles