// React Native Date Picker – To Pick the Date using Native Calendar
// https://aboutreact.com/react-native-datepicker/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

//import DatePicker from the package we installed
import DatePicker from 'react-native-datepicker';

export default function Calendar() {
  const [date, setDate] = useState('09-10-2020');

  return (
    <View>
      <DatePicker
        date={date} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2022"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={date => {
          setDate(date);
        }}
      />
      <Text>You have chosen {date}</Text>
    </View>
  );
}
