import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
  BackHandler,
  ScrollView,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {SvgXml} from 'react-native-svg';
import styles from '../../assets/styles/Style';
import IconCloseModal from '../../assets/svg/close-modal.svg';
import IconRightArrow from '../../assets/svg/right-arrow.svg';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {apiProductDetail} from '../../helpers/endPoint';
import {useApiPost, useError} from '../../helpers/useFetch';
import {getSnackBar_error} from '../../helpers/Helpers';
import Header from '../../content/header/Header';
import ContentProduk from '../../content/fitur/ContentOperatorArrow';
import IconSearch from '../../assets/svg/search.svg';
import IconEmpty from '../../assets/svg/empty.svg';

const ModalTarik = (props) => {
  let dataVal = props.dataRes
  let dataReal = props.dataResReal
  const navigation = useNavigation();
  const [dataSearch, setDataSearch] = useState(dataReal)
  const [data, setData] = useState(dataVal)


  const searchFilterFunction = async (text) => {
    let textSearch = text.toLowerCase();

    const da = [...data];
    const searchData = da.filter((item) => {
      if (item.productName.toLowerCase().includes(textSearch)) {
        return true;
      }

      if (item.productCode.toLowerCase().includes(textSearch)) {
        return true;
      }

      return (
        item.productName &&
        item.productCode &&
        (item.productName.toLowerCase() == textSearch ||
          item.productCode.toLowerCase() == textSearch)
      );
    });
    setData(searchData)
  };


  return (
    <Text>hahha</Text>
  );
};

export default ModalTarik;
