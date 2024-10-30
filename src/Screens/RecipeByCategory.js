import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';




const RecipeByCategory = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [recipes, setRecipes] = React.useState([]);
    const route = useRoute();
    const data = route.params.data;
    useEffect(()=>{
        searchRecipe();
    },[]);
    const searchRecipe = () => {
        // console.log(searchTerm)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=4e62f5b7&app_key=3cc76d1952489ab679f0a201f8b0936f&mealType=${data}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to retrieve recipes');
                }
            })
            .then((result) => {
                if (result.hits) {
                    setRecipes(result.hits);
                } else {
                    console.error('No hits found in the response');
                }
            })
            .catch((error) => console.error(error));
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data} Category</Text>
            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                <Image style={styles.backIcon} source={require('../../assets/Image/backIcon.png')} />
            </TouchableOpacity>
            {/* <View style={styles.searchContainer}>
                <Image style={styles.searchIcon} source={require('../../assets/Image/searchIcon.png')} />
                <TextInput style={styles.searchInput} placeholder='Search Recipe...' value={searchTerm} onChangeText={setSearchTerm} />
                {searchTerm != '' &&
                    <TouchableOpacity style={styles.closeBtn} onPress={() => {
                        setSearchTerm('')
                        setRecipes([])
                    }}>
                        <Image style={styles.closeIcon} source={require('../../assets/Image/closeIcon.png')} />
                    </TouchableOpacity>
                }

            </View>
            {searchTerm != '' &&
                <TouchableOpacity style={styles.searchBox} onPress={() => {
                    // setSearchTerm([])
                    setRecipes([])
                    searchRecipe();
                }}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            } */}
            <View style={styles.SearchBody}>
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.recipe.label}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.recipeBox} onPress={() => {
                            navigation.navigate('Details', { data: item });
                        }}>
                            <Image style={styles.recipeImage} source={{ uri: item.recipe.image }} />
                            <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
                            <Text style={styles.recipeAuthor}>{'Added by : ' + item.recipe.source}</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    // contentContainerStyle={{ paddingVertical: 15 }}
                    contentInsetAdjustmentBehavior="automatic"
                    // style={{ marginBottom: 100 }}
                    bounces={true}
                />
            </View>
        </View>
    )
}

export default RecipeByCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 30,
        color: 'green',

    },
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    backIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    searchContainer: {
        marginHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 30,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 19,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        // width: '85%',
        alignSelf: 'center',


    },
    searchInput: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },
    searchIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: 'green',
    },
    closeIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        // tintColor: 'red',
        marginLeft: 0,

    },
    searchBox: {
        backgroundColor: 'green',
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 19,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    searchText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        textAlign: 'center',
    },
    SearchBody: {
        // marginBottom: 30,
        marginHorizontal: 25,
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    recipeBox: {
        marginBottom: 20,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
    },
    recipeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    recipeAuthor: {
        fontSize: 16,
        fontWeight: '500',
        color: '#999',
        marginTop: 5,
    }




})