package gk.app.sunday;
import com.dooboolab.RNIap.RNIapPackage;
import com.facebook.react.ReactApplication;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;  // <--- import
import android.content.Intent; // <--- import
import android.content.res.Configuration;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.microsoft.codepush.react.CodePush;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new MPAndroidChartPackage());
          packages.add(new RNSelectableTextPackage());
          packages.add(new com.swmansion.rnscreens.RNScreensPackage());
          packages.add(new com.th3rdwave.safeareacontext.SafeAreaContextPackage());
          // packages.add(new RNIapPackage());
          // packages.add(new SplashScreenReactPackage());
          
          // Packages that cannot be autolinked yet can be add  ed manually here, for example:
//          packages.add(new ReactNativePushNotificationPackage());

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }
        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  // private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
  //   if (BuildConfig.DEBUG) {
  //     try {
  //       /*
  //        We use reflection here to pick up the class that initializes Flipper,
  //       since Flipper library is not available in release mode
  //       */
  //       Class<?> aClass = Class.forName("gk.app.sunday.ReactNativeFlipper");
  //       aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class).invoke(null, context, reactInstanceManager);
  //     } catch (ClassNotFoundException e) {
  //       e.printStackTrace();
  //     } catch (NoSuchMethodException e) {
  //       e.printStackTrace();
  //     } catch (IllegalAccessException e) {
  //       e.printStackTrace();
  //     } catch (InvocationTargetException e) {
  //       e.printStackTrace();
  //     }
  //   }
  // }
}
