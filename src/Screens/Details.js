import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Details = () => {
  // Fetch data from props and render it here
  const route = useRoute();
  const data = route.params.data;
  console.log(data.recipe);
  const [selectedTab, setselectedTab] = useState(0);
  const navigation = useNavigation();
  const backBtn = () => {
    navigation.goBack();
  };

  return (

    <View style={styles.container}>
      <Image source={{ uri: data.recipe.image }} style={styles.banner} />
      <TouchableOpacity style={styles.backBtn}
        onPress={backBtn}
      >
        <Image source={require('../../assets/Image/backIcon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{data.recipe.label}</Text>
      <Text style={styles.author}>{'Added by ' + data.recipe.source}</Text>
      <ScrollView>
        <View style={styles.description}>
          {/* <Text style={styles.descriptionText}>{data.recipe.ingredientLines.join('\n')}</Text> */}
          <Text style={styles.calories}>{'Calories : ' + data.recipe.calories.toFixed(0)}</Text>
          <Text style={styles.calories}>{'Total Weight : ' + data.recipe.totalWeight.toFixed(0)}</Text>
          <Text style={styles.calories}>{'Total Time : ' + data.recipe.totalTime}</Text>
          <Text style={styles.calories}>{'Meal Type : ' + data.recipe.mealType}</Text>
        </View>
        
        <View>
          <FlatList
            data={
              [
                'Health',
                'Cautions',
                'IngredientLines',
                'CuisineType',
                'Dish Type',
                'Deiet',
                'Meal Type',
              ]}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={[styles.typeItems, {

                  borderWidth: selectedTab == index ? 0 : 0.5,
                  backgroundColor: selectedTab == index ? '#F9C23C' : 'white',
                },
                ]} onPress={() => {
                  setselectedTab(index);
                }}>
                  <Text style={[styles.typeText, { color: selectedTab == index ? 'red' : 'black' }]}>{item}</Text>
                </TouchableOpacity>
              )
            }
            }


          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={
              selectedTab == 0
                ? data.recipe.healthLabels
                : selectedTab == 1
                  ? data.recipe.cautions
                  : selectedTab == 2
                    ? data.recipe.ingredientLines
                    : selectedTab == 3
                      ? data.recipe.cuisineType
                      : selectedTab == 4
                        ? data.recipe.dishType
                        : selectedTab == 5
                          ? data.recipe.dietLabels
                          : data.recipe.mealType
            }
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text style={styles.itemText}>
                    {item}
                  </Text>
                </View>
              )
            }}

          />
        </View>
        
      </ScrollView>
    </View>


  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    elevation: 5,


  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    //tintColor: 'green',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#05B681',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    //backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: '#05B681',
    marginTop: -6,
    marginBottom: 10,
    textAlign: 'center',
    //backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
    marginTop: -6,
    marginBottom: 10,
    textAlign: 'center',
    //backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  calories: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    //backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
  },
  typeItems: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F9C23C',
    borderRadius: 10,
    marginLeft: 10,

  },
  typeText: {
    fontSize: 15,
    fontWeight: '500',

    //backgroundColor: 'rgba(0,0,0,0.3)',

  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
    //backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 0,
    margin: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'green'
  }
});