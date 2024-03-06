import API from '../API/APIConstant'

export default class DataAPI {
    // Danh sách API phần function screen
    static UrlProfile = 'api_profile/profile';
    static UrlManagerFile = 'student/api_student_resources/my_resources';
    // static UrlFreeLearning = DataAPI.url + '/api/student/api_student_lesson/lessons_by_skill';
    // static UrlLoadInbox = 'api_inbox/inbox';
    // static UrlLoadInboxDetail = 'api_inbox/inbox_detail';
    // static UrlLoadSendInbox = DataAPI.url + '/api/api_inbox/send';
    // static UrlLoadInboxSystem = 'api_inbox/inbox_system';
    // static UrlLoadListContact = DataAPI.url + '/api/api_inbox/list_contact';
    // static UrlLoadUpdateInbox = DataAPI.url + '/api/api_inbox/update_inbox';


    static UrlSaveSetting = 'api_user/save_setting_notify';
    static UrlSetting = 'api_user/load_setting_notify';
    static UrlSettingApp = 'api_user/load_setting_app';
    static UrlSettingAppParent = 'parent/api_user/load_setting_app';
    static UrlUpdateInfoUser = 'api_user/user';
    static UrlSaveSettingApp = 'api_user/save_setting';

    // Thanh tích
    static UrlProcess = 'api_student/reward';
    static UrlRank = 'api_student/ranking';
    // danh sách API theo lớp
    static UrlClass = 'api_class/my_classes';
    static UrlListStudentClass = 'api_class/students';
    static UrlDetailClass = 'api_class/class';
    // static UrlLoadListUnit = DataAPI.url + '/api/student/api_student_curriculum/units';
    static UrlExerciseClass = 'api_class/class_homework';
    // static UrlLoadInfoUnit = DataAPI.url + '/api/student/api_student_curriculum/lessons';
    static UrlAchievements = 'api_class/ranking';
    // khác
    static UrlMiniTest = 'student/api_student_lesson/data_mini_test';
    static UrlHomeScreen = 'api_student/data_learn_screen';
    // static UrlListCourse = DataAPI.url + '/api/student/api_student_curriculum/courses_name_follow_class';
    // static UrlHomework = DataAPI.url + '/api/student/api_homework/all_exercise';

    // Màn Hình Map Unit theo lớp
    static UrlMapUnitClass = 'student/api_student_curriculum/map_unit';
    static UrlSkillUnitMap = 'student/api_student_curriculum/lessons_by_skill';
    static UrlImprovement = 'student/api_student_lesson/looking_back';
    //register
    // static UrlRole = DataAPI.url +'/api/api_register/register';
    static UrlLicense = 'api_user/license_info';

}
