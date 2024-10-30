import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUp = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                alert(" Account Created Successfull");
                navigation.replace("Home");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });

    }
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f2f5df',
            padding: 20,
            borderRadius: 10,
            // marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 20,
                color: '#333',

            }}>Sign Up</Text>
            <View style={{
                width: '80%',
                marginBottom: 20,
                paddingHorizontal: 10,
                borderRadius: 5,
                borderColor: '#ccc',
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 10,
                color: '#333',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#333',
                }}></Text>
                <TextInput

                    style={{
                        borderWidth: 3,
                        borderColor: '#ddd',
                        padding: 10,
                        // marginBottom: 20,
                    }}
                    placeholder="Enter your email"
                    onChangeText={text => setEmail(text)}
                />
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#333',
                }}></Text>
                <TextInput
                    style={{
                        borderWidth: 3,
                        borderColor: '#ddd',
                        padding: 10,
                    }}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    onChangeText={Text => setPassword(Text)}
                />
                <TouchableOpacity style={{
                    backgroundColor: 'green',
                    width: '100%',
                    // padding: 10,
                    borderRadius: 5,
                    // marginLeft: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems: 'center',

                }} onPress={()=> signUp()}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 'green',
                        //   padding: 10,
                        borderRadius: 5,
                        //   marginLeft: 10,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 14,
                    color: '#aaa',
                }}>Forgot Password?</Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 10,
                    color: '#333',
                    flexDirection: 'row',
                }}>Have an account?</Text>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                }} onPress={() =>
                    navigation.navigate('SignIn')
                }>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'green',
                        flexDirection: 'row',
                    }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})