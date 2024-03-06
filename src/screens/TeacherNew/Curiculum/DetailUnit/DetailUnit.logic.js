import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import axios from 'axios'

/**
 * DetailUnit Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const detailUnitMethod = (props) => {
    //List of Skill
    const [dataListSkill, setDataListSkill] = useState([]);
    //Loading flag
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _CallDataClass();
    }, []);

    /**
     * Function set Data of skill list from navigation params
     */
    const _CallDataClass = async () => {
        setDataListSkill(props.navigation.getParam('data'))
        setIsLoading(false);
    };

    /**
     * Function return image depends on input item
     */
    const _checkImage = (item) => {
        switch (item) {
            case 'vocabulary':
                return 'vocab';
            case 'listening':
                return 'icon6';
            case 'grammar':
                return 'icon1';
            case 'reading':
                return 'icon4';
            case 'speaking':
                return 'icon5';
            case 'writing':
                return 'writing';
            case 'pronunciation':
                return 'icon2';
            case 'mini_test':
                return 'icon8';
            case 'exam':
                return 'icon8';
            case 'project':
                return 'project'                
        }
    };

    /**
     * Function get image of status depends of point
     */
    const _checkImageStatus = (point) => {
        if (point == 100) {
            return 'done';
        } else if (point < 10) {
            return 'notdone';
        } else if (10 <= point && point < 20) {
            console.log(point);
            return 'icon10';
        } else if (20 < point && point < 30) {
            return 'icon20';
        } else if (30 < point && point < 40) {
            return 'icon30';
        } else if (40 < point && point < 50) {
            return 'icon40';
        } else if (50 <= point && point < 60) {
            return 'icon50';
        } else if (60 <= point && point < 70) {
            return 'icon60';
        } else if (70 <= point && point < 80) {
            return 'icon70';
        } else if (80 <= point && point < 90) {
            return 'icon80';
        } else if (90 <= point && point < 100) {
            return 'icon90';
        }

    };

    /**
     * Function navigate to LessonListTCScreen
     */
    const _moveScreen = (data) => {
        // console.log(data)
        // if (data.is_blocked == 1)
        //     return;
        props.navigation.navigate('LessonListTCScreen', { data, curriculumName: props.navigation.getParam('curriculumName') });
    };
    return {
        dataListSkill,
        isLoading,
        _checkImageStatus,
        _checkImage,
        _moveScreen
    }
}