

export default {
    versionControl:{
        Component:() =>import('./versionControl').then(v => v.default),
        Name:"版本控制",
        id:'1',
        Key:"sub1"
    },
    funManage:{
        Component:() =>import('./funManage').then(v => v.default),
        Name:"功能管理",
        id:'2',
        Key:"sub2"
    },
    proConfig:{
        Component:() =>import('./proConfig').then(v => v.default),
        Name:"产品配置",
        id:'3',
        Key:"sub3"
    },
    organArgument:{
        Component:() =>import('./organArgument').then(v => v.default),
        Name:"机构协议",
        id:'4',
        Key:"sub4"
    }
}