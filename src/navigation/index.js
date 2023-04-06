import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Perfil } from "../screens/Perfil";
import HomeScreen from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Config from "../screens/Config";
import CadEmpresa from "../screens/CadEmpresa";

const Stack = createNativeStackNavigator();
export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
       
        <Stack.Screen name={"Drawer"} component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
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
        name="Cadastro de Empresa"
        component={CadEmpresa}
        options={{
          headershown: false,
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
