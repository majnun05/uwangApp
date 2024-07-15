import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  BackHandler,
  FlatList,
  View,
  TextInput,
  RefreshControl,
  Text,
  InteractionManager,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useApiPost} from '../../../../helpers/useFetch';
import {apiPesawatCountry} from '../../../../helpers/endPoint';
import {getSnackBar_error} from '../../../../helpers/Helpers';
import ContentProduk from '../../../../content/fitur/ContentOperatorArrow';
import styles from '../../../../assets/styles/Style';
import Header from '../../../../content/header/Header';
import IconEmpty from '../../../../assets/svg/empty.svg';

const Country = (props) => {
  let {params} = props.route;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(params.pages);
  const [field, setfield] = useState(params.field);
  const [dataRes, setDataRes] = useState([]);
  const [dataResReal, setDataResReal] = useState([]);
  let isMounted = true;

  const isLogged = async () => {
    await useApiPost(apiPesawatCountry(), {})
      .then((res) => {
        if (isMounted) {
          setIsLoading(false);
          if (res.statusCode === 200) {
            let val = res.values;

            setDataRes(val.data);
            setDataResReal(val.data);
          } else if (res.statusCode === 500) {
            setDataRes([]);
            setDataResReal([]);
            getSnackBar_error({
              title: res.values.message,
              duration: 'LENGTH_INDEFINITE',
            });
          } else {
            setDataRes([]);
            setDataResReal([]);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const _onRefresh = () => {
    setIsLoading(true);
    isLogged();
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    InteractionManager.runAfterInteractions(() => {
      isLogged();
    });

    return () => {
      backHandler.remove();
      isMounted = false;
    };
  }, []);

  const searchFilterFunction = async (text) => {
    const newData = dataRes.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setDataRes(newData);
  };

  const renderItem = React.useCallback(({item, index}) => {
    return (
      <ContentProduk
        key={index}
        onPress={() => {
          navigation.navigate(pages, {
            dataCountry: item,
            field: field,
          });
        }}
        maps={true}
        operatorName={item.name}
      />
    );
  });

  const listEmptyComponent = () => {
    return (
      <View style={styles.boxEmpty}>
        {!isLoading ? (
          <>
            <SvgXml width={120} height={120} xml={IconEmpty} />
            <Text style={styles.textEmpty}>Tidak Ada Data</Text>
          </>
        ) : null}
      </View>
    );
  };

  const shouldItemUpdate = (prev, next) => {
    const {numColumns, shouldItemUpdate} = this.props;
    if (numColumns > 1) {
      return (
        prev.item.length !== next.item.length ||
        prev.item.some((prevItem, ii) =>
          shouldItemUpdate(
            {item: prevItem, index: prev.index * numColumns + ii},
            {item: next.item[ii], index: next.index * numColumns + ii},
          ),
        )
      );
    } else {
      return shouldItemUpdate(prev, next);
    }
  };

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <StatusBar animated={true} backgroundColor="#00A79D" />
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Pilih Negara'}
        shadow={false}
        right={false}
      />
      <View style={[styles.boxFormCari, styles.pl15, styles.pr15]}>
        <View style={styles.formSearchKotak}>
          <TextInput
            underlineColorAndroid="#EFEFEF"
            placeholderTextColor="#757575"
            style={[styles.fs15, styles.grey92, styles.fontWSR, {height: 45}]}
            placeholder="Cari Negara ..."
            onChangeText={(text) => searchFilterFunction(text)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                setDataRes(dataResReal);
              }
            }}
          />
        </View>
      </View>

      <FlatList
        ListFooterComponent={<View style={styles.mb20} />}
        refreshControl={
          <RefreshControl
            colors={['#4F6CFF', '#4F6CFF']}
            refreshing={isLoading}
            onRefresh={_onRefresh}
          />
        }
        shouldItemUpdate={shouldItemUpdate}
        data={dataRes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={listEmptyComponent}
        removeClippedSubviews={true}
        legacyImplementation={false}
      />
    </SafeAreaView>
  );
};

export default Country;
