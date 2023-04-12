import { View, Text } from "react-native";
import  { estilo } from "../utils/styles";
import { Image } from "react-native";



const HomeScreen = () => {

return(
    <View style={estilo.container}>
        <Image
             style={estilo.imagem}
             source={require('../../assets/caixa2.png')
           }      
        />
        <Text style={estilo.titulo}>AuthBox</Text>
    </View>

           
    )
}


export default HomeScreen;