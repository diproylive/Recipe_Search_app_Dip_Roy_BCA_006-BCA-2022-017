import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import data from '../Apis/Data';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Details from './Details';
import AddRecipe from './AddRecipe';
// import { firebase } from '../../firebase/firebase';
// import { auth, signOut } from "../../firebase/firebase";
// import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { db, storage, auth } from '../../firebase/firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";



const Home = () => {

  const navigation = useNavigation();


  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getTrendyRecipes();

  }, []);

  const getTrendyRecipes = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=4e62f5b7&app_key=3cc76d1952489ab679f0a201f8b0936f", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.hits)
        setRecipes(result.hits)
      })
      .catch((error) => console.error(error));
  };

  const [selectedTab, setselectedTab] = useState(0);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("You Sign-Out")
        navigation.replace('Welcome');
        console.log('User signed out');
      })
      .catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
  }

  // const [readData, setReadData] = useState([]); // State to hold the fetched data
  const [recipeName, setRecipeName] = useState(null);
  const [recipeDes, setRecipeDes] = useState(null);
  // const [recipe, setRecipe] = useState([]);
  const fetchData = async () => {
    const docRef = doc(db, "addRecipes", auth.currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipeName(docSnap.data().Recipe_name);
        setRecipeDes(docSnap.data().Recipe_description);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [auth.currentUser.uid]); // Add uid as a dependency


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Image source={require('../../assets/Image/topbanner.jpg')}
          style={styles.banner}
        />
        <View style={styles.trans}>
          <Text style={styles.title}>RecipePro</Text>
          <View>
            <TouchableOpacity style={{
              width: 50,
              height: 50,
              // borderRadius: 25,
              // backgroundColor: '#4caf50',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }} onPress={() => logOut()}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  // tintColor: 'red',
                  position: 'absolute',
                  top: -90,
                  left: 180,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: 25,
                  shadowColor: '#000',

                }}
                source={require('../../assets/logout.jpeg')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={.5} style={styles.searchBox} onPress={() => {
            navigation.navigate('Search');
          }}>
            <Image source={require('../../assets/Image/searchIcon.png')}
              style={styles.searchicon}
            />
            <Text style={styles.searchInput}>
              Search Any Recipe Here...
            </Text>
          </TouchableOpacity>
          <Text style={styles.subTitle}>
            Search 1000+ recipes easily with one click...
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.bottomView}>
          <Text style={styles.category}>
            Meal Categories :
          </Text>
          <View>

            <FlatList
              horizontal
              data={data}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.categoryItem}
                    onPress={() => {
                      navigation.navigate("RecipeByCategory", { data: item.title })
                    }}
                  >
                    <Image source={item.icon} style={styles.categoryIcon} />
                    <Text style={styles.categoryText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <Text style={styles.trendyRecipes}>
            Trendy Recipes :
          </Text>
          <View>
            <FlatList
              horizontal
              data={recipes}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity contentContainerStyle={{ marginTop: 20 }} style={styles.recipesItem}
                    onPress={() => {
                      navigation.navigate('Details', { data: item })
                    }}
                  >
                    <Image source={{ uri: item.recipe.image }} style={styles.recipesImage} />
                    <View style={[styles.trans, { borderRadius: 10 }]}>
                      <Text style={styles.recipesTitle}>{item.recipe.label}</Text>
                      <Text style={styles.recipesCalories}>Cautions : {item.recipe.cautions}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}

            />
          </View>
          <View>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 20,
              marginLeft: 10,
              marginBottom: 10,
              color: 'green',
              flexDirection: 'row',
            }}>
              Current Note :
            </Text>
            <TouchableOpacity style={{
              backgroundColor: 'white',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              position: 'absolute',
              bottom: -15,
              right: 20,
              // positionstatic', 'static',
            }} onPress={() => {
              navigation.navigate('AddRecipe');
            }}>
              <Icon name="plus" size={24} color='green' />
            </TouchableOpacity>

          </View>
          <View>
            {/* <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 20,
              marginLeft: 10,
              marginBottom: 10,
              color: 'green',
              flexDirection: 'row',
            }}>
              Favorites :
            </Text>
            <TouchableOpacity style={{
              backgroundColor: 'white',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              position: 'absolute',
              bottom: -15,
              right: 20,
            }}>
            <Icon name="heart" size={24} color='red'/>
            </TouchableOpacity> */}
          </View>
          <View style={{
            backgroundColor: 'white',
            width: '100%',
            paddingHorizontal: 20,
            marginBottom: 10,
            marginTop: 10,
            // marginLeft: 10,
            // marginRight: 20,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 27,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
              color: 'purple',
              // flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',


            }}>
              {recipeName}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10, marginLeft: 10, marginBottom: 10, color: 'gray', }}>
              {recipeDes}
            </Text>
          </View>


        </View>

      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trans: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -2,
    left: 0,

    justifyContent: 'center',
    alignItems: 'center',

  },
  searchBox: {
    backgroundColor: '#fff',
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  searchicon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    //tintColor: 'green',
    position: 'relative',
    left: -10,
  },
  searchInput: {
    position: 'relative',
    top: 15,
    fontSize: 20,
    width: '85%',
    height: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: 'gray',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomView: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  category: {
    fontSize: 25,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    color: 'green',

  },

  categoryItem: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  categoryIcon: {
    width: 60,
    height: 55,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 10,
    //tintColor: 'green',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#05B681',
  },
  trendyRecipes: {
    fontSize: 25,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    color: 'green',
  },
  recipesItem: {
    width: 160,
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,

    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  recipesImage: {
    width: 160,
    height: 210,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    //tintColor: 'green',
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  recipesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
    marginTop: 70,
  },
  recipesCalories: {
    fontSize: 14,
    fontWeight: '400',
    color: '#00ff00',
    marginTop: 5,
    marginBottom: 5,
  },



});