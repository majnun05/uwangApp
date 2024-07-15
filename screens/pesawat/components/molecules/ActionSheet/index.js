import React, {useEffect, useRef} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet, {
  addHasReachedTopListener,
  removeHasReachedTopListener,
} from 'react-native-actions-sheet';
import {Gap, Text} from '../../../components';
import {IconCloseGrey} from '../../../assets';
import {SvgXml} from 'react-native-svg';

const ActionSheetCustom = ({
  actionRef,
  children,
  height,
  title,
  renderTopRight,
  renderBottom,
  paddingHorizontal,
  onClose,
}) => {
  const scrollViewRef = useRef();

  const onHasReachedTop = (hasReachedTop) => {
    if (hasReachedTop)
      scrollViewRef.current?.setNativeProps({
        scrollEnabled: hasReachedTop,
      });
  };

  useEffect(() => {
    addHasReachedTopListener(onHasReachedTop);
    return () => {
      removeHasReachedTopListener(onHasReachedTop);
    };
  }, []);

  return (
    <>
      <ActionSheet
        onClose={onClose}
        containerStyle={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        statusBarTranslucent={false}
        gestureEnabled={true}
        headerAlwaysVisible={true}
        ref={actionRef}>
        {title && (
          <>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: paddingHorizontal,
              }}>
              <View style={{flex: 1}}>
                <Text size={16} type="secondary" weight="bold">
                  {title}
                </Text>
              </View>
              <View>
                {renderTopRight ? (
                  renderTopRight
                ) : (
                  <TouchableOpacity onPress={onClose}>
                    <SvgXml xml={IconCloseGrey} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
        <ScrollView
          style={{height: height ? height + '%' : 'auto'}}
          ref={scrollViewRef}
          nestedScrollEnabled={true}
          onScrollEndDrag={() => actionRef.current?.handleChildScrollEnd()}
          onScrollAnimationEnd={() => actionRef.current?.handleChildScrollEnd()}
          onMomentumScrollEnd={() => actionRef.current?.handleChildScrollEnd()}>
          <Gap height={20} />
          {children}
          <Gap height={paddingHorizontal} />
        </ScrollView>
        {renderBottom && (
          <View style={[styles.bottom, {paddingHorizontal: paddingHorizontal}]}>
            {renderBottom}
          </View>
        )}
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
});

export default ActionSheetCustom;
