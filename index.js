import {AppRegistry, Text, TextInput, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
