import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {hideModal} from '../Features/modalSlice';
import {Text, View, Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  saveScore: (name: string, score: number) => Promise<void>;
  score: number
}

const NameModal = ({saveScore, score} : Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('')

  const handleHideModal = () => {
    saveScore(playerName, score)
    dispatch(hideModal());
  };

  const resultsModalVisible = useSelector(
    (state: RootState) => state.nameModal.showModal,
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={resultsModalVisible}
      onRequestClose={() => {
        dispatch(hideModal());
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Name</Text>
          <TextInput
            style={{height: 40, color: 'black'}}
            placeholder="Your Name"
            onChangeText={e => setPlayerName(e)}
            defaultValue={playerName}
          />
          <LinearGradient
          colors={['#2DC8AE', '#388ed9']}
          style={[styles.gradientBtn,{opacity: playerName === '' ? 0.5 : 1 }]}
          start={{x: 0, y: 0.0}}
          end={{x: 0.7, y: 0.9}}
          locations={[0.4, 1]}>
            <TouchableOpacity
              disabled={playerName === '' ? true : false}
              style={[styles.button, styles.buttonClose]}
              onPress={handleHideModal}
             >
             <Text style={styles.textStyle}>Show HighScores</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
  gradientBtn:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor:'red',
    width:150,
    height:40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
});
export default NameModal;
