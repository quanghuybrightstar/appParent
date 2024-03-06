import React, { Component, useCallback, useRef, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight, TouchableOpacity, RefreshControl, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppHeader } from '../../../componentBase/AppHeader';
import { TextBox } from '../../../componentBase/TextBox';
import { StudentGrammarJson } from '../../../stringJSON/StudentGrammarJson';
import { Colors } from '../../../styleApp/color'
import { styles } from './StudentGrammar.style';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { grammarMethod } from './StudentGrammar.logic';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import Video from 'react-native-video';
import Loading from '../../../component/LoadingScreen';
import HTML from "react-native-render-html";
import { FontSize, FontWeight } from '../../../styleApp/font';
import Content from '../../../component/ComponentDetailStudyGuide/Content';
import WebView from 'react-native-webview';
import table, { IGNORED_TAGS } from '@native-html/table-plugin';
import FontBase from '../../../base/FontBase';

/**
 * Student Grammar Screen
 * @param {object} props props from redux and navigation
 * @returns Component
 */
export const StudentGrammar = (props) => {
    let { videoRef, grammar, loading } = grammarMethod(props)
    let videoUrl = !!grammar.base_url ? grammar.base_url + grammar.data_question.file : ""

    var testHTML = "<p>Góc phố này nơi mình quen nhau,<br>Có những chiều mưa rơi ướt vai<br>Có những lần mình hẹn ngày mai<br>Hẹn yêu mãi, hẹn chung lối đi<br><br>Có một lần anh chẳng qua nữa<br>Cứ thế xa, xa mãi nơi em<br>Để những mùa nhuộm màu thương nhớ<br>Phố xa xôi đã vãn người qua</p>"
    var testHTML1 = `<p class="MsoNormal" align="center" style="text-align:center"><b><md style="font-size:15.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
    'Times New Roman'">CAN, COULD, BE ABLE TO</md></b></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
    mso-bidi-font-family:'Times New Roman'">Để nói về khả năng ở các thời điểm khác nhau, ta có thể dùng các </span><span lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">modal verb khác nhau.</span></p><div align="center">
    <table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" width="731" style="border: none;">
     <tbody><tr>
      <td width="125" colspan="2" valign="top" style="width:93.5pt;border-top:none;
      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      </td>
      <td width="157" valign="top" style="width:118.0pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;background:#ED7D31;mso-background-themecolor:accent2;
      padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Khẳng định</md><md lang="VI" style="font-size:13.0pt;
      font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="174" valign="top" style="width:130.5pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;background:#F4B083;mso-background-themecolor:accent2;
      mso-background-themetint:153;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Phủ định</md><md lang="VI" style="font-size:13.0pt;
      font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="275" valign="top" style="width:206.25pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;background:#FBE5D6;mso-background-themecolor:accent2;
      mso-background-themetint:50;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Nghi vấn</md></p>
      </td>
     </tr>
     <tr>
      <td width="54" valign="top" style="width:40.5pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      background:#5B9BD5;mso-background-themecolor:accent1;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Khả năng ở quá khứ</md><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      </td>
      <td width="71" valign="top" style="width:53.0pt;border-top:none;border-left:none;
      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;background:#5B9BD5;mso-background-themecolor:
      accent1;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Could</md><md lang="VI" style="font-size:13.0pt;
      font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="157" valign="top" style="width:118.0pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ could+ verb+ ...</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She could run 100 meters in 20 seconds (when she was 15 years old).</md></i><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="174" valign="top" style="width:130.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ couldn't+ verb</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She couldn't run 100 meters in 20 seconds (when she was 15 years old).</md></i><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      </td>
      <td width="275" valign="top" style="width:206.25pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">Could+ S+ verb+ ...?</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">- Yes, S could.<o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">- No, S
      couldn't.</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">Wh-word + could+ S+ V+ ...?</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">Could she run 100 meters in 20 seconds (when she was 15 years old)?<o:p></o:p></md></i></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">&nbsp;</md></i></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">What could she do (when she was 15 years old)?</md></i></p>
      </td>
     </tr>
     <tr>
      <td width="54" valign="top" style="width:40.5pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      background:#9CC2E5;mso-background-themecolor:accent1;mso-background-themetint:
      153;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Khả năng ở hiện tại </md><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="71" valign="top" style="width:53.0pt;border-top:none;border-left:none;
      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;background:#9CC2E5;mso-background-themecolor:
      accent1;mso-background-themetint:153;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Can</md><md lang="VI" style="font-size:13.0pt;
      font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="157" valign="top" style="width:118.0pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ can + verb+ ..</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI">.<o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She can run 100 meters in 20 seconds.</md></i></p>
      </td>
      <td width="174" valign="top" style="width:130.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ can't + verb</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">can not = can't</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She can run 100 meters in 20 seconds.</md></i><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="275" valign="top" style="width:206.25pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">Can+ S+ verb+ ...?</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">- Yes, S can.<o:p></o:p></md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">- No, S can't.</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">Wh-word + can+ S+ V+ ...?</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">Can she run 100 meters in 20 seconds?</md></i></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">What can she do?</md></i></p>
      </td>
     </tr>
     <tr>
      <td width="54" valign="top" style="width:40.5pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      background:#DEEBF6;mso-background-themecolor:accent1;mso-background-themetint:
      50;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Khả năng ở tương lai</md><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      </td>
      <td width="71" valign="top" style="width:53.0pt;border-top:none;border-left:none;
      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;background:#DEEBF6;mso-background-themecolor:
      accent1;mso-background-themetint:50;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';color:black;mso-color-alt:windowtext;
      mso-ansi-language:VI">Will be able to </md><md lang="VI" style="font-size:
      13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      </td>
      <td width="157" valign="top" style="width:118.0pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ will be able to + verb+ ...</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:
      'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She will be able to run 100 meters in 20 seconds (in the future).</md></i></p>
      </td>
      <td width="174" valign="top" style="width:130.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">S+ won't be able to + verb+ ...</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">will not = won't</md></b><md lang="VI" style="font-size:13.0pt;
      font-family:'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';
      mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI"><br>She won't be able to run 100 meters in 20 seconds (in the future).</md></i><br></p>
      </td>
      <td width="275" valign="top" style="width:206.25pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">Will + S+ be able to + verb+...?</md></b><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI"><o:p></o:p></md></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">- Yes, S will.<o:p></o:p></md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">- No, S won't.</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><b><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';color:red;
      mso-ansi-language:VI">What will + S+ be able to + verb+...</md></b></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><i><md lang="VI" style="font-size:13.0pt;font-family:
      'Myriad Pro',sans-serif;mso-bidi-font-family:'Times New Roman';mso-ansi-language:
      VI">She won't be able to run 100 meters in 20 seconds (in the future).</md></i></p>
      <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><md lang="VI" style="font-size:13.0pt;font-family:'Myriad Pro',sans-serif;
      mso-bidi-font-family:'Times New Roman';mso-ansi-language:VI">&nbsp;</md></p>
      </td>
     </tr>
    </tbody></table></div>`

    var testHTML2 = `<p class="MsoNormal" align="center" style="text-align:center"><b><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">PRESENT CONTINUOUS PART 2</span></b></p><p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l2 level1 lfo1"><!--[if !supportLists]--><b><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;mso-fareast-font-family:="" "times="" roman";color:#0070c0"="">1. Cách sử dụng</span></b><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">-
    Diễn đạt một hành động đang xảy ra tại thời điểm nói</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">-
    Diễn tả một hành động hay&nbsp;sự việc nói chung đang diễn ra xung quanh thời
    điểm nói.</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">-
    Diễn đạt một hành động hoặc sự việc&nbsp;sắp xảy ra trong tương lai gần. Thường
    diễn tả một kế hoạch đã lên lịch sẵn trước đó</span></span></p><p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l0 level1 lfo2"><!--[if !supportLists]--><b><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;mso-fareast-font-family:="" "times="" roman";color:#0070c0"="">2. </span></b><!--[endif]--><b><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;color:#0070c0"="">Dấu hiệu thì hiện tại tiếp diễn</span></b></p><p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l1 level1 lfo3"><!--[if !supportLists]--><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;mso-fareast-font-family:="" "times="" roman""="">a) </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">Trạng từ chỉ thời gian </span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp; - now/right now: bây giờ/ ngay bây giờ</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    at the moment/ at present: lúc này/ hiện tại</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    for the time being: lúc này</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    currently: hiện tại, hiện giờ</span></span></p><p class="MsoNormal" style="margin-left:0cm;text-indent:0cm;mso-list:l1 level1 lfo3"><!--[if !supportLists]--><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;mso-fareast-font-family:="" "times="" roman""="">b) </span><!--[endif]--><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Câu thức mệnh lệnh
    &nbsp; </span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Look! – nhìn kìa</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    Watch out! – cẩn thận</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    Listen! – Nghe này</span><o:p></o:p></span></p><p class="MsoNormal"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
    Keep silent! – Hãy giữ yên lặng</span></p><p class="MsoNormal"><b><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif;="" color:red"="">NOTE:</span></b><span style="font-size: 18px;">﻿</span><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><br><span style="font-family: 'Myriad Pro'; font-size: 18px;">
    </span><!--[endif]--><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
    </span><table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" width="575" style="width: 431.55pt; border: none;"><tbody><tr><td width="129" valign="top" style="width:97.05pt;border:solid windowtext 1.0pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">&nbsp;</span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="446" valign="top" style="width:334.5pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">Thì
      hiện tại tiếp diễn</span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr><tr><td width="129" valign="top" style="width:97.05pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Always</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="446" valign="top" style="width:334.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">He
      is always talking in class.</span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">=&gt;
      </span><i><span style="font-family: 'Myriad Pro'; font-size: 18px;">hành động lặp đi lặp lại, làm người khác khó chịu, bực mình thường</span></i></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr><tr><td width="129" valign="top" style="width:97.05pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Get/become</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="446" valign="top" style="width:334.5pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">The
      weather is getting cooler and cooler.</span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      mso-pagination:none"><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">=&gt;</span><i><span style="font-family: 'Myriad Pro'; font-size: 18px;">Trở
      nên/ trở thành (diễn tả thay đổi đang diễn ra)</span></i></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr></tbody></table><p class="MsoNormal"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">&nbsp;</span><b><span style="font-size:13.0pt;font-family:" times="" new="" roman",serif;="" color:red"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">NOTE:</span></span></b></p><p class="MsoNormal"><span style="font-size: 18px; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">CÁC
    ĐỘNG TỪ KHÔNG DÙNG Ở THÌ TIẾP DIỄN</span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
     </span><span style="font-family: 'Myriad Pro'; font-size: 18px;">
    </span><table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="border: none;"><tbody><tr><td width="263" valign="top" style="width:197.05pt;border:solid windowtext 1.0pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Động từ chỉ suy nghĩ
      quan điểm</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="305" valign="top" style="width:229.05pt;border:solid windowtext 1.0pt;
      border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
      solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">agree (đồng ý),
      disagree (không đồng ý), believe (tin tưởng), understand (hiểu),…</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr><tr><td width="263" valign="top" style="width:197.05pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Động từ chỉ cảm xúc</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="305" valign="top" style="width:229.05pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">love (yêu), like
      (thích), prefer (thích hơn),…</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr><tr><td width="263" valign="top" style="width:197.05pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Động từ chỉ giác quan</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="305" valign="top" style="width:229.05pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">feel (cảm thấy), see
      (nhìn), hear (nghe),…</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr><tr><td width="263" valign="top" style="width:197.05pt;border:solid windowtext 1.0pt;
      border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
      padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">Động từ chỉ sở hữu và tồn
      tại</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td><td width="305" valign="top" style="width:229.05pt;border-top:none;border-left:
      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
      mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
      mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span><p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
      line-height:150%;mso-pagination:none"><span style="font-size:13.0pt;
      line-height:150%;font-family:" times="" new="" roman",serif"=""><span style="font-family: 'Myriad Pro'; font-size: 18px;">belong (thuộc về), have
      (có), own (sở hữu),…</span><o:p></o:p></span></p><span style="font-family: 'Myriad Pro'; font-size: 18px;">
      </span></td></tr></tbody></table><p class="MsoNormal" style="line-height:150%"><span style="font-size: 18px; line-height: 150%; font-family: 'Myriad Pro';" times="" new="" roman",serif"="">&nbsp;</span></p>`

    return (
        <>
            {!!grammar.lesson ?
                <>
                    <AppHeader
                        navigation={props.navigation}
                        title={StudentGrammarJson.Header}
                        leftIconOnPress={() => {
                            props.navigation.pop()
                        }}
                        colorLeft={Colors.DarkGreen}
                        colorRight={Colors.DarkGreen}

                    />
                    <View style={styles.container}>
                        <LinearGradient
                            style={{ flex: 1 }}
                            colors={[Colors._25988D, Colors._FBF7C8]}
                            start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.viewTitleGrammar}>
                                    <TextBox numberOfLines={null} style={styles.txtTitle}>{grammar.lesson.name}</TextBox>
                                </View>
                                {!!videoUrl && <View style={styles.viewVideo}>
                                    <Content
                                        type={'video'}
                                        autoplayDisabled={true}
                                        path={videoUrl} />
                                </View>}
                                <View style={styles.viewContentGrammar}>
                                    <HTML
                                        containerStyle={styles.htmlStyle}
                                        source={{ html: 
                                            // testHTML2 }}
                                            // grammar.data_question.description.replaceAll("\r"," ") }}
                                            grammar.data_question.description.split("\r").join(" ").split("&nbsp;").join("")}}
                                        renderers={{
                                            table: table,
                                        }}
                                        allowFontScaling={false}
                                        baseFontStyle={{
                                          fontSize: FontSize.size45Font,
                                          fontFamily: FontBase.MyriadPro_Regular,
                                        }}
                                        ignoredTags={[...IGNORED_TAGS, 'o:p']}
                                        WebView={WebView}
                                        ignoredStyles={[
                                            'font-family',
                                            'width',
                                            'line-height',
                                            'text-indent',
                                            'mso-list',
                                        ]}
                                    />
                                </View>
                            </ScrollView>
                            <FullScreenLoadingIndicator
                                visible={loading}
                            />
                        </LinearGradient>


                    </View>
                </>
                : <ImageBackground
                    source={{ uri: 'imagebackgroundlesson' }}
                    imageStyle={styles.ImageBackGround}
                    style={styles.loading}>
                    <Loading />
                </ImageBackground>}
        </>
    )
}