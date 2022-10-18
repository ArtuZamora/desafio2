import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Conversor = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [units, setUnits] = useState('');
    const [conversion, setConversion] = useState('');

    const isNumber = (value) => {
        var isDecimal = value.match(/^(\d+\.?\d*|\.\d+)$/);
        return isDecimal;
    }

    const valueListener = (value) => {
        if (!isNumber(value)) {
            setValue('');
        }
        else
            setValue(value);
        convert(conversion, value);
    }

    const convert = (conv, value = '') => {
        setConversion(conv);
        setUnits(conv.toUpperCase());
        let factor = 1;
        switch (conv) {
            case 'svc':
                factor = 8.75;
                break;
            case 'mxn':
                factor = 21.46;
                break;
            case 'eur':
                factor = 0.86;
                break;
            case 'gbp':
                factor = 0.78;
                break;
            case 'chf':
                factor = 0.92;
                break;
        }
        if (value == '')
            setResult('');
        else {
            let valConv = parseFloat(value);
            let conversion = valConv * factor;
            setResult(parseFloat(conversion.toFixed(5)));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.col1}>
                    <Text>Ingrese cantidad en USD</Text>
                    <View style={styles.row}>
                        <View style={styles.resutlView}>
                            <TextInput keyboardType='numeric' style={styles.input} value={value} onChangeText={(value) => valueListener(value)} />
                        </View>
                        <View style={styles.unitsView}>
                            <Text style={styles.units}>USD</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.container2}>
                <Picker
                    style={styles.select}
                    selectedValue={conversion}
                    onValueChange={(itemValue, itemIndex) => {
                        convert(itemValue, value);
                    }}>
                    <Picker.Item label="Seleccione conversión..." value="usd" />
                    <Picker.Item label="SVC (Colón salvadoreño)" value="svc" />
                    <Picker.Item label="MXN (Pesos mexicanos)" value="mxn" />
                    <Picker.Item label="EUR (Euros)" value="eur" />
                    <Picker.Item label="GBP (Libra esterlina)" value="gbp" />
                    <Picker.Item label="CHF (Franco suizo)" value="chf" />
                </Picker>
                <View style={styles.col}>
                    <Text>Resultado</Text>
                    <View style={styles.row}>
                        <View style={styles.resutlView}>
                            <Text style={styles.result}>{result}</Text>
                        </View>
                        <View style={styles.unitsView}>
                            <Text style={styles.units}>{units}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Conversor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 15
    },
    container2: {
        flex: 2
    },
    select: {
        backgroundColor: '#7F7FA4',
        margin: 15,
        color: 'white',
        marginBottom: 40,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 30,
        textAlign: 'right',
    },
    inputView: {
        marginBottom: 20,
        justifyContent: 'flex-end',
        flex: 1
    },
    col1: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    col: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    result: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 30,
        textAlign: 'right',
    },
    units: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray'
    },
    resutlView: {
        flex: 4,
        flexDirection: 'column'
    },
    unitsView: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
        paddingTop: 15
    }
});