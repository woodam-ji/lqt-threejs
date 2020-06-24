const Departments = {
    LQT: 'LQT',
    CXT: 'CXT',
    CXPO: 'CXPO',
    PXD: 'PXD',
    UX: 'UX',
    DI: 'DI',
    PF: 'PH',
    SEARCH: 'SEARCH',
    QA: 'QA',
    PMO: 'PMO',
    MGMT: 'MGMT',
    TC: 'TC',
    PH: 'PH',
    PCG: 'PCG',
    SOS_GLOBAL: 'SOS_GLOBAL',
    AD: 'AD',
    SOS_DESIGN: 'SOS_DESIGN',
    SOS_AP: 'SOS_AP',
    SOS_MS: 'SOS_MS',
    IDS: 'IDS',
    YAN: 'YAN'
};
const DepartmentColors = {
    LQT: '#3e84c6',
    CXT: '#c27ba0',
    CXPO: '#b4a7d6',
    PXD: '#8e7cc3',
    UX: '#674ea7',
    DI: '#f6b26b',
    PF: '#a2c4c9',
    SEARCH: '#548235',
    QA: '#ff9900',
    PMO: '#b6d7a8',
    MGMT: '#666666',
    TC: '#e06666',
    PH: '#c37ba0',
    PCG: '#e7b8af',
    SOS_GLOBAL: '#c9daf8',
    AD: '#38751e',
    SOS_DESIGN: '#ff00ff',
    SOS_AP: '#f4cdcc',
    SOS_MS: '#b6d7a8',
    IDS: '#f0c232',
    YAN: '#b4a7d6'
};
const Genders = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}

// const makeFourthFloorInfo = () => {
//     return [
//         {
//             index: 0,
//             initialX: 0,
//             initialY: 0,
//             initialZ: 0,
//             rows: [
//                 {name: '신창선', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
//                 {name: '문지훈', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
//                 {name: '이정현', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
//                 {name: '김강일', gender: Genders.MALE, department: Departments.LQT, isReverse: true}
//             ]
//         },
//     ]
// }

