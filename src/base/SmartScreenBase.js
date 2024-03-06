import {Dimensions} from "react-native";

// Sử dụng để lấy kích thước mọi thành phần trong app
class SmartScreenBase{

    static smBaseWidth = 0; // dùng cho Width của Image
    static smBaseHeight = 0; // dùng cho Height của Image

    static smPercenWidth = 0; // dùng cho Width hoặc Height, radius của các component
    static smPercenHeight = 0; // dùng cho Height của các component (thường là các layout)

    static smFontSize = 0; // dùng cho textSize

    static screenWidth = 0; // width cua man hinh
    static screenHeight = 0; // height cua man hinh

    static ratio = 1;

// Gọi một lần lúc khởi tạo app
    static baseSetup(){

        if(SmartScreenBase.smPercenWidth == 0)
        {
            var sWidth = Dimensions.get('window').width;
            var sHeight = Dimensions.get('window').height;

            SmartScreenBase.screenWidth = sWidth;
            SmartScreenBase.screenHeight = sHeight;

            SmartScreenBase.smPercenWidth = sWidth/100;
            SmartScreenBase.smPercenHeight = sHeight/100;

            if(sHeight/sWidth >= 1.5){
                SmartScreenBase.smBaseWidth = sWidth/1080;
                SmartScreenBase.smBaseHeight = sHeight/1080;
                SmartScreenBase.smFontSize = sWidth/1080;
            }else{
                SmartScreenBase.smBaseWidth = sWidth/1668;
                SmartScreenBase.smBaseHeight = sHeight/1668;
                SmartScreenBase.smFontSize = sWidth/1668;
            }
            SmartScreenBase.ratio = sHeight/sWidth
        }
    }

// Convert fontsize từ file thiết kế (px)
    static convertSize(size){
        return size*SmartScreenBase.smFontSize;
    }
}
export default SmartScreenBase;
