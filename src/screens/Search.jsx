import React  from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export const  SearchScreen = () => {
  const [searchText, setSearchText] = React.useState('');
  const [activeButton, setActiveButton] =React.useState('stores'); 

 


  const LojasData = [
    { id: '1', name: 'Casa Sofia' },
    { id: '2', name: 'Casa Bahia' },
    { id: '3', name: 'Magazine Luiza' },
    { id: '4', name: 'Shopee' },
    { id: '5', name: 'Magalu' },
  ];

  const ProdutosData = [
    { id: '1', name: 'tenis' },
    { id: '2', name: 'roupas' },
    { id: '3', name: 'moveis' },
    { id: '4', name: 'ferramentas' },
    { id: '5', name: 'carros' },
  ];

 
 


  const renderItem = ({ item }) => (
    
      <View>
      <Text style={styles.list}>{item.name}</Text>
      </View>

      
   
  );

  const handleSearch = (text) => {
    setSearchText(text);
   
  };




  const filteredData = activeButton === 'stores'
    ? LojasData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : ProdutosData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    
  return (
    <View style={styles.container}>



<Image source={require('../../assets/caixa2.png')} style={{width:50, height:50, marginLeft:120, marginVertical:10}} />
     <Icon style={styles.menu} name="navicon" size={30} color="#900" />
    
            <Text style={styles.titulo}>AuthBox</Text>
 <TextInput
        testID="Pesquisa"
        style={styles.searchInput}
        placeholder={`Pesquise... `}
        value={searchText}
        onChangeText={handleSearch}
      />
      
      <View style={styles.buttonsContainer}>
      
     
        <TouchableOpacity
          style={[styles.button, activeButton === 'stores' && styles.activeButton]}
          onPress={() => setActiveButton('stores')}
        >
          <Text style={[styles.buttonText, activeButton === 'stores' && styles.activeButtonText]}>Lojas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeButton === 'products' && styles.activeButton]}
          onPress={() => setActiveButton('products')}
        >
          <Text style={[styles.buttonText, activeButton === 'products' && styles.activeButtonText]}>Produtos</Text>
        </TouchableOpacity>
      
       
      </View>


 
 
      

     
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding:50,
    width:300,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft:10,
    

  },
  activeButton: {
    backgroundColor: '#fff',
    borderColor: '#fff',
   
    
  },
  buttonText: {
    color: '#fff',

  },
  activeButtonText: {
    color: 'black',
   
  },
 
  titulo: {
    textAlign: 'center',
    color:"#fff",
    marginVertical:20,
    fontSize:30,
  },

  searchInput:{
    color:"#fff",
    marginVertical:10,
    marginHorizontal:30,
  }, 

  list:{
    color:"#fff",
    marginLeft:30,
    marginVertical:10,
  },

  menu:{
    color:"#fff",
marginVertical:-10,
marginHorizontal:10,
  },

  
})
export default SearchScreen;