const makeFourthFloorInfo = () => {
    const column1 = []
    return [
        [
            {z: 1, x: 1, name: '김예슬B', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 1, x: 2, name: '이하은', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 1, x: 3, name: '박지인', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 1, x: 4, name: '이진', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 2, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 2, x: 2, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 2, x: 3, name: '김선웅', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 2, x: 4, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 4, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 4, x: 2, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 4, x: 3, name: '이봄', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 4, x: 4, name: '윤혜리', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 5, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 5, x: 2, name: '김기원', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 5, x: 3, name: '장민서', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 5, x: 4, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 7, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 7, x: 2, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 7, x: 3, name: '최푸른', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 7, x: 4, name: '김성우', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 8, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 8, x: 2, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 8, x: 3, name: '신지영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 8, x: 4, name: '양세원', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 10, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 10, x: 2, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 10, x: 3, name: '김호정', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 10, x: 4, name: '강유진', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 11, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 11, x: 2, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 11, x: 3, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 11, x: 4, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 13, x: 1, name: '장혜인', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 13, x: 2, name: '김한주', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 13, x: 3, name: '노현애', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 13, x: 4, name: '허보은', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 14, x: 1, name: '김수영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 14, x: 2, name: '김지수', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 14, x: 3, name: '서지영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 14, x: 4, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 16, x: 1, name: '김가영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 16, x: 2, name: '이소영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 16, x: 3, name: '이유진', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 16, x: 4, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 17, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 17, x: 2, name: '박희수', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 17, x: 3, name: '김지은', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 17, x: 4, name: '박해인', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 19, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 19, x: 2, name: '강명구', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 19, x: 3, name: '여름', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 19, x: 4, name: '박형금', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 20, x: 1, name: '', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 20, x: 2, name: '한명훈', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 20, x: 3, name: '윤동상', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 20, x: 4, name: '홍유빈', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 22, x: 1, name: '오상준', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 22, x: 2, name: '이석진', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 22, x: 3, name: '노이은', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 22, x: 4, name: '구성은', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 23, x: 1, name: '조아라', gender: Genders.FEMALE, department: Departments.SOS_GLOBAL, isReverse: true},
            {z: 23, x: 2, name: '', gender: Genders.MALE, department: Departments.SOS_GLOBAL, isReverse: true},
            {z: 23, x: 3, name: '', gender: Genders.FEMALE, department: Departments.SOS_GLOBAL, isReverse: true},
            {z: 23, x: 4, name: '', gender: Genders.MALE, department: Departments.SOS_GLOBAL, isReverse: true},
        ],
        [
            {z: 25, x: 1, name: '박재기', gender: Genders.MALE, department: Departments.SOS_GLOBAL, isReverse: false},
            {z: 25, x: 2, name: '전민진', gender: Genders.FEMALE, department: Departments.SOS_GLOBAL, isReverse: false},
            {z: 25, x: 3, name: '김연지', gender: Genders.FEMALE, department: Departments.SOS_GLOBAL, isReverse: false},
            {z: 25, x: 4, name: '박상영', gender: Genders.MALE, department: Departments.SOS_GLOBAL, isReverse: false},
        ],
        [
            {z: 26, x: 1, name: '홍광필', gender: Genders.MALE, department: Departments.AD, isReverse: true},
            {z: 26, x: 2, name: '정원석', gender: Genders.MALE, department: Departments.AD, isReverse: true},
            {z: 26, x: 3, name: '', gender: Genders.FEMALE, department: Departments.AD, isReverse: true},
            {z: 26, x: 4, name: '', gender: Genders.MALE, department: Departments.AD, isReverse: true},
        ],
        [
            {z: 28, x: 1, name: '변용호', gender: Genders.MALE, department: Departments.AD, isReverse: false},
            {z: 28, x: 2, name: '', gender: Genders.FEMALE, department: Departments.AD, isReverse: false},
            {z: 28, x: 3, name: '정인호', gender: Genders.MALE, department: Departments.AD, isReverse: false},
            {z: 28, x: 4, name: '심양호', gender: Genders.MALE, department: Departments.AD, isReverse: false},
        ],
        [
            {z: 29, x: 1, name: '신상하', gender: Genders.MALE, department: Departments.SOS_DESIGN, isReverse: true},
            {z: 29, x: 2, name: '', gender: Genders.MALE, department: Departments.SOS_DESIGN, isReverse: true},
            {z: 29, x: 3, name: '', gender: Genders.FEMALE, department: Departments.SOS_DESIGN, isReverse: true},
            {z: 29, x: 4, name: '', gender: Genders.MALE, department: Departments.SOS_DESIGN, isReverse: true},
        ],
        [
            {z: 31, x: 1, name: '황병렬', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 31, x: 2, name: '황규성', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 31, x: 3, name: '오지환', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 31, x: 4, name: '', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
        ],
        [
            {z: 32, x: 1, name: '박선하', gender: Genders.FEMALE, department: Departments.SOS_AP, isReverse: true},
            {z: 32, x: 2, name: '안수지', gender: Genders.FEMALE, department: Departments.SOS_AP, isReverse: true},
            {z: 32, x: 3, name: '', gender: Genders.FEMALE, department: Departments.SOS_AP, isReverse: true},
            {z: 32, x: 4, name: '박진수', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: true},
        ],
        [
            {z: 34, x: 1, name: '유지원', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 34, x: 2, name: '고준영', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 34, x: 3, name: '', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
            {z: 34, x: 4, name: '송영호', gender: Genders.MALE, department: Departments.SOS_AP, isReverse: false},
        ],
        [
            {z: 35, x: 1, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 35, x: 2, name: '남면우', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 35, x: 3, name: '이규화', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 35, x: 4, name: '이민형', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
        ],
        [
            {z: 37, x: 1, name: '김혜진', gender: Genders.FEMALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 2, name: '윤재민', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 3, name: '국태웅', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 4, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
        ],
        [
            {z: 38, x: 1, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 38, x: 2, name: '남면우', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 38, x: 3, name: '이규화', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
            {z: 38, x: 4, name: '이민형', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: true},
        ],
        [
            {z: 37, x: 1, name: '강문해', gender: Genders.FEMALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 2, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 3, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
            {z: 37, x: 4, name: '', gender: Genders.MALE, department: Departments.SOS_MS, isReverse: false},
        ],
        [
            {z: 38, x: 1, name: '김민진', gender: Genders.MALE, department: Departments.IDS, isReverse: true},
            {z: 38, x: 2, name: '', gender: Genders.MALE, department: Departments.IDS, isReverse: true},
            {z: 38, x: 3, name: '신병호', gender: Genders.MALE, department: Departments.IDS, isReverse: true},
            {z: 38, x: 4, name: '', gender: Genders.MALE, department: Departments.IDS, isReverse: true},
        ],
        [
            {z: 40, x: 1, name: '정진호', gender: Genders.MALE, department: Departments.IDS, isReverse: false},
            {z: 40, x: 2, name: '이동형', gender: Genders.MALE, department: Departments.IDS, isReverse: false},
            {z: 40, x: 3, name: '', gender: Genders.MALE, department: Departments.IDS, isReverse: false},
            {z: 40, x: 4, name: '', gender: Genders.MALE, department: Departments.IDS, isReverse: false},
        ],
        [
            {z: 41, x: 1, name: '염광호', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 41, x: 2, name: '김용훈', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 41, x: 3, name: '강현준', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 41, x: 4, name: '', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
        ],
        [
            {z: 43, x: 1, name: '민수환', gender: Genders.MALE, department: Departments.YAN, isReverse: false},
            {z: 43, x: 2, name: '김관용', gender: Genders.MALE, department: Departments.YAN, isReverse: false},
            {z: 43, x: 3, name: '황기현', gender: Genders.MALE, department: Departments.YAN, isReverse: false},
            {z: 43, x: 4, name: '정광현', gender: Genders.MALE, department: Departments.YAN, isReverse: false},
        ],
        [
            {z: 44, x: 1, name: '', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 44, x: 2, name: '', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 44, x: 3, name: '', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
            {z: 44, x: 4, name: '', gender: Genders.MALE, department: Departments.YAN, isReverse: true},
        ],
        [
            {z: 46, x: 1, name: '이동현', gender: Genders.MALE, department: Departments.PH, isReverse: false},
            {z: 46, x: 2, name: '김문수', gender: Genders.MALE, department: Departments.PH, isReverse: false},
            {z: 46, x: 3, name: '황철', gender: Genders.MALE, department: Departments.PH, isReverse: false},
            {z: 46, x: 4, name: '김준', gender: Genders.MALE, department: Departments.PH, isReverse: false},
        ],
        [
            {z: 47, x: 1, name: '김재경', gender: Genders.MALE, department: Departments.PH, isReverse: true},
            {z: 47, x: 2, name: '이현아', gender: Genders.MALE, department: Departments.PH, isReverse: true},
            {z: 47, x: 3, name: '', gender: Genders.MALE, department: Departments.PH, isReverse: true},
            {z: 47, x: 4, name: '강지원', gender: Genders.MALE, department: Departments.PH, isReverse: true},
        ],


        [
            {z: 1, x: 6, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 1, x: 7, name: '홍상희', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 1, x: 8, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 2, x: 6, name: '최재윤', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 2, x: 7, name: '김지현', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 2, x: 8, name: '최제힘', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
        ],
        [
            {z: 4, x: 6, name: '이승엽', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
            {z: 4, x: 7, name: '박수영', gender: Genders.FEMALE, department: Departments.PCG, isReverse: false},
            {z: 4, x: 8, name: '황지현', gender: Genders.MALE, department: Departments.PCG, isReverse: false},
        ],
        [
            {z: 5, x: 6, name: '이용희', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
            {z: 5, x: 7, name: '신경수', gender: Genders.FEMALE, department: Departments.PCG, isReverse: true},
            {z: 5, x: 8, name: '', gender: Genders.MALE, department: Departments.PCG, isReverse: true},
        ],





        // R10
        [
            {z: 18, x: 18, name: '신창선', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 18, x: 19, name: '문지훈', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 18, x: 20, name: '이정현', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 18, x: 21, name: '김강일', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 20, x: 18, name: '손미리', gender: Genders.FEMALE, department: Departments.LQT},
            {z: 20, x: 19, name: '함문주', gender: Genders.FEMALE, department: Departments.LQT},
            {z: 20, x: 20, name: '이인희', gender: Genders.FEMALE, department: Departments.LQT},
            {z: 20, x: 21, name: '지우담', gender: Genders.MALE, department: Departments.LQT},
        ],
        [
            {z: 21, x: 18, name: '정현대', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 21, x: 19, name: '염경민', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 21, x: 20, name: '이민재', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 21, x: 21, name: '조기운', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 23, x: 18, name: '진명성', gender: Genders.MALE, department: Departments.LQT},
            {z: 23, x: 19, name: '장현길', gender: Genders.MALE, department: Departments.LQT},
            {z: 23, x: 20},
            {z: 23, x: 21, name: '안창영', gender: Genders.MALE, department: Departments.LQT}
        ],
        [
            {z: 24, x: 18, name: '서광석', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 24, x: 19, name: '전용성', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 24, x: 20},
            {z: 24, x: 21, name: '이경연', gender: Genders.FEMALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 26, x: 18, name: '이주형', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 26, x: 19, name: '황찬희', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 26, x: 20, name: '이희선', gender: Genders.FEMALE, department: Departments.LQT, isReverse: false},
            {z: 26, x: 21, name: '이지은', gender: Genders.FEMALE, department: Departments.LQT, isReverse: false},
        ],
        [
            {z: 27, x: 18, name: '이완기', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 27, x: 19, name: '박한천', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 27, x: 20, name: '백경훈', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 27, x: 21, name: '지중엽', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 29, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 29, x: 19, name: '이지훈', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 29, x: 20, name: '정석', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 29, x: 21, name: '조이현', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
        ],
        [
            {z: 30, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 30, x: 19, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 30, x: 20},
            {z: 30, x: 21, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 32, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 32, x: 19, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 32, x: 20, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 32, x: 21, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
        ],
        [
            {z: 33, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 33, x: 19, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 33, x: 20, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 33, x: 21, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 35, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 35, x: 19, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 35, x: 20, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
            {z: 35, x: 21, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: false},
        ],
        [
            {z: 36, x: 18, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 36, x: 19, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 36, x: 20, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {z: 36, x: 21, name: '', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {z: 38, x: 18, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 38, x: 19, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 38, x: 20},
            {z: 38, x: 21, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: false},
        ],
        [
            {z: 39, x: 18, name: '김은영', gender: Genders.FEMALE, department: Departments.PMO, isReverse: true},
            {z: 39, x: 19, name: '심미진', gender: Genders.FEMALE, department: Departments.PMO, isReverse: true},
            {z: 39, x: 20, name: '윤하영', gender: Genders.FEMALE, department: Departments.PMO, isReverse: true},
            {z: 39, x: 21, name: '한승진', gender: Genders.MALE, department: Departments.PMO, isReverse: true},
        ],
        [
            {z: 41, x: 19, name: '최지현', gender: Genders.FEMALE, department: Departments.QA, isReverse: false},
            {z: 41, x: 20, name: '김재국', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 41, x: 21, name: '서은석', gender: Genders.MALE, department: Departments.QA, isReverse: false},
        ],
        [
            {z: 42, x: 19, name: '최하영', gender: Genders.FEMALE, department: Departments.QA, isReverse: true},
            {z: 42, x: 20, name: '김태형', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 42, x: 21, name: '김의진', gender: Genders.MALE, department: Departments.QA, isReverse: true},
        ],
        [
            {z: 44, x: 19, name: '', gender: Genders.FEMALE, department: Departments.QA, isReverse: false},
            {z: 44, x: 20},
        ],
        [
            {z: 45, x: 19, name: '', gender: Genders.FEMALE, department: Departments.QA, isReverse: true},
            {z: 45, x: 20},
            {z: 45, x: 21, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: true},
        ],
        [
            {z: 47, x: 18, name: '권재희', gender: Genders.FEMALE, department: Departments.QA, isReverse: false},
            {z: 47, x: 19, name: '한은경', gender: Genders.FEMALE, department: Departments.QA, isReverse: false},
            {z: 47, x: 20, name: '곽선명', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 47, x: 21, name: '김희민', gender: Genders.MALE, department: Departments.QA, isReverse: false},
        ],
        [
            {z: 48, x: 18, name: '임준혁', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 48, x: 19, name: '노상기', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 48, x: 20, name: '김용빈', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 48, x: 21, name: '박현주', gender: Genders.FEMALE, department: Departments.QA, isReverse: true},
        ],
        [
            {z: 50, x: 18, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 50, x: 19, name: '김대식', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 50, x: 20, name: '권오석', gender: Genders.MALE, department: Departments.QA, isReverse: false},
            {z: 50, x: 21, name: '이성봉', gender: Genders.MALE, department: Departments.QA, isReverse: false},
        ],
        [
            {z: 51, x: 18, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 51, x: 19, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: true},
            {z: 51, x: 20},
            {z: 51, x: 21, name: '', gender: Genders.MALE, department: Departments.QA, isReverse: true},
        ]
    ]
};