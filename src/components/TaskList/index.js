import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({ data, handleDelete }){
    return(
        <Animatable.View style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity onPress={ ()=> handleDelete(data) }>
                <Ionicons name='md-checkmark-circle' size={30} color='black'></Ionicons>
            </TouchableOpacity>
            <View>
                <Text style={styles.task}>{data.task}</Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 1.5,
        zIndex: 9,
        shadowColor: '#000',
        shadowOpacity: 1,
    },
    task:{
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
})