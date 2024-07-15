import {Platform} from 'react-native';
import {getError, getSession} from '../helpers/Helpers';
import DeviceInfo from 'react-native-device-info';
// import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
// import {API_URL, API_URL_GROSIR, API_KEY, API_SECRET} from '@env';

let API_MOCKY = 'https://run.mocky.io';

const md5 = require('md5');

export const useApiPost_demo = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: 'POST',
    url: API_MOCKY + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGrosirPut = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: 'PUT',
    url: "https://www.appstopindopay.com:6060" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5('RA0t2UwidN' + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGrosirDelete = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: 'DELETE',
    url: "https://www.appstopindopay.com:6060" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGrosirPost = async (url, data, config) => {
  let method;
  if (config) {
    method = config.method;
  } else {
    method = 'POST';
  }

  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: method ? method : 'POST',
    url: "https://www.appstopindopay.com:6060" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGrosirGet = async (url) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: 'GET',
    url: "https://www.appstopindopay.com:6060" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGetError = async (url) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;

  const res = axios({
    method: 'GET',
    url: "https://www.appstopindopay.com:6060" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      secretkey: 'KnDMc44u2Y',
      'User-Agent': useragent,
    },
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiPostLogin = async (url, token, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};
  let token_ = token

  const res = axios({
    method: 'POST',
    url: "https://www.apps-uwang.com:5050" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      // console.log('respon', response)
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiPost = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  // console.log(JSON.stringify({
  //   method: 'POST',
  //   url: API_URL + `${url}`,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     topindotoken: token_ ? token_ : '',
  //     topindosecret: md5(md5(md5(API_KEY + API_SECRET + uuid))),
  //     'User-Agent': useragent,
  //   },
  //   data: body,
  // }))

  const res = axios({
    method: 'POST',
    url: "https://www.apps-uwang.com:5050" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      // console.log('respon', response)
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      // console.log(error)
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiGet = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let body = {...data, uuid};

  let token_ = await getSession('token').then((token) => {
    return token;
  });

  const res = axios({
    method: 'GET',
    url: "https://www.apps-uwang.com:5050" + `${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      topindotoken: token_ ? token_ : '',
      topindosecret: md5(md5(md5('RA0t2UwidN' + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
      'User-Agent': useragent,
    },
    data: body,
  })
    .then(function (response) {
      if (response) {
        let status = response.status;
        let resp = response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      }
    })
    .catch(function (error) {
      if (error.response) {
        let status = error.response.status;
        let resp = error.response.data;
        let pushRes = {
          statusCode: status,
          values: resp,
        };
        return pushRes;
      } else if (error.request) {
        let er = error.toString();
        if (useErrorIn(er)) {
          getError({
            title:
              'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
            duration: 'LENGTH_INDEFINITE',
          });
        } else {
          throw new Error(error);
        }
      } else {
        // errors
      }
    });

  return await res;
};

export const useApiPostUpload = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let tok_ = await getSession('token').then((token) => {
    return token;
  });

  let imgs;
  if (data.ktpImageUrl?.uri) {
    imgs = {
      name: 'ktpImageUrl',
      filename: `user.jpg`,
      type: 'image/png',
      // data: RNFetchBlob.wrap(data.ktpImageUrl.uri),
    };
  } else {
    imgs = {name: 'ktpImageUrl', data: ''};
  }

  let imgs2;
  if (data.selfieImageUrl?.uri) {
    imgs2 = {
      name: 'selfieImageUrl',
      filename: `user2.jpg`,
      type: 'image/png',
      // data: RNFetchBlob.wrap(data.selfieImageUrl.uri),
    };
  } else {
    imgs2 = {name: 'selfieImageUrl', data: ''};
  }

  let pin_ = '';
  if (data.accessToken) {
    pin_ = null;
  } else {
    pin_ = {name: 'pin', data: data.pin ? data.pin.toString() : ''};
  }

  let body = [
    imgs,
    imgs2,
    {name: 'uuid', data: uuid.toString()},
    {name: 'name', data: data.name.toString()},
    {name: 'gender', data: data.gender.toString()},
    {name: 'phone', data: data.phone.toString()},
    {name: 'ktp', data: data.ktp.toString()},
    {name: 'bussinessType', data: data.bussinessType.toString()},
    {name: 'qrisName', data: data.qrisName.toString()},
    {name: 'email', data: data.email.toString()},
    {name: 'provinceId', data: data.provinceId.toString()},
    {name: 'districtId', data: data.districtId.toString()},
    {name: 'cityId', data: data.cityId.toString()},
    {name: 'address', data: data.address.toString()},
    {name: 'postalCode', data: data.postalCode.toString()},
    {name: 'income', data: data.income.toString()},
    pin_,
  ];

  // const res = await RNFetchBlob.config({
  //   //fileCache: true,
  //   //trusty: true,
  // })
  //   .fetch(
  //     'POST',
  //     "https://www.apps-uwang.com:5050" + `${url}`,
  //     {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       topindotoken: tok_ ? tok_ : '',
  //       topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
  //       'User-Agent': useragent,
  //     },
  //     body,
  //   )
  //   .then((response) => {
  //     let status = response.info().status;
  //     const data = response.json();
  //     return Promise.all([status, data]);
  //   });

  let responses = {
    statusCode: res[0],
    values: res[1],
  };

  return await responses;
};

export const useApiUpdateAvatar = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let tok_ = await getSession('token').then((token) => {
    return token;
  });

  let token_ = '';
  if (data.accessToken) {
    token_ = data.accessToken;
  } else {
    token_ = tok_;
  }

  let imgs;
  if (data.avatarImageUrl?.uri) {
    imgs = {
      name: 'avatarImageUrl',
      filename: `user.jpg`,
      type: 'image/png',
      // data: RNFetchBlob.wrap(data.avatarImageUrl.uri),
    };
  } else {
    imgs = {name: 'avatarImageUrl', data: ''};
  }

  let body = [
    imgs,
    {name: 'uuid', data: uuid.toString()},
  ];


  // console.log(JSON.stringify({
  //   method: 'POST',
  //   url: API_URL + `${url}`,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //     topindotoken: token_ ? token_ : '',
  //     topindosecret: md5(md5(md5(API_KEY + API_SECRET + uuid))),
  //     'User-Agent': useragent,
  //   },
  //   data: body,
  // }))


  // const res = await RNFetchBlob.config({
  //   //fileCache: true,
  //   //trusty: true,
  // })
  //   .fetch(
  //     'POST',
  //     "https://www.apps-uwang.com:5050" + `${url}`,
  //     {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       topindotoken: token_ ? token_ : '',
  //       topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
  //       'User-Agent': useragent,
  //     },
  //     body,
  //   )
  //   .then((response) => {
  //     let status = response.info().status;
  //     const data = response.json();
  //     return Promise.all([status, data]);
  //   });

  let responses = {
    statusCode: res[0],
    values: res[1],
  };

  return await responses;
};

export const useApiPostUploadRegister = async (url, data) => {
  let uuid = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  let useragent = Platform.OS + '/' + uuid.toString() + '/' + deviceId;
  let tok_ = await getSession('token').then((token) => {
    return token;
  });

  let token_ = '';
  if (data.accessToken) {
    token_ = data.accessToken;
  } else {
    token_ = tok_;
  }

  let imgs;
  if (data.ktpImageUrl?.uri) {
    imgs = {
      name: 'ktpImageUrl',
      filename: `user.jpg`,
      type: 'image/png',
      // data: RNFetchBlob.wrap(data.ktpImageUrl.uri),
    };
  } else {
    imgs = {name: 'ktpImageUrl', data: ''};
  }

  let imgs2;
  if (data.selfieImageUrl?.uri) {
    imgs2 = {
      name: 'selfieImageUrl',
      filename: `user2.jpg`,
      type: 'image/png',
      // data: RNFetchBlob.wrap(data.selfieImageUrl.uri),

    };
  } else {
    imgs2 = {name: 'selfieImageUrl', data: ''};
  }

  let body = [
    imgs,
    imgs2,
    {name: 'uuid', data: uuid.toString()},
    {name: 'name', data: data.name.toString()},
    {name: 'gender', data: data.gender.toString()},
    {name: 'phone', data: data.phone.toString()},
    {name: 'ktp', data: data.ktp.toString()},
    {name: 'bussinessType', data: data.bussinessType.toString()},
    {name: 'qrisName', data: data.qrisName.toString()},
    {name: 'email', data: data.email.toString()},
    {name: 'provinceId', data: data.provinceId.toString()},
    {name: 'districtId', data: data.districtId.toString()},
    {name: 'cityId', data: data.cityId.toString()},
    {name: 'address', data: data.address.toString()},
    {name: 'postalCode', data: data.postalCode.toString()},
    {name: 'income', data: data.income.toString()},
  ];


  // console.log(JSON.stringify({
  //   method: 'POST',
  //   url: API_URL + `${url}`,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //     topindotoken: token_ ? token_ : '',
  //     topindosecret: md5(md5(md5(API_KEY + API_SECRET + uuid))),
  //     'User-Agent': useragent,
  //   },
  //   data: body,
  // }))


  // const res = await RNFetchBlob.config({
  //   //fileCache: true,
  //   //trusty: true,
  // })
  //   .fetch(
  //     'POST',
  //     "https://www.apps-uwang.com:5050" + `${url}`,
  //     {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       topindotoken: token_ ? token_ : '',
  //       topindosecret: md5(md5(md5("RA0t2UwidN" + "jCkU2nGJp3ryjJ6nyAfM" + uuid))),
  //       'User-Agent': useragent,
  //     },
  //     body,
  //   )
  //   .then((response) => {
  //     let status = response.info().status;
  //     const data = response.json();
  //     return Promise.all([status, data]);
  //   });

  let responses = {
    statusCode: res[0],
    values: res[1],
  };

  return await responses;
};

export const useError = async (errors) => {
  const err = errors.toString();
  let result = '';
  if (
    err === 'TypeError: Network request failed' ||
    err === 'Error: Network Error' ||
    err === 'Abort' ||
    err === 'nativeCreate' ||
    err === 'Segfault' ||
    err === 'No Activity found to handle null' ||
    err === 'Exception in HostFunction: <unknown>' ||
    err === 'Unable to find node on an unmounted component.' ||
    err === 'RNHTMLtoPDF error: Could not create folder structure.' ||
    err ===
      'android.content.pm.PackageManager$NameNotFoundException: com.google.android.webview' ||
    err === 'java.lang.reflect.InvocationTargetException' ||
    err ===
      "Attempt to invoke interface method 'void com.facebook.react.bridge.Promise.reject(java.lang.String, java.lang.String)' on a null object reference" ||
    err === 'Cannot call write after a stream was destroyed' ||
    err ===
      'Unable to pause activity {com.uwang.android/com.uwang.android.MainActivity}: java.lang.RuntimeException: Failed to call observer method' ||
    err === 'android.os.DeadSystemException' ||
    err ===
      "Error while updating property 'src' of a view managed by: RNSVGImage" ||
    err === 'Could not invoke UIManager.createView' ||
    err === 'FragmentManager has been destroyed' ||
    err === 'InputChannel is not initialized.' ||
    err ===
      "Attempt to invoke virtual method 'void android.bluetooth.BluetoothSocket.close()' on a null object reference" ||
    err ===
      'Error: Unable to resolve host "www.appsuwang.com": No address associated with hostname' ||
    err ===
      "Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.DrawableContainer$DrawableContainerState$ConstantStateFuture.get(android.graphics.drawable.DrawableContainer$DrawableContainerState)' on a null object reference" ||
    err === 'Error: The Internet connection appears to be offline.' ||
    err === 'Error: Request failed with status code 404'
  ) {
    result = getError({
      title:
        'Cek Kembali Koneksi Anda, close dan mohon buka ulang kembali aplikasi Anda.',
      duration: 'LENGTH_INDEFINITE',
    });
  } else {
    throw new Error(errors);
  }
  return result;
};

const useErrorIn = (errors) => {
  const err = errors.toString();
  let rsl = false;
  if (
    err === 'TypeError: Network request failed' ||
    err === 'Error: Network Error' ||
    err === 'Abort' ||
    err === 'nativeCreate' ||
    err === 'Segfault' ||
    err === 'No Activity found to handle null' ||
    err === 'Exception in HostFunction: <unknown>' ||
    err === 'Unable to find node on an unmounted component.' ||
    err === 'RNHTMLtoPDF error: Could not create folder structure.' ||
    err ===
      'android.content.pm.PackageManager$NameNotFoundException: com.google.android.webview' ||
    err === 'java.lang.reflect.InvocationTargetException' ||
    err ===
      "Attempt to invoke interface method 'void com.facebook.react.bridge.Promise.reject(java.lang.String, java.lang.String)' on a null object reference" ||
    err === 'Cannot call write after a stream was destroyed' ||
    err ===
      'Unable to pause activity {com.uwang.android/com.uwang.android.MainActivity}: java.lang.RuntimeException: Failed to call observer method' ||
    err === 'android.os.DeadSystemException' ||
    err ===
      "Error while updating property 'src' of a view managed by: RNSVGImage" ||
    err === 'Could not invoke UIManager.createView' ||
    err === 'FragmentManager has been destroyed' ||
    err === 'InputChannel is not initialized.' ||
    err ===
      "Attempt to invoke virtual method 'void android.bluetooth.BluetoothSocket.close()' on a null object reference" ||
    err ===
      'Error: Unable to resolve host "www.appsuwang.com": No address associated with hostname' ||
    err ===
      "Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.DrawableContainer$DrawableContainerState$ConstantStateFuture.get(android.graphics.drawable.DrawableContainer$DrawableContainerState)' on a null object reference" ||
    err === 'Error: The Internet connection appears to be offline.'
  ) {
    rsl = true;
  } else {
    rsl = false;
  }
  return rsl;
};
