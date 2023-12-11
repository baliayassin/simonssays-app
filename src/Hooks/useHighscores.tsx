import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

type scoreObject = {
  name: string;
  score: number;
};

const path = RNFS.DocumentDirectoryPath + '/highscores.txt';
const MAX_LIST_LENGTH = 10;

export default function useHighscores() {
  const [fileContent, setFileContent] = useState<Array<scoreObject>>([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      if (!(await RNFS.exists(path))) return createFile();
      readFile();
    } catch (err) {
      console.log(err);
    }
  };


  const createFile = async () => {
    RNFS.writeFile(path, '').catch(err => {
      console.log(err.message);
    });
  };

  const readFile = async () => {
    return new Promise(async resolve => {
      RNFS.readFile(path)
        .then(content => {
          let scoreArray = content.split('|');
          scoreArray.pop();
          let scoreJSON = scoreArray.map(item => {
            return JSON.parse(item);
          });
          setFileContent(scoreJSON);
          resolve('Done');
        })
        .catch(err => console.log(err.message));
    });
  };


  const saveScore = async (name: string, score: number) => {
    let playerName = name.replace('|', '');
    await readFile();
    let newFileContent = sortHighscoreList(playerName, score).slice(
      0,
      MAX_LIST_LENGTH,
    );
    setFileContent(newFileContent);
    let str = '';
    newFileContent.forEach(
      item =>
        (str += JSON.stringify({name: item.name, score: item.score}) + '|'),
    );
    RNFS.writeFile(path, str).catch(err => {
      console.log(err.message);
    });
  };

  const sortHighscoreList = (name: string, score: number) => {
    let tempFileContent = [...fileContent];
    tempFileContent.push({name: name, score: score});
    let arrLength = tempFileContent.length || 0;
    for (let i = 0; i < arrLength - 1; i++) {
      for (let j = i + 1; j < arrLength; j++) {
        if (tempFileContent[j].score > tempFileContent[i].score) {
          let temp = tempFileContent[i];
          tempFileContent[i] = tempFileContent[j];
          tempFileContent[j] = temp;
        }
      }
    }
    return tempFileContent;
  };

  return {saveScore: saveScore, scoreList: fileContent};
}
