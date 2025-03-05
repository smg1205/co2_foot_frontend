export const routes = [
    {
        path: "/",
        name: "首页",
        component: () => import("@/views/indexView.vue"),
    },
    {
        path: "/main",
        name: "展示页",
        redirect: "/main/show",
        children:[
            {
                path: "/main/show",
                name: "第一页",
                component: () => import("@/views/firstShowView.vue")
            },
            {
                path: "/main/info",
                name: "第二页",
                component: () => import("@/views/secondShowPage.vue")
            }
        ],
        component:() => import("@/views/mainView.vue"),
    }
]