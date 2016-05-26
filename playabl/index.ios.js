import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Playabl = React.createClass({
  getInitialState: function() {
    return {
      randomizr: null,
      running: false
    }
  },
  render: function() {
    return <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.greeting}>
        <Text style={styles.slotNumber}>
          {this.state.randomizr}
        </Text>
      </View>
      <View style={styles.button}>
        {this.slotButton()}
      </View>
    </View>

    <View style={styles.footer}>
      <Text>
        Slot Machine - Demo for Playbl
      </Text>
    </View>
  </View>
  },
  buttonClicked: function(event) {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    var btn_counter = 0;
    if (btn_counter > 3) { 
      return false; 
      event.preventDefault();
      // i found a couple of ways of making this work
      // one is with react-native-listener
    } 
    
    btn_counter++;

    var startTime = 1000;

    this.interval = setInterval(() => {
      this.setState({
        randomizr: parseInt(startTime * Math.random()),
        running: true
      });

    }, 100)
  },
  slotButton: function() {
    var btnStyle = this.state.running ? styles.stopButton : styles.startButton;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    return <View>
      <TouchableElement
        underlayColor="aqua"
        style={styles.button}
        onPress={this.buttonClicked}>
        <View>
          <Text style={[styles.buttonText, btnStyle]}>
            {this.state.running ? 'stop' : 'start'}
          </Text>
        </View>
      </TouchableElement>     
    </View>
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greeting: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  startButton: {
    borderColor: '#33ccff'
  },
  stopButton: {
    borderColor: '#cc0000'
  },
  buttonText: {
    borderWidth: 3,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    paddingTop: 30
  },
  slotNumber: {
    fontSize: 40
  }
});

AppRegistry.registerComponent('playabl', () => Playabl);