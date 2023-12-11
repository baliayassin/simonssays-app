import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {RootState, store} from './src/store/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {appendElement} from './src/Features/sequenceSlice';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import useRandomSequence from './src/Hooks/useRandomSequence';
import Highscores from './src/components/Highscores';
import useSounds from './src/Hooks/useSounds';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {

  useEffect(() => {
      Orientation.lockToPortrait();
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={App}/>
          <Stack.Screen name="Highscores" component={Highscores} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export type RootStackParamList = {
  Home: undefined;
  Highscores: {
    score: number;
    restartGame: () => void;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const App = ({navigation}: Props) => {
  const [clickedColor, setClickedColor] = useState<number>();
  const dispatch = useDispatch();
  const nameModalVisible = useSelector(
    (state: RootState) => state.nameModal.showModal,
  );
  const currentColor = useSelector(
    (state: RootState) => state.simonSequence.currentColor,
  );
  const {isActive, score, restartGame, simonSpeaks} = useRandomSequence();
  const blip = useSounds();

  useEffect(() => {
    nameModalVisible &&
      navigation.navigate(
        'Highscores',
        {
          score: score,
          restartGame: restartGame,
        } as never,
      );
  }, [nameModalVisible]);

  const handleClick = (number: number) => {
    !simonSpeaks && isActive && dispatch(appendElement(number));
  };

  const handlePressIn = (colorId: number) => {
    if(!simonSpeaks && isActive){
      blip[colorId-1]?.play()
      setClickedColor(colorId);
    }
  };

  const ColorBox = (
    colorId: number,
    colorStringIn: string,
    colorStringOut: string,
  ) => {
    let borderTopLeftRadius = 0;
    let borderTopRightRadius = 0;
    let borderBottomLeftRadius = 0;
    let borderBottomRightRadius = 0;

    // set color radius
    if (colorId === 1) {
      borderTopLeftRadius = 200;
      borderTopRightRadius= 10;
      borderBottomLeftRadius = 10;
      borderBottomRightRadius= 10;
    } else if (colorId === 3) {
      borderTopLeftRadius = 20;
      borderTopRightRadius= 20;
      borderBottomLeftRadius = 200;
      borderBottomRightRadius= 20;
    } else if (colorId === 4) {
      borderTopRightRadius= 20;
      borderTopLeftRadius = 10;
      borderBottomLeftRadius = 10;
      borderBottomRightRadius= 200;
    } else if (colorId === 2) {
      borderTopRightRadius= 200;
      borderTopLeftRadius = 10;
      borderBottomLeftRadius = 10;
      borderBottomRightRadius= 10;
    }
    return (
      <TouchableOpacity
        onPress={() => handleClick(colorId)}
        onPressIn={() => handlePressIn(colorId)}
        onPressOut={() => setClickedColor(-1)}
        style={{
          flex: 1,
          backgroundColor:
            currentColor === colorId || clickedColor === colorId
              ? colorStringIn
              : colorStringOut,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
      }}>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
    <View
      style={styles.wrapper}>
      <View style={styles.colorContainer}>
        <View style={styles.circle}>
          {!isActive ? (
            <TouchableOpacity onPress={restartGame} style={styles.startContainer}>
              <Text style={styles.startText}>Play</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.score}>{score}</Text>
          )}
        </View>
        <View style={styles.colorRow}>
          {ColorBox(1, 'rgb(0,225,0)', 'rgb(0,50,0)')}
          <View style={styles.divide}/>
          {ColorBox(2, 'rgb(225,0,0)', 'rgb(50,0,0)')}
        </View>
        <View style={styles.colorRow}>
          {ColorBox(3, 'rgb(225,225,0)', 'rgb(50,50,0)')}
          <View style={styles.divide}/>
          {ColorBox(4, 'rgb(0,0,225)', 'rgb(0,0,50)')}
        </View>
      </View>
    </View>
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    height: 400,
    width: 400,
    overflow: 'hidden',
    position: 'absolute',
    marginTop: '40%',
    left: '3%',
    backgroundColor: '#1D1F20',
    borderRadius: 250,
    borderWidth: 12,
  },
  wrapper:{
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    height: '100%',
  },
  divide:{
    height:'100%',
    width:'5%',
    backgroundColor:'#1D1F20'
  },
  score: {
    fontSize: 48,
    textAlign: 'center',
    margin: '10%',
    color: 'black',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  startText: {
    color: 'black',
    fontSize: 48,
  },
  circle: {
    height: 180,
    borderRadius: 100,
    width: 180,
    position: 'absolute',
    top: '48%',
    transform: [{translateY: -100}],
    zIndex: 1,
    left: '26%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor:'rgb(0,0,0)',
    borderWidth:10
  },
  startContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft:'5%',
    width:'90%',
    height: '50%',
    paddingBottom:'5%',
  },
});

export default AppWrapper;
