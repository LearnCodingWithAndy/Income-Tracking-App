import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, useWindowDimensions } from 'react-native';
import Todo from './Todo';
import { LineChart, BarChart } from "react-native-chart-kit";

const App = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState([
    {
      description: "Start",
      amount: 100,
      timestamp: new Date(),
    }
  ]);

  useEffect(() => {
    setTotal(entries.reduce((total, entry) => total + Number(entry.amount), 0))
  }, [entries])

  const addEntry = () => {
    setEntries([...entries, {
      description: description,
      amount: amount,
      timestamp: new Date()
    }]);

    setDescription('')
    setAmount('')
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>Income Tracking App</Text>
      </View>

      <View>
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width}
          height={230}
          yAxisLabel="₹"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 20
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 20,
          }}
        />
      </View>

      <View>
        <Text style={styles.totalIncome}>
          Total Income: ₹{total}
        </Text>
      </View>

      <TextInput
        style={styles.todoInput}
        value={description}
        placeholder="Enter the description"
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.todoInput}
        value={amount}
        placeholder="Enter the amount that you made in INR (₹)"
        keyboardType="numeric"
        onChangeText={text => setAmount(text)}
      />
      <Button disabled={!amount && !description} onPress={addEntry} title="Add Entry🚀🚀🚀" />

      {entries.map(entry => (
        <View>
          <Text>
            {entry.description}
          </Text>
          <Text>
            ₹{entry.amount}
          </Text>
        </View>
      ))}

    </SafeAreaView>
  );
}

export default App

const styles = StyleSheet.create({
  todoInput: {
    margin: 10,
    height: 40,
    borderColor: "black",
    borderWidth: 2.5,
    borderRadius: 4
  },
  titleText: {
    marginTop: 30,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  totalIncome: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
