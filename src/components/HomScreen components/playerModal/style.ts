import { StyleSheet } from "react-native";
import { ScreenContextType } from "../../../types/types";
import { colorPalette } from "../../../assets/colorpalette/colorPalette";

const styles = (screenContext: ScreenContextType, width: number, height: number) => StyleSheet.create({
  centeredView: {
    flex: 1,
    // marginTop: 22,
    justifyContent: 'flex-end',
    marginBottom: 30,

  },
  modalView: {
    margin: 20,
    backgroundColor: colorPalette.mint,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 10,
    top: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  controlls: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  slider: {
    flexDirection: 'row',
    alignItems:'center'
  }
})

export default styles