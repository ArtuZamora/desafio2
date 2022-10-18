import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';

const Calculator = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState('');

    const factorial = (num) => {
        var total = 1;
        for (let i = 1; i <= num; i++) {
            total = total * i;
        }
        return total;
    }

    const digitate = (num) => {
        let num1Act = num1;
        if (operation == '=') {
            setOperation('');
            setNum1('');
            setNum2('');
            setResult('');
            num1Act = '';
        }
        switch (operation) {
            case '+':
            case '-':
            case 'x':
            case '/':
                let n2 = num2 + num;
                setNum2(n2);
                setResult(n2);
                break;
            default:
                let n1 = num1Act + num;
                setNum1(n1);
                setResult(n1);
                break;
        }
    }

    const operate = (oper) => {
        setOperation(oper);
        switch (oper) {
            case 'C':
                setNum1('');
                setNum2('');
                setOperation('')
                setResult('');
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                setResult('');
                break;
            case '=':
                let n1 = parseInt(num1);
                let n2 = parseInt(num2);
                let result;
                switch (operation) {
                    case '+':
                        result = n1 + n2;
                        break;
                    case '-':
                        result = n1 - n2;
                        break;
                    case 'x':
                        result = n1 * n2;
                        break;
                    case '/':
                        result = (n1 / n2);
                        break;
                    case '√':
                        result = Math.sqrt(n1);
                        break;
                    case '!':
                        result = factorial(n1);
                        break;
                }
                result = result == undefined ? '' : result;
                setResult(result);
                setNum1(result);
                setNum2('');
                break;
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.resultDiv}>
                <Text style={styles.result}>{result}</Text>
            </View>
            <View style={styles.buttonsDiv}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('C')}>
                        <Text style={styles.textNumber}>C</Text>
                    </TouchableOpacity>
                    <View style={styles.emptyNumber}>

                    </View>
                    <View style={styles.emptyNumber}>

                    </View>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('!')}>
                        <Text style={styles.textNumber}>!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('7')}>
                        <Text style={styles.textNumber}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('8')}>
                        <Text style={styles.textNumber}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('9')}>
                        <Text style={styles.textNumber}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('√')}>
                        <Text style={styles.textNumber}>√</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('4')}>
                        <Text style={styles.textNumber}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('5')}>
                        <Text style={styles.textNumber}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('6')}>
                        <Text style={styles.textNumber}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('/')}>
                        <Text style={styles.textNumber}>/</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('1')}>
                        <Text style={styles.textNumber}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('2')}>
                        <Text style={styles.textNumber}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('3')}>
                        <Text style={styles.textNumber}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('x')}>
                        <Text style={styles.textNumber}>x</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => digitate('0')}>
                        <Text style={styles.textNumber}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('=')}>
                        <Text style={styles.textNumber}>=</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('-')}>
                        <Text style={styles.textNumber}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNumber} onPress={() => operate('+')}>
                        <Text style={styles.textNumber}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    resultDiv: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#201341'
    },
    buttonsDiv: {
        flex: 4,
        backgroundColor: '#420874'
    },
    result: {
        fontSize: 50,
        textAlign: 'right',
        color: 'white',
        marginRight: '6%',
        fontFamily: 'sans-serif-thin',
        fontWeight: 'bold'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    emptyNumber: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    buttonNumber: {
        backgroundColor: '#521A85',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },
    textNumber: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'sans-serif-thin',
        fontWeight: 'bold'
    }
});

export default Calculator;
