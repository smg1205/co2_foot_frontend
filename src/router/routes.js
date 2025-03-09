export const routes = [
    {
        path: "/",
        name: "首页",
        meta: {
            isShow: true
        },
        component: () => import("@/views/indexView.vue"),
    },
    {
        path: "/main",
        name: "展示页",
        component: () => import("@/views/mainView.vue"),
        children: [
            {
                path: "/main/show", // 相对路径
                name: "碳排放强度展示",
                meta: {
                    isShow: true
                },
                component: () => import("@/views/firstShowView.vue")
            },
            {
                path: "/main/info", // 相对路径
                name: "趋势图",
                meta: {
                    isShow: true
                },
                component: () => import("@/views/secondShowView.vue")
            },
            {
                path: "/main/stan", // 相对路径
                name: "指标及建议",
                meta: {
                    isShow: true
                },
                component: () => import("@/views/thirdShowView.vue")
            }
        ]
    }
];
