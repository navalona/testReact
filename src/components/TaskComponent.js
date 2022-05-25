import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TaskComponent = (props) => {
    return (
        <View style={styles.item}>
            <View style={[styles.itemContainer, styles.itemLeft]}>
                <TouchableOpacity onPress={props.complete}>
                    <Image
                        source={props.text.status ? require('images/icons-checked-checkbox.png') : require('images/icons-unchecked-checkbox.png')}
                        style={styles.actionIcon}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <Text style={styles.itemText}>{props.text.title}</Text>
            </View>
            <View style={[styles.itemContainer, styles.itemRight]}>
                <TouchableOpacity onPress={props.edit}>
                    <Image
                        source={require('images/icons-edit.png')}
                        style={styles.actionIcon}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    itemLeft: {
        justifyContent: 'flex-start',
        width: '60%'
    },
    itemRight: {
        justifyContent: 'flex-end',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 16,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    actionIcon: {
        width: 28,
        height: 28,
        marginHorizontal: 7,
    }
})

export default TaskComponent;