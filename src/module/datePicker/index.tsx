import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import CustomTextInputComponent from '../../components/textInput';
import {TextInput} from 'react-native-paper';

interface Props {
  setAnswer: (e: any) => void;
}

const DatePickerComponent: React.FC<Props> = ({setAnswer}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomTextInputComponent
        label={undefined}
        right={
          <TextInput.Icon icon={'calendar'} onPress={() => setOpen(!open)} />
        }
        mode="outlined"
        editable={false}
        placeholder={date.toDateString()}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setAnswer(date.toDateString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
    </>
  );
};

export default DatePickerComponent;
