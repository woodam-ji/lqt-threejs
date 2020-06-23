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
    PH: 'PH'
}
const DepartmentColors = {
    LQT: '#ead1dc',
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
    PH: '#ce76a1'
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
    return [
        [
            {index: 0, name: '신창선', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 0, name: '문지훈', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 0, name: '이정현', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 0, name: '김강일', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        [
            {index: 1, name: '손미리', gender: Genders.FEMALE, department: Departments.LQT},
            {index: 1, name: '함문주', gender: Genders.FEMALE, department: Departments.LQT},
            {index: 1, name: '이인희', gender: Genders.FEMALE, department: Departments.LQT},
            {index: 1, name: '지우담', gender: Genders.MALE, department: Departments.LQT},
        ],
        [
            {index: 2, name: '정현대', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 2, name: '염경민', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 2, name: '이민재', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
            {index: 2, name: '조기운', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        ],
        // [
        //     {name: '진명성', gender: Genders.MALE, department: Departments.LQT},
        //     {name: '장현길', gender: Genders.MALE, department: Departments.LQT},
        //     {isPillar: true},
        //     {name: '안창영', gender: Genders.MALE, department: Departments.LQT}
        // ],
        // [
        //     {name: '서광석', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        //     {name: '전용성', gender: Genders.MALE, department: Departments.LQT, isReverse: true},
        //     {isPillar: true},
        //     {name: '이경연', gender: Genders.FEMALE, department: Departments.LQT, isReverse: true},
        // ]
    ]
}