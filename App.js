
import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList,Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/Addtodo';

export default function App() {
  
  const [todos,setTodos] = useState([
    {text:"Buy Coffee", key:'1'},
    {text:"Create an App", key:'2'},
    {text:"Play on the switch", key:'3'},
  ]);

  const pressHandler = (key) =>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text) => {

    if(text.length > 3){
      setTodos((prevTodos) =>{
        return [
          {text : text, key : Math.random().toString()},
          ...prevTodos
        ]
      });
    }
    else{
      Alert.alert('oops!','Todos must be over 3 chars long',[
        {text:'Understood',onPress:()=> console.log('alert closed')}
      ])
    }
   
  }

  return (
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();

      console.log('dismissed keyboard');
    }}>
    <View style={styles.container}>
      <Header/>
      {/*header*/}
      
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler}/>
          {/* todo form */}

          <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem = {({item}) => (
                  <TodoItem item={item} pressHandler={pressHandler}/>
                )}
              />
          </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    
  },
  content:{
    padding:40,
    
    flex:1,
  },
  list:{
    flex:1,
    marginTop:20,
   
  }
 
});
