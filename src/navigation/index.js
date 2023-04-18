import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View, Image } from "react-native";
import HomeScreen from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Config from "../screens/Config";
import Empresas from "../screens/Empresas";
import CadEmpresa from "../screens/CadEmpresa";
import Perfil from "../screens/Perfil";
import Gerenciamento from "../screens/Gerenciamento";

const Stack = createNativeStackNavigator();
export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: "Login",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: "Registro",
          }}
        />

<Stack.Screen
          name="Gerenciamento"
          component={Gerenciamento}
          options={{
            title: "Gerenciamento",
          }}
          headerStyle={{
            backgroundColor: "#5f1985",
          }}
          
        />

        <Stack.Screen
          name="CadEmpresa"
          component={CadEmpresa}
          options={{
            headerShown: false,
            title: "CadEmpresa",
          }}
        />

        <Stack.Screen name={"Drawer"} component={MyDrawer}  options={{
            headerShown: false, }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={require("../../assets/perfil-vazio.png")}
            style={{
              width: 50,
              height: 50,
              marginLeft: "auto",
              marginVertical: 10,
              marginRight: "auto",
              borderRadius: 50,
            }}
          />
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

function MyDrawer() {
  return (

    
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      useLegacyImplementation
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#5F04B4",
          width: 240,
          
        },
      }}
    >
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Perfil",
          headerStyle: {
            backgroundColor: "#5f1985",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#5f1985",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Drawer.Screen
        name="Empresa"
        component={Empresas}
        options={{
          headershown: false,
          headerStyle: {
            backgroundColor: "#5f1985",
          },
          headerTintColor: "#fffafa",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Drawer.Screen
        name="Config"
        component={Config}
        options={{
          title: "Configurações",
          headerStyle: {
            backgroundColor: "#5f1985",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Drawer.Navigator>
  );


 

  

} 



 
