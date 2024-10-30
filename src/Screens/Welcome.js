import { Image, StyleSheet, Text, View } from 'react-native'
import React ,{useEffect} from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(() =>{
      navigation.navigate('SignIn');
    }, 3000);
  },[]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation='slideInUp'
        source={require('../../assets/Image/welcome.png')}
        style={styles.welcomeImage}

      />
      <Animatable.Text
        animation='zoomInUp' iterationCount={2} direction="alternate"
        style={styles.welcomeText}>RecipePro</Animatable.Text>

      <Animatable.Text
        animation='slideInDown'
        style={styles.welcomeTag}>Search Any Recipe With Helth Filter</Animatable.Text>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ac29a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  welcomeTag:{
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 10,
  }
})