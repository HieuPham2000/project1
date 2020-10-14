import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewNote from './NewNote';
import { MaterialIcons } from '@expo/vector-icons'; 
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          headerStyle: {
            backgroundColor: COLOR1,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign:'center'
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Ghi chú của bạn', 
          }}
          
        />
        <Stack.Screen 
          name="NewNote" 
          component={NewNote}
          options={ ({ navigation, route }) => ({ 
            title: 'Ghi chú mới', 
            headerRight: () => (
              <MaterialIcons 
                name="check" 
                size={24} 
                style={styles.buttonSave} 
                onPress={() => {
                  navigation.navigate(
                    'Home',
                    {
                      newNoteTitle: 'Test 0',
                      newNoteContent: 'test something',
                    });
                }}
              />
            )
            
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const COLOR1 = '#28df99';
const COLOR2 = '#99f3bd';
const COLOR3 = '#d2f6c5';
const COLOR4 = '#f6f7d4';
const styles = StyleSheet.create({
  buttonSave: {
    color: 'white',
    paddingRight: 15,
  }

})

export default App;