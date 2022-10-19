import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Button, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid'

const TiendaRopa = () => {
    let totalDiscounted = 0;
    let totalTotal = 0;
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [unitCost, setUnitCost] = useState(0);
    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
            const itemsOnStorage = await AsyncStorage.getItem('items');
            if (itemsOnStorage) {
                setItems(JSON.parse(itemsOnStorage))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    const isNumber = (value) => {
        var isDecimal = value.match(/^(\d+\.?\d*|\.\d+)$/);
        return isDecimal;
    }

    const saveProduct = async () => {
        if (name == '' || quantity == '' || unitCost == '')
            Alert.alert('Error', 'Existen campos vacíos');
        else if (!isNumber(quantity) || !isNumber(unitCost))
            Alert.alert('Error', 'Solo debe ingresar números en cantidades y costos');
        else {
            let item = {
                id: shortid.generate(),
                name: name,
                quantity: quantity,
                unitCost: unitCost
            }
            let newItems = [...items, item];
            await saveItem(newItems);
            setName('');
            setQuantity('');
            setUnitCost('');
            await getItems();
            setModalVisible(!modalVisible)
        }
    }

    const saveItem = async (itemsToInsert) => {
        try {
            await AsyncStorage.setItem('items', JSON.stringify(itemsToInsert));
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        Alert.alert(
            "Advertencia",
            "¿Está seguro de querer eliminar este producto?",
            [
                {
                    text: "Sí",
                    onPress: async () => {
                        const itemsFiltered = items.filter(item => item.id !== id);
                        await saveItem(itemsFiltered);
                        await getItems();
                    },
                },
                { text: "No" }
            ]
        );
    }

    const clearAll = async (id) => {
        await saveItem([]);
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal2Visible}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModal2Visible(!modal2Visible);
                }}>
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModal2Visible(!modal2Visible)}>
                            <FontAwesome name='times-circle' size={24} color='black' />
                        </Pressable>
                        <View>
                            <Text style={styles.modalText}>Detalles de facturación</Text>
                            {
                                items.map(function (item) {
                                    let subtotal = item.quantity * item.unitCost;
                                    let discount = 0;
                                    if (item.quantity >= 15 && item.quantity <= 49)
                                        discount = 0.05;
                                    else if (item.quantity >= 50 && item.quantity <= 79)
                                        discount = 0.13;
                                    else if (item.quantity >= 80)
                                        discount = 0.25;
                                    let discounted = discount * subtotal;
                                    totalDiscounted += discounted;
                                    totalTotal += subtotal - discounted;
                                    return (
                                        <View key={item.id}>
                                            <Text>• {item.quantity} x {item.name} ({item.unitCost} USD) = {subtotal} USD {discounted == 0 ? '' : `- ${discounted.toFixed(2)} USD Desc (${discount * 100}%)`}</Text>
                                        </View>
                                    )
                                })
                            }
                            <View style={{height: 40}}></View>
                            <Text style={styles.valueItem}>Total de descuento: {totalDiscounted} USD</Text>
                            <Text style={styles.valueItem}>Total de compra: {totalTotal} USD</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <FontAwesome name='times-circle' size={24} color='black' />
                        </Pressable>
                        <View>
                            <Text style={styles.modalText}>Ingresar producto</Text>
                            <Text>Nombre del producto</Text>
                            <TextInput style={styles.input} value={name} onChangeText={(value) => setName(value)} />
                            <Text>Cantidad</Text>
                            <TextInput style={styles.input} value={unitCost} keyboardType='numeric' onChangeText={(value) => setUnitCost(value)} />
                            <Text>Costo unitario (USD)</Text>
                            <TextInput style={styles.input} value={quantity} keyboardType='numeric' onChangeText={(value) => setQuantity(value)} />
                            <Button style={styles.buttonSubmit} title="Ingresar" onPress={() => saveProduct()} />
                            <View style={{ height: 20 }}></View>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Ingresar Producto</Text>
                </Pressable>

                <Pressable style={[styles.button, styles.buttonFact]} onPress={() => setModal2Visible(true)}>
                    <Text style={styles.textStyle}>Detalles de facturación</Text>
                </Pressable>
            </View>
            <ScrollView style={styles.scrollView}>
                {
                    items.map(function (item) {
                        return (
                            <View key={item.id} style={styles.cardItem}>
                                <View style={{ flex: 5, flexDirection: 'column' }}>
                                    <Text>Nombre del producto: <Text style={styles.valueItem}>{item.name}</Text></Text>
                                    <Text>Cantidad: <Text style={styles.valueItem}>{item.quantity}</Text></Text>
                                    <Text>Precio unitario: <Text style={styles.valueItem}>{item.unitCost} USD</Text></Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Pressable onPress={() => deleteItem(item.id)}>
                                        <FontAwesome name='times' size={32} color='#29abe2' />
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

export default TiendaRopa;

const styles = StyleSheet.create({
    cardItem: {
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 5,
        flex: 1,
        flexDirection: 'row'
    },
    valueItem: {
        fontWeight: 'bold'
    },
    centeredView: {
        marginTop: 22,
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1,0.5)'
    },
    modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    },
    scrollView: {
        marginTop: 50,
    },
    buttonOpen: {
        backgroundColor: '#28A745'
    },
    buttonFact: {
        backgroundColor: '#17A2B8'
    },
    buttonClose: {
        with: '100%',
        marginLeft: '90%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    modalContent: {
        backgroundColor: '#28A745'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 15,
        width: 250,
        marginBottom: 25
    },
    buttonSubmit: {
        color: 'white',
        borderRadius: 10,
        backgroundColor: '#29abe2'
    }
});