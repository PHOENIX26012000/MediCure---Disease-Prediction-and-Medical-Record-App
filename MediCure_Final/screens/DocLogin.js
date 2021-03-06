import React, { Component } from 'react';
import { StyleSheet, Dimensions,View, StatusBar,TextInput,TouchableOpacity,Text, Image, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import doct from './assets/doct.png';
import * as firebase from 'firebase';
import Toast from 'react-native-simple-toast';
import DocSignin from './DocSignin';
import DocMain from './DocMain';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 3;
const IMAGE_HEIGHT_SMALL = window.width /7;

class DocLogin extends Component {
  static navigationOptions = {
    header:null
  };
  constructor(props) {
    super(props);
    this.state=({
      docid:'',
      password:''
    }),
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

   loginUser=(docid,password)=>
  {
    Toast.show('Logging you in!');
    console.log('in');
    firebase.auth().signInWithEmailAndPassword(docid,password)
    .then((user)=> {
      Toast.show('Welcome');
      this.props.navigation.push('DocMain',{ 
            firebase
        }
      );
    })
    .catch((error)=>{
      Toast.show("Invalid Login Details");
      console.log(error.toString());
    });
  }

  FunctionToOpenSecondActivity = () =>
  {
     this.props.navigation.navigate('DocSignin',{firebase});
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener(this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    console.log('d');
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
               <StatusBar barStyle="light-content" backgroundColor="#0E0B33" />
        <View style={styles.container2}>
          <View style={styles.ovalbackground}>
          </View>
          <Text style={styles.textst}>MediCure</Text>
        </View>

        <Animated.Image source={doct} style={[styles.logo, { height: this.imageHeight }]} />
          <TextInput
            placeholder="Enter Email"
            style={styles.input}
            placeholderTextColor= 'rgba(192,192,192,50)'  
            underlineColorAndroid = 'rgba(192,192,192,50)'
            onChangeText={(docid)=>this.setState({docid})}
          />
          <TextInput
            placeholder="Enter password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor= 'rgba(192,192,192,50)'  
            underlineColorAndroid = 'rgba(192,192,192,50)'
            onChangeText={(password)=>this.setState({password})}
          />
         <TouchableOpacity style={styles.button} onPress={() => this.loginUser(this.state.docid,this.state.password) }>
            <Text style={styles.buttontext}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.signuptext}>Don't have account yet?
          </Text>
          <Text style={{color:'#219AE3',fontSize:20}} onPress={()=>this.FunctionToOpenSecondActivity()}>SignUP.
          </Text>
          <Text style={{padding:15,marginTop:1,fontSize:18,color:'white'}}>-------------------------------------------------
          </Text>
          <Text style={styles.clicktext} >Are you a Patient?
          </Text>
          <Text style={{color:'#219AE3',fontSize:18,paddingBottom:20}} onPress={()=>this.props.navigation.pop()}> Click Here.
          </Text>
           
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#191640',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    alignSelf: 'center',
    justifyContent:'center',
    width: '100%',
    overflow: 'hidden',
    height: 140
  },
  textst:{
    alignSelf: 'center',
    justifyContent:'center',
    color:'white',
    fontSize:30
    //fontFamily: "Grenze-Black",
  },
  ovalbackground: {  
    borderRadius: 700, 
    width: '200%',
    height: 800,
    marginLeft: -200,
    position: 'absolute',
    bottom: 0, 
    overflow: 'hidden',
    backgroundColor:'#0E0B33' 
  },
  // input: {
  //   height: 50,
  //   backgroundColor: '#fff',
  //   marginHorizontal: 10,
  //   marginVertical: 5,
  //  // paddingVertical: 5,
  //   paddingHorizontal: 15,
  //   width: window.width - 30,
  // },
  input:{
      width: 300,
      //marginTop: 35,
      padding:29,
      height: 80,
      //backgroundColor: 'rgba(255,255,255,0.3)',
      color: 'white',
      //borderBottomWidth: 1,
       // borderBottomColor: 'gray',
  },
  logo: {
    padding:45,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    /*marginBottom: 5,
    padding:5,*/
    marginTop:10
  },
  button:{
    marginTop:15,
    width:300,
    marginBottom:20,
    backgroundColor:'#0E0B33',
    borderRadius :10,
    height: 42,
    justifyContent: 'center',
  },
  buttontext:{
    fontSize:18,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:'center',
  },
  signuptext:{
    
      fontSize:18,
      color:'rgba(192,192,192,50)'
    },
  clicktext:{
    fontSize:20,
    color:'rgba(192,192,192,50)'
  },
});

export default DocLogin;