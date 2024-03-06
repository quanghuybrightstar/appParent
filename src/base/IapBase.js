import {
    Alert, Platform
  } from 'react-native';
  import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } from 'react-native-iap';
import LogBase from './LogBase';
  
  const productL = Platform.select({
    ios: [
      'sunday.threemonth',
      'gk.app.sunday.600k',
      'gk.app.sunday.300k' 
    ],
    android: [
      'sunday.price1.200k',
      'sunday.price1.50k',
      'sunday.price1.500k',
      'sunday.price1.350k',
      'gk.app.sunday.600k',
      'gk.app.sunday.300k',
      'android.test.purchased'
    ],
  });
  
  // Thanh toán apple store và CH Play
  class IapBase{
  
    static productionList = []; // Danh sách Production
  
    static billCode = ''; // Mã thanh toán
  
    static purchaseUpdateSubscription = null; // Đối tượng listener cập nhật trạng thái thanh toán
  
    static purchaseErrorSubscription = null; // Đối tượng listener trả về lỗi trong khi thanh toán nếu có
  
    // Kết nối với hệ thống thanh toán
    static async connect(){
      try {
        await RNIap.initConnection();
        if (Platform.OS === 'android') {
          await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
        } else {
          await RNIap.clearTransactionIOS();
        }
      } catch (err) {
        console.warn(err.code, err.message);
      }
    }
  
    // Lấy danh sách Production
    static async getProductList(mProductList){
          try {
            var prolist = mProductList
            LogBase.log("=====prolist",prolist)
            if(!prolist) {
              prolist = productL
            }
            IapBase.productionList = await RNIap.getProducts(prolist);
            LogBase.log("=====getProductList done",IapBase.productionList)
          } catch (err) {
            console.warn(err.code, err.message);
          }
    }
  
    // Mua 1 production
    static requestProduct(id){
        try {
            RNIap.requestPurchase(id);
            IapBase.billCode = '';
          } catch (err) {
            console.warn(err.code, err.message);
          }
    }
  
    // add listener cập nhật trạng thái thanh toán
    static async KeepIapListener(){
      if(purchaseUpdateSubscription){
        purchaseUpdateSubscription = purchaseUpdatedListener(
          async (purchase) => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
              try {
                const ackResult = await finishTransaction(purchase);
                IapBase.billCode = receipt;
                console.log("mua thành công ",IapBase.billCode);
              } catch (ackErr) {
                console.warn('ackErr', ackErr);
              }   
            }
          },
        );
      }
    }
  
    //add listener trả về lỗi trong khi thanh toán nếu có
    static KeepCheckError(){
        purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
              // if(error){
              //   LogBase.log('purchaseErrorListener', error);
              //   if(LogBase.isDebug){
              //     Alert.alert("purchaseError",error);
              //   }else{
              //     Alert.alert('thanh toán không thành công');
              //   }
              // }
            },
          );
    }
  
    // check error listener
    static isErrorListener(){
      return purchaseErrorSubscription ? true : false
    }

    // Remove purchase listener
    static RemovePurchaseListener(){
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
    }

    // Remove error listener
    static RemoveErrorListener(){
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    }

    // Remove các listener
    static RemoveListener(){
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      RNIap.endConnection();
    }
    
  //fast using -------------------------------------
  
  static onComponentDidMount(){
    IapBase.connect();
    IapBase.KeepIapListener();
    IapBase.KeepCheckError();
  }
  
  static onComponentWillUnmount(){
    IapBase.RemoveListener();
  }
  
  }
  export default IapBase;