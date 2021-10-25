import { StatusBar } from 'expo-status-bar';
import React , {useCallback, useState, useEffect} from 'react';
import TaskList from './src/components/TaskList';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(()=>{
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  }, []);

  useEffect(()=> {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();

  }, [task])

  function handleAdd(){
    if(input === '') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');

  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" />
        <View style={styles.content}>
        <Text style={styles.title}>Minhas tarefas</Text>
        </View>
        <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item) => String(item.key) }
        renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} /> }
        />

          <Modal animationType="slide" transparent={false} visible={open}>
            <SafeAreaView style={styles.modal}>
              <View>
                <TouchableOpacity style={styles.icon2} onPress={ ()=> setOpen(false) }>
                  <Ionicons name="md-arrow-back" size={40} color='white'></Ionicons>
                </TouchableOpacity>
                <Text style={styles.title2}>Nova tarefa</Text>
              </View>
              <Animatable.View animation='fadeInUp' useNativeDriver>
                <TextInput style={styles.TextCadastrar}
                placeholder='O que você precisa fazer hoje?'
                multiline={true}
                autoCorrect={false}
                onChangeText={ (texto) => setInput(texto) }
                value={input}
                />
                <TouchableOpacity style={styles.btnCadastrar} onPress={handleAdd }>
                  <Text style={styles.btxTxtCadastrar}>Cadastrar</Text>
                </TouchableOpacity>
              </Animatable.View>
            </SafeAreaView>
          </Modal>

          <AnimatedBtn style={styles.icon}
          useNativeDriver
          animation="bounceInUp"
          duration={1500}
          onPress={ ()=> setOpen(true) }
          >
            <Ionicons name='ios-add' size={35} color="#FFF" />
          </AnimatedBtn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue'
  },
  title: {
    fontSize: 25,
    paddingBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  icon:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 30,
    alignItems:'center',
    justifyContent: 'center',
    top: 570,
    left: 300,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.4
  },
  icon2:{
    position: 'absolute',
    width: 60,
    height: 60,
    top: 25,
    backgroundColor: 'blue',
    borderRadius: 30,
    alignItems:'center',
    justifyContent: 'center',
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.4
  },
  modal:{
    flex: 1,
    backgroundColor: 'darkblue'
  },
  title2:{
    fontSize: 25,
    marginTop: 40,
    marginLeft: 70,
    color: 'white'
  },
  TextCadastrar:{
    top: 50,
    backgroundColor: 'white',
    width: 350,
    height: 100,
    left: 12,
    borderRadius: 10
  },
  btnCadastrar:{
    top: 70,
    backgroundColor: 'white',
    width: 350,
    height: 50,
    left: 12,
    borderRadius: 10
  },
  btxTxtCadastrar:{
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    top: 12
  },
  }
);
