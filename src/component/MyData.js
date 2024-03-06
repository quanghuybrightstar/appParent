export default class MyData{
    static TokenUser ={
        id:1,
        jwt_token:''
    };
    static AddUnit=[];
    static KeySkill = 0;
    static KeyExercise = 0;
    static Navigation = null;
    static SendProps = null;
    static UserLogin = null;
    static classID = null;
    static isRefreshMes = 0; // load lại màn hình quản lý tin nhắn
    static isCurrBack = false; // Đánh dấu trở lại từ màn hình chọn giáo trình
    static isDoneExe = false; // đã hoàn thành bài tập chưa
    static curCurriID = -1; // id giáo trình hiện tại của hs
    static loadLanguageStatus = true; // trạng thái có load file language thành công ko
    static inTimeLoading = false; // trong thời gian loading full screen
    static recordAudioPer = false;
    static mDataFavoriteList = []; // Danh sách yêu thích (cập nhật liên tục)
    static isDisableSound = false; // Bật hay tắt âm thanh báo đúng sai 
    static testSVCount = 0; // Đếm số lần click để truy cập sv test, 5 lần là đủ
    static isCanExit = false; // Có thể thoát mà vẫn lưu bài tập (các loại bài cần chấm)
    static isFirstLogin = false; // Có phải lần đầu login
    static mAssignType = ''; // Type giáo viên chọn giao bài
    static mAssignListFile = []; // danh sách media gán cho bài (giao bài type auto)
    static mAssignDateData = {start_time: null, end_time: null}; // thông tin ngày giao cho bài (giao bài type auto)
    static ipTest = ""; // ip server test
    static buildPart = 131; // version Push
    static platform_app_id = "R1JQd3gv-K1RvWVdi-N2VjWStK-NTZhUT09"
}