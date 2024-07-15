import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

const keyObj = {
  general: '',
};

const translateKey = (value) => {
  if (keyObj[value] !== undefined) {
    return keyObj[value];
  } else {
    return value;
  }
};

export const getErrorGlobal = async (msg, timeout = 0) => {
  await AsyncStorage.getItem('errorMessage').then((token) => {
    if (token) {
      const errorObj = JSON.parse(token);

      const haveParameter = (objKey) => {
        if (objKey.includes('TRX_MIN_AMOUNT')) {
          const keyArr = objKey.split('_');
          const number = keyArr[keyArr.length - 1];
          const message = errorObj['TRX_MIN_AMOUNT'].replace('[x]', number);
          return message;
        }
        if (objKey.includes('TRX_MAX_AMOUNT')) {
          const keyArr = objKey.split('_');
          const number = keyArr[keyArr.length - 1];
          const message = errorObj['TRX_MAX_AMOUNT'].replace('[x]', number);
          return message;
        }
        if (objKey.includes('MIN') || objKey.includes('MAX')) {
          const keyArr = objKey.split('_');
          const prefix = keyArr[0];
          const number = keyArr[keyArr.length - 1];
          const message = errorObj[prefix].replace('[x]', number);
          return message;
        }

        return errorObj[objKey];
      };

      const messageArr = [];
      let messageStr = '';
      Object.keys(msg).forEach((key) => {
        let valueKey = msg[key];

        if (Array.isArray(valueKey)) {
          valueKey.forEach((itemKey) => {
            let messageSave = `${translateKey(key)} ${haveParameter(itemKey)}`;
            messageArr.push(messageSave);
            if (messageStr === '') {
              messageStr += messageSave;
            } else {
              messageStr += '\n' + messageSave;
            }
          });
        } else {
          let messageSave = `${translateKey(key)} ${haveParameter(valueKey)}`;
          messageArr.push(messageSave);
          if (messageStr === '') {
            messageStr += messageSave;
          } else {
            messageStr += '\n' + messageSave;
          }
        }
      });

      setTimeout(() => {
        Snackbar.show({
          text: messageStr,
          backgroundColor: '#FD0000',
          duration: Snackbar.LENGTH_INDEFINITE,
          numberOfLines: 15,
          onShow: () => {
            //log
          },
          onHide: () => {
            //log
          },
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {},
          },
        });
      }, timeout);
    } else {
      setTimeout(() => {
        Snackbar.show({
          text: 'Terjadi Kesalahan hubungi customer service',
          backgroundColor: '#FD0000',
          duration: Snackbar.LENGTH_INDEFINITE,
          numberOfLines: 15,
          onShow: () => {
            //log
          },
          onHide: () => {
            //log
          },
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {},
          },
        });
      }, timeout);
    }
  });
};

export const getErrorGlobalForm = async (msg, timeout = 0) => {
  await AsyncStorage.getItem('errorMessage').then((token) => {
    if (token) {
      const errorObj = JSON.parse(token);

      const haveParameter = (objKey) => {
        if (objKey.includes('MIN') || objKey.includes('MAX')) {
          const keyArr = objKey.split('_');
          const prefix = keyArr[0];
          const number = keyArr[1];
          const message = errorObj[prefix].replace('[x]', number);
          return message;
        } else {
          return errorObj[objKey];
        }
      };

      const messageArr = [];
      let messageStr = '';
      Object.keys(msg).forEach((key) => {
        let valueKey = msg[key];
        if (Array.isArray(valueKey)) {
          valueKey.forEach((itemKey) => {
            let messageSave = `${translateKey(key)} ${haveParameter(itemKey)}`;
            messageArr.push(messageSave);
            if (messageStr === '') {
              messageStr += messageSave;
            } else {
              messageStr += '\n' + messageSave;
            }
          });
        } else {
          let messageSave = `${translateKey(key)} ${haveParameter(valueKey)}`;
          messageArr.push(messageSave);
          if (messageStr === '') {
            messageStr += messageSave;
          } else {
            messageStr += '\n' + messageSave;
          }
        }
      });

      setTimeout(() => {
        Snackbar.show({
          text: messageStr,
          backgroundColor: '#FD0000',
          duration: Snackbar.LENGTH_INDEFINITE,
          numberOfLines: 15,
          onShow: () => {
            //log
          },
          onHide: () => {
            //log
          },
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {},
          },
        });
      }, timeout);
    } else {
      setTimeout(() => {
        Snackbar.show({
          text: 'Terjadi Kesalahan hubungi customer service',
          backgroundColor: '#FD0000',
          duration: Snackbar.LENGTH_INDEFINITE,
          numberOfLines: 15,
          onShow: () => {
            //log
          },
          onHide: () => {
            //log
          },
          action: {
            text: 'Ok',
            textColor: 'white',
            onPress: () => {},
          },
        });
      }, timeout);
    }
  });
};
