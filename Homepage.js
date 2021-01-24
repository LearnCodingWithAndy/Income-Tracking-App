import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, useWindowDimensions } from 'react-native';
import Todo from './Todo';
import { LineChart } from "react-native-chart-kit";
import moment from 'moment';

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

const Homepage = ({ navigation }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState(0);
    const [transformedData, setTransformedData] = useState([]);
    const [data, setData] = useState([

    ]);

    useEffect(() => {
        setTransformedData(transformData(groupBy(data, 'date')))
    }, [data]);

    const [entries, setEntries] = useState([

    ]);

    const groupBy = (dataArray, key) =>
        dataArray.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});

    const getDates = () => transformedData.map(pair => pair.date);
    const getAmounts = () => transformedData.map(pair => pair.amount);

    const transformData = (groupedData) => {
        const newData = [];

        Object.entries(groupedData).forEach(value => {
            const total = value[1].reduce((total, pair) => total = + pair.amount, 0);
            newData.push({ date: moment(value[0]).format('MMM D'), amount: total });
        });

        const temp = newData.sort((a, b) => a['date'].diff(b['date']))

        return temp;
    }

    useEffect(() => {
        setTotal(entries.reduce((total, entry) => total + Number(entry.amount), 0))
    }, [entries])

    const addEntry = () => {
        setEntries([...entries, {
            description: description,
            amount: amount,
            date: new Date()
        }]);

        setData([
            ...data,
            {
                date: moment().format('LL'),
                amount: Number(amount)
            }
        ]);

        setDescription('')
        setAmount('')
    }

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.titleText}>Income Tracking App</Text>
            </View>

            <Button title='Login' onPress={() => navigation.navigate('Login')} />

            <View>
                <Text>My Income Chart</Text>
                <LineChart
                    data={{
                        labels: getDates(),
                        datasets: [
                            {
                                data: getAmounts(),
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

export default Homepage;
