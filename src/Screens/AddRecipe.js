import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage, auth } from '../../firebase/firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";



const AddRecipe = () => {
    const navigation = useNavigation();
    // const [image, setImage] = useState(null);
    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };
    // useEffect(() => {
    //     const uploadImage = async () => {
    //         const response = await fetch(image);
    //         const blob = await response.blob();

    //         const uploadUri = Platform.OS === 'ios' ? blob.uri.replace('file://', '') : blob.uri;

    //         const formData = new FormData();
    //         formData.append('file', {
    //             uri: uploadUri,
    //             name: 'photo.jpg',
    //             type: 'image/jpeg',
    //         });

    //         const options = {
    //             method: 'POST',
    //             body: formData,
    //         };

    //         const res = await fetch('http://your-api-url.com/upload', options);
    //         const json = await res.json();

    //         console.log(json);
    //     }
    //     if (image != null) {
    //         uploadImage();
    //         setImage(null);
    //     }

    // }, []);
    const [recipeName, setRecipeName] = useState('');
    const [recipeDes, setRecipeDes] = useState('');

    const addRecipe = async () => {
        // Ensure that recipeName and recipeDes are set correctly
        if (!recipeName || !recipeDes) {
            alert("Please fill in all fields.");
            return;
        }
    
        // Check if the user is authenticated
        if (!auth.currentUser ) {
            alert("You must be signed in to add a recipe.");
            return;
        }
    
        try {
            // Create the recipe object
            const recipeData = {
                Recipe_name: recipeName,
                Recipe_description: recipeDes,
                user_id: auth.currentUser .uid, // Include user ID
                timestamp: new Date(),
                // Optionally add the image if you have it
                // Recipe_image: image ? image : null, // Uncomment if needed
            };
    
            // Log the recipe data to verify
            console.log("Recipe object being added:", recipeData);
    
            // Create a unique document reference
            const recipeDocRef = doc(db, "addRecipes", auth.currentUser.uid);
    
            // Add the recipe to Firestore
            await setDoc(recipeDocRef, recipeData);
    
            // Document added successfully
            alert("Recipe added successfully!");
            setRecipeName('');
            setRecipeDes('');
            // setImage(null); // Clear the image after submission if needed
            console.log("Document written with ID: ", recipeDocRef.id); // Log the document ID
            navigation.replace("Home");
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("There was an error adding your recipe. Please try again.");
        }
    };
    return (
        <SafeAreaView>
            <View style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F8F8',
                padding: 20,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    // marginRight: 30,
                    marginLeft: -80
                }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name="backward" size={24} color="green" />

                </TouchableOpacity>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#2b355c',
                    textAlign: 'center',
                    // backgroundColor: 'rgba(0,0,0,0.1)',
                    marginLeft: 70
                }}>Add Your Recipe</Text>
            </View>
            {/* Recipe Form */}
            <View style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
            }}>
                {/* Recipe Name */}
                {/* {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="Upload Image" onPress={pickImage} style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft: 10,
                    // width: 100,

                }} /> */}


                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#2b355c',
                    marginLeft: 10
                }}>Recipe Name:</Text>
                <TextInput
                    style={{
                        borderWidth: 2,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 10,
                        marginLeft: 10
                    }}
                    placeholder="Enter Recipe Name"
                    value={recipeName}
                    onChangeText={(text) => setRecipeName(text)}
                />

                {/* Recipe Ingredients */}
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: '#2b355c',
                    marginLeft: 10
                }}>Description:</Text>
                <TextInput
                    style={{
                        borderWidth: 2,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        // width: 100
                        height: 100
                    }}
                    placeholder="Enter Description (comma separated)"
                    multiline={true}
                    value={recipeDes}
                    onChangeText={(text) => setRecipeDes(text)}
                />

                <TouchableOpacity style={{
                    backgroundColor: 'green',
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginBottom: 10,
                    // marginLeft: 10,
                    marginTop: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginBottom: 10,
                    // marginLeft: 10,
                    marginTop: 20,
                    color: '#fff',
                    alignSelf: 'center',
                }} onPress={() => addRecipe()}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                        // marginTop: 10,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'

                    }}>Add Recipe</Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    )
}

export default AddRecipe

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // backgroundColor: 'rgba(0,0,0,0.1)',
    },
})