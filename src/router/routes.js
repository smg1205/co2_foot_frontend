export const routes = [
    {
        path: "/",
        name: "首页",
        meta: { isShow: true },
        component: () => import("@/views/indexView.vue"),
    },
    {
        path: "/main",
        redirect: "/main/tran",
        component: () => import("@/views/mainView.vue"),
        children: [
            {
                path: "tran",
                name: "向导页",
                meta: {
                    isShow: true,
                    backImg: ""
                },
                component: () => import("@/views/transitionView.vue")
            },
            {
                path: "show", // 相对路径
                name: "低碳运行评价",
                meta: {
                    isShow: true,
                    backImg: ""
                },
                component: () => import("@/views/firstShowViewEdit.vue")
            },
            {
                path: "info", // 相对路径
                name: "碳绿轨迹",
                meta: {
                    isShow: true,
                    backImg: ""
                },
                component: () => import("@/views/secondShowView.vue")
            },
            {
                path: "stan", // 相对路径
                name: "清洁生产水平分析",
                meta: {
                    isShow: true,
                    backImg: ""
                },
                component: () => import("@/views/thirdShowView.vue")
            },

        ]
    }
];
