import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Note from './screens/Note';
import { MaterialIcons } from '@expo/vector-icons'; 
import HomeScreen from './screens/HomeScreen';

import { YellowBox } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
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
          name="Note" 
          component={Note}
          options={ ({ navigation }) => ({ 
            title: 'Ghi chú mới', 
            headerRight: () => (
              <View>
                <MaterialIcons
                  name="check"
                  size={24}
                  style={styles.buttonSave}
                  onPress={navigation.saveNote}
                />
              </View>
            )
          })}
        />
        <Stack.Screen 
          name="EditNoteScreen" 
          component={Note}
          options={ ({ navigation}) => ({ 
            title: '', 
            headerRight: () => (
              <View style={{ flexDirection: 'row'}}>
                <MaterialIcons
                  name="delete" 
                  size={24} 
                  onPress={navigation.deleteNote} 
                  style={styles.icon}
                />
                <MaterialIcons
                  name="check"
                  size={24}
                  style={styles.buttonSave}
                  onPress={navigation.saveNote}
                  style={styles.icon}
                />
              </View>
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

/* const COLOR4 = '#f8f1f1';
const COLOR3 = '#ffa62b';
const COLOR2 = '#db6400';
const COLOR1 = '#16697a'; */
const styles = StyleSheet.create({
  buttonSave: {
    color: 'white',
    paddingRight: 15,
  },
  icon: {
    margin: 10,
    color: 'white',
  }

})
