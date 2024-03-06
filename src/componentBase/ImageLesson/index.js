import React from 'react';

/**
 * get type of Image Lession
 * @param {string} lessonType type of Image Lession
 * @param {string} subLessonType sub type of Image Lession
 * @returns string
 */
export const ImageLesson = (lessonType, subLessonType) => {
/**
 * if lessonType === skill_guide the real lesson will return in subLessonType
 */
    let _type = lessonType || subLessonType;
    if (lessonType === 'skill_guide' ) {
        return 'grammar_guide';
        // _type = subLessonType;
    }

    switch (_type) {
    case 'vocabulary':
        return 'vocal';

    case 'pronunciation':
        return 'pronunication';

    case 'grammar':
        if (lessonType === 'skill_guide') {
            return 'grammar_guide';
        }
        return 'grammar';

    case 'mini_test':
        return 'minitest';

    case 'project':
        return 'project1';

    case 'reading':
        return 'reading';

    case 'speaking':
        return 'speaking';

    case 'writing':
        return 'writing1';

    case 'listening':
        return 'listening';

    case 'exam':
        return 'minitest';

    default:
        return '';
    }
};
