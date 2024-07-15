import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import 'moment/locale/id';
import { ToastAndroid, Linking } from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
moment.locale('id');

export const isTimeBetween = (startTime, endTime, serverTime) => {
  let start = moment(startTime, 'H:mm');
  let end = moment(endTime, 'H:mm');
  let server = moment(serverTime, 'H:mm');
  if (end < start) {
    return (
      (server >= start && server <= moment('24:00:00', 'h:mm:ss')) ||
      (server >= moment('0:00:00', 'h:mm:ss') && server < end)
    );
  }
  return server >= start && server < end;
};

export const getSnackBar_success = (data) => {
  return setTimeout(() => {
    ToastAndroid.showWithGravity(
      data.title,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }, 300);
  // Snackbar.show({
  //   text: data.title,
  //   backgroundColor: '#4BB543',
  //   duration: Snackbar.LENGTH_LONG,
  //   numberOfLines: 8,
  //   onShow: () => {
  //     //log
  //   },
  //   onHide: () => {
  //     //log
  //   },
  //   action: {
  //     text: 'Ok',
  //     textColor: 'white',
  //     onPress: () => {},
  //   },
  // });
};

export const openLinkWeb = async (link) => {
  try {
    const url = link;
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#4F6CFF',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#4F6CFF',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
    } else Linking.openURL(url);
  } catch (error) {
    // console.log(error.message);
  }
};

export const getSnackBar_error = (data) => {
  return setTimeout(() => {
    ToastAndroid.showWithGravity(
      data.title,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    // Snackbar.show({
    //   text: data.title,
    //   backgroundColor: '#FD0000',
    //   duration: Snackbar.LENGTH_INDEFINITE,
    //   numberOfLines: 8,
    //   onShow: () => {
    //     //log
    //   },
    //   onHide: () => {
    //     //log
    //   },
    //   action: {
    //     text: 'Ok',
    //     textColor: 'white',
    //     onPress: () => {},
    //   },
    // });
  }, 300);
};

export const getError = (data) => {
  let showSnackbar = setTimeout(() => {
    Snackbar.show({
      text: data.title,
      backgroundColor: '#FD0000',
      duration: Snackbar.LENGTH_INDEFINITE,
      numberOfLines: 8,
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
  }, 6000);
  return showSnackbar;
};

export const getRupiah = (angka) => {
  if (angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('');
  } else {
    return angka;
  }
};

export const getTimeOnly = (start, end) => {
  let d = moment
    .utc(moment(end, ' HH:mm:ss').diff(moment(start, ' HH:mm:ss')))
    .format('H:mm');
  let jam = d.split(':')[0];
  let menit = d.split(':')[1];
  let times = '';

  if (menit === 0) {
    times = jam + ' j';
  } else {
    times = jam + ' j ' + menit + ' m';
  }
  return times;
};

export const getTimeShort = (depDate, arvDate) => {
  let then = depDate;
  let now = arvDate;
  let ms = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
    moment(then, 'DD/MM/YYYY HH:mm:ss'),
  );
  let d = moment.duration(ms);
  let hari = d.days();
  let jam = d.hours();
  let menit = d.minutes() === 0 ? '' : ' ' + d.minutes() + 'm';
  let times = '';

  if (hari === 0) {
    times = jam + 'j' + menit;
  } else if (jam === 0) {
    times = menit;
  } else {
    times = hari + ' h ' + jam + ' j' + menit;
  }
  return times;
};

export const getTime = (depDate, depTime, arvDate, arvTime) => {
  let then = `${moment(depDate).format('DD/MM/YYYY')} ${depTime}:00`;
  let now = `${moment(arvDate).format('DD/MM/YYYY')} ${arvTime}:00`;
  let ms = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
    moment(then, 'DD/MM/YYYY HH:mm:ss'),
  );
  let d = moment.duration(ms);
  let hari = d.days();
  let jam = d.hours();
  let menit = d.minutes() === 0 ? '' : ' ' + d.minutes() + ' menit';
  let times = '';

  if (hari === 0) {
    times = jam + ' jam' + menit;
  } else if (jam === 0) {
    times = menit;
  } else {
    times = hari + ' hari ' + jam + ' jam' + menit;
  }
  return times;
};

export const getTimeFull = (depDate, arvDate) => {
  let then = depDate;
  let now = arvDate;
  let ms = moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
    moment(then, 'DD/MM/YYYY HH:mm:ss'),
  );
  let d = moment.duration(ms);
  let hari = d.days();
  let jam = d.hours();
  let menit = d.minutes() === 0 ? '' : ' ' + d.minutes() + ' menit';
  let times = '';

  if (hari === 0) {
    times = jam + ' jam' + menit;
  } else if (jam === 0) {
    times = menit;
  } else {
    times = hari + ' hari ' + jam + ' jam' + menit;
  }
  return times;
};

export const setSession = async (data) => {
  try {
    await AsyncStorage.setItem(data.name, data.value);
  } catch (error) {
    //log
  }
};

export const getSession = async (name) => {
  try {
    let result = await AsyncStorage.getItem(name);
    return result;
  } catch (error) {
    //log
  }
};

export const getDeviceID = async (data) => {
  try {
    let result = await DeviceInfo.getUniqueId().then((uniqueId) => {
      return uniqueId;
    });
    return result;
  } catch (error) {
    //log
  }
};

export const replacePhone = (Source, stringToFind, stringToReplace) => {
  if (stringToFind.indexOf('+62') != -1) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);

    while (index != -1) {
      temp = temp.replace(stringToFind, stringToReplace);
      index = temp.indexOf(stringToFind);
    }

    return temp;
  } else {
    return stringToFind;
  }
};

export const findAndReplace = async (data) => {
  try {
    if (data.stringToFind.indexOf('+62') != -1) {
      var temp = data.Source;
      var index = temp.indexOf(data.stringToFind);

      while (index != -1) {
        temp = temp.replace(data.stringToFind, data.stringToReplace);
        index = temp.indexOf(data.stringToFind);
      }

      return temp;
    } else {
      return data.stringToFind;
    }
  } catch (error) {
    //log
  }
};

export const getClass = (code) => {
  let kelas = '';
  if (code === 'E') {
    kelas = 'Economy';
  } else if (code === 'PE') {
    kelas = 'Premium Economy';
  } else if (code === 'B') {
    kelas = 'Business';
  } else if (code === 'F') {
    kelas = 'First';
  } else {
    kelas = 'Premium First';
  }
  return kelas;
};
