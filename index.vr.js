import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  NativeModules
} from 'react-vr';

const CubeModule = NativeModules.CubeModule;

class WelcomeToVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {btnColor: 'white', cubeColor: 'yellow'};
    CubeModule.changeCubeColor(this.state.cubeColor);
  }

  render() {
    return (
      <View
        style={{
          transform:[{translate: [0, 0, -3]}],
          layoutOrigin: [0.5, 0, 0],
          alignItems: 'center',
        }}>
        <Pano source={asset('chess-world.jpg')}/>
        <VrButton
          style={{
            backgroundColor: this.state.btnColor,
            borderRadius: 0.05,
            margin: 0.05,
          }}
          onEnter={()=>{this.setState({btnColor: this.state.cubeColor})}}
          onExit={()=>{this.setState({btnColor: 'white'})}}
          onClick={()=>{
            let hexColor = Math.floor(Math.random()*0xffffff).toString(16);
            // Ensure we always have 6 digits by padding with leading zeros.
            hexColor = '#'+(('000000'+hexColor).slice(-6));
            this.setState({cubeColor: hexColor, btnColor: hexColor});
            // Asynchronous call to custom native module; sends the new color.
            CubeModule.changeCubeColor(hexColor);
          }}
        >
          <Text style={{
            fontSize: 0.15,
            paddingTop: 0.025,
            paddingBottom: 0.025,
            paddingLeft: 0.05,
            paddingRight: 0.05,
            textAlign:'center',
            textAlignVertical:'center',
          }}>
            Change Color!
          </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
