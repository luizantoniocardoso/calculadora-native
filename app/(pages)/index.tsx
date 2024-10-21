import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default function Calculadora() {
  const buttons = ['AC', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '3', '2', '1', '+', '0', '.', '='];
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [operationPending, setOperationPending] = useState(false);

  const handleInput = (buttonPressed:any) => {
    if (buttonPressed === 'AC') {
      setCurrentNumber('');
      setLastNumber('');
      setOperationPending(false);
      return;
    }
    if (buttonPressed === 'DEL') {
      setCurrentNumber(currentNumber.slice(0, -1));
      return;
    }
    if (buttonPressed === '=') {
      calculate();
      return;
    }
    if (['+', '-', '*', '/', '%'].includes(buttonPressed)) {
      if (operationPending) calculate();
      setCurrentNumber((prev) => prev + ' ' + buttonPressed + ' ');
      setOperationPending(true);
      return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  const calculate = () => {
    try {
      const result = eval(currentNumber.replace(/ /g, '')); 
      setLastNumber(currentNumber + ' = ');
      setCurrentNumber(result.toString());
      setOperationPending(false);
    } catch (error) {
      setCurrentNumber('Erro');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.lastNumber}>{lastNumber}</Text>
        <Text style={styles.currentNumber}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleInput(button)}>
            <Text style={styles.textbutton}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  display: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 200,
    backgroundColor: '#6c6c6c6c',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  lastNumber: {
    fontSize: 24,
    color: '#888',
  },
  currentNumber: {
    fontSize: 48,
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 60,
    minWidth: 60,
    margin: 5,
    borderRadius: 10,
  },
  textbutton: {
    color: '#5b5b5b',
    fontSize: 25,
  },
});
