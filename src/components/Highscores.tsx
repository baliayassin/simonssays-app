import React from 'react';
import NameModal from './NameModal';
import useHighscores from '../Hooks/useHighscores';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Text, View, StyleSheet,Platform, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Highscores'>;

const Highscores = ({route, navigation}: Props) => {
  const {score} = route.params;
  const {saveScore, scoreList} = useHighscores();
  const ScoreList = scoreList.map((score, idx) => {
    return (
        <Text key={idx} style={styles.scoretext}>
        {score.name || 'No Name'}: {score.score}
      </Text>
    );
  });
  return (
    <View style={styles.container}>
      <View style={{height:650,marginBottom:100}}>
        <NameModal saveScore={saveScore} score={score} />
      <Text style={styles.title}>Highscores</Text>
      <View style={styles.shadowContainer}>{ScoreList}</View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <LinearGradient
          colors={['#2DC8AE', '#388ed9']}
          style={styles.linearGradient}
          start={{x: 0, y: 0.0}}
          end={{x: 0.7, y: 0.9}}
          locations={[0.4, 1]}>
            <TouchableOpacity
              style={styles.startbtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btntext}>Play Again</Text>
            </TouchableOpacity>
          </LinearGradient> 
       </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  linearGradient:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor:'red',
    width:150,
    height:40,
  },
  shadowContainer:{
    flex:1,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    marginBottom:20
  },
  title: {
    fontSize: 48,
    margin: '10%',
    color: 'black',
  },
  startbtn: {
    width:100,
    height: 20,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
  scoretext: {
    fontSize: 20,
    textAlign: 'center',
    margin: 2,
    color: 'black',
  },
});
export default Highscores;
