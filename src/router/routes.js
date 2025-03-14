export const routes = [
    {
        path: "/",
        name: "首页",
        meta: { isShow: true },
        component: () => import("@/views/indexView.vue"),
    },
    {
        path: "/main",
        name: "展示页",
        redirect: "/main/show",
        component: () => import("@/views/mainView.vue"),
        children: [
            {
                path: "show", // 相对路径
                name: "碳排放强度展示",
                meta: { isShow: true },
                component: () => import("@/views/firstShowViewEdit.vue")
            },
            {
                path: "info", // 相对路径
                name: "趋势图",
                meta: { isShow: true },
                component: () => import("@/views/secondShowView.vue")
            },
            {
                path: "stan", // 相对路径
                name: "指标及建议",
                meta: { isShow: true },
                component: () => import("@/views/thirdShowView.vue")
            },
        ]
    }
];
