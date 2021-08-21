import React from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class FaceBook extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        hasCameraPermissions: status === "granted",
        buttonState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal'
      });
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "clicked" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
             <View>
              <Image
                source={require("../assets/camera.jpg")}
                style={{width:200, height: 200, alignSelf : 'center', justifyContent : 'center'}}/>
              <Text style={{textAlign: 'center', fontSize: 30 }}>BAR CODE SCANNER</Text>
            </View>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style= {styles.scanButton} 
            title = "QR 𝙲𝚘𝚍𝚎 𝚂𝚌𝚊𝚗𝚗𝚎𝚛">
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    displayText:{
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      borderRadius: 0,
      borderColor : 'black',
      borderWidth : 3
    },
    buttonText:{
      fontSize: 20,
      }
  });