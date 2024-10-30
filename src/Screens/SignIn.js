import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";



let unsubscribe;
const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const Login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                alert("LogIn Successfully");
                navigation.replace("Home");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    React.useEffect(() => {
         unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, navigate to Home
                const uid = user.uid; // The uid property denotes the unique ID of the user
                console.log("User Sign In");
                navigation.replace('Home');
                
            } else {
                // User is signed out, navigate to Welcome
                console.log("User Sign Out");
            }
        });
        // Return the function to clean up
        return () => unsubscribe();
    }, []);

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

            }}>Sign In</Text>
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
                    label="Email"
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
                    label="password"
                    style={{
                        borderWidth: 3,
                        borderColor: '#ddd',
                        padding: 10,
                    }}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
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

                }} onPress={() => Login()}>
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
                    }}>Sign In</Text>
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
                }}>Don't have an account?</Text>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                }} onPress={() =>
                    navigation.navigate('SignUp')
                }>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'green',
                        flexDirection: 'row',
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})