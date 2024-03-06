import React, {useState, useRef} from 'react';
import {TextBox} from '../../../../componentBase/TextBox';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  Animated,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {useSelector} from 'react-redux';
import {Colors} from '../../../../styleApp/color';
import {associateParentLogic} from './AssociateParent.logic';
import {ParentText} from '../../../../stringJSON/ParentTextJson';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import {FullScreenLoadingIndicator} from '../../../../componentBase/indicator';
import styles from './AssociateParent.style';
import {RefreshControl} from 'react-native-gesture-handler';
import MyData from '../../../../component/MyData';
import {ScrollView} from 'react-navigation';
import FastImage from 'react-native-fast-image';
import {SmPopup as AlertPopup} from '../../../../componentBase/SmPopup';
import {x_thanhtoan} from '../../../../assets/icon';
import API from '../../../../API/APIConstant';

export const AssociateParent = props => {
  let {
    loading,
    dataChildren,
    typePopup,
    studentSelected,
    dataPendingChildren,
    msgAlert,
    setMsgAlert,
    setStudentSelected,
    setTypePopup,
    handleDeleteChild,
    handleCheckAction,
    handleAgreeAction,
  } = associateParentLogic(props);

  const language = useSelector(state => state.LanguageStackReducer.language);
  const {StudentListTeacherScreen, SmPopup} = language;
  // Function render Item Student
  const renderItemStudent = ({item}, typeAssociate) => {
    return (
      <View key={item?.id} style={[styles.flex1, styles.item_student]}>
        <View style={[styles.flex1, styles.item_student_infor]}>
          <FastImage
            source={{
              uri: !!item.avatar
                ? API.domain + item.avatar
                : 'student_profile_image4',
            }}
            style={{
              width: 58,
              height: 58,
              borderRadius: SmartScreenBase.smPercenWidth * 25,
              borderWidth: 2.5,
              borderColor: Colors.White,
              ...styles.boxShadow,
            }}
          />
          <View style={[styles.flexColumn, styles.item_student_desc]}>
            <TextBox style={styles.item_student_name}>
              {item?.fullname || item?.full_name}
            </TextBox>
            <TextBox style={styles.item_student_email}>{item?.email}</TextBox>
          </View>
        </View>

        {typeAssociate == 'total' ? (
          <TouchableOpacity
            onPress={() => handleCheckAction('deleteChild', item)}>
            <Image
              source={{uri: 'small_trash_icon'}}
              style={styles.trashIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : typeAssociate == 'pending' ? (
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => handleAgreeAction('acceptChildPending', item)}>
              <Image
                source={{uri: 'teacher_huongdanbaigiang_icon_tick'}}
                style={styles.trashIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAgreeAction('deleteChildPending', item)}>
              <Image
                source={x_thanhtoan}
                style={styles.trashIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleCheckAction('deleteChildSent', item)}>
            <Image
              source={x_thanhtoan}
              style={styles.trashIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Function render Base Title
  const renderBaseTitlte = (data, title, typeAssociate) => {
    return (
      <View style={styles.associate_base_box}>
        <TextBox style={styles.baseTitle}>{title}</TextBox>
        <FlatList
          data={data}
          renderItem={item => renderItemStudent(item, typeAssociate)}
          keyExtractor={(item, index) => {
            return item?.id.toString() + index.toString();
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const scrollA = useRef(new Animated.Value(0)).current;

  console.log('typePopup ===', typePopup);

  return (
    <View style={styles.container}>
      <AppHeader
        title={ParentText.AssociateStudent.Header}
        leftIconOnPress={() => {
          props.navigation.pop();
        }}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollA}},
            },
          ],
          {
            useNativeDriver: true, // <- Native Driver used for animated events
          },
        )}
        indicatorStyle={Colors.Black}
        refreshControl={<RefreshControl refreshing={loading} />}
        style={styles.flatlist}>
        <View>{renderBaseTitlte(dataChildren, 'Danh sách con', 'total')}</View>
        <View>
          {renderBaseTitlte(dataPendingChildren, 'Lời mời liên kết', 'pending')}
        </View>
        <View>{renderBaseTitlte(1, 'Liên kết đã gửi', 'sent')}</View>
      </Animated.ScrollView>
      <ShortMainButton
        onPress={() => {
          props.navigation.navigate('ParentLinkingScreen');
          var h = MyData.isRefreshMes + 1;
          MyData.isRefreshMes = h;
        }}
        type={1}
        style={styles.viewAdd}
        widthType={'extra'}>
        <TextBox
          text={ParentText.AssociateStudent.CreateAssociate}
          style={[styles.textSty]}
        />
      </ShortMainButton>

      <FullScreenLoadingIndicator visible={loading} />

      <AlertPopup
        visible={
          typePopup != '' &&
          typePopup != 'acceptChildPending' &&
          typePopup != 'deleteChildPending' &&
          typePopup != 'alertApi'
        }
        // message={StudentListTeacherScreen.DeleteStudent1}
        cancelText={ParentText.AssociateStudent.LabelDegree}
        confirmText={ParentText.AssociateStudent.LabelAgree}
        cancelOnpress={() => {
          setTypePopup('');
          setStudentSelected('');
        }}
        confirmOnpress={() => handleAgreeAction(typePopup, studentSelected)}
        cancelTextStyle={styles.borderRadius30}
        confirmTextStyle={styles.borderRadius30}>
        {!!studentSelected && (
          <TextBox
            numberOfLines={null}
            text={studentSelected.fullname || studentSelected.full_name}
            style={styles.deleteNameText}
          />
        )}
        <TextBox
          text={
            typePopup == 'deleteChild'
              ? ParentText.AssociateStudent.DeleteChild
              : typePopup == 'deleteChildSent'
              ? ParentText.AssociateStudent.CancelAssociate
              : ''
          }
          style={styles.deleteText}
          numberOfLines={5}
        />
      </AlertPopup>

      {/* Alert Msg */}
      <AlertPopup
        hideCancelText
        visible={typePopup == 'alertApi'}
        confirmText={ParentText.AssociateStudent.ClosePopup}
        confirmOnpress={() => handleAgreeAction(typePopup, studentSelected)}>
        <TextBox
          text={msgAlert?.toString()}
          style={styles.deleteText}
          numberOfLines={5}
        />
      </AlertPopup>
    </View>
  );
};
