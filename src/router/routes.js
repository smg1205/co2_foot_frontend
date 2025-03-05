// 这里是路由的js，只是存了一下路由，真正的路由实现再router.js中
export const routes = [
    {
        path: "/",
        name: "首页",
        meta:{
            isShow: true
        },
        component: () => import("@/views/indexView.vue"),
    },
    {
        path: "/main",
        name: "展示页",
        redirect: "/main/show",
        children:[
            {
                path: "/main/show",
                name: "各项指标",
                meta:{
                    isShow: true
                },
                component: () => import("@/views/firstShowView.vue")
            },
            {
                path: "/main/info",
                name: "详情展示",
                meta:{
                    isShow: true
                },
                component: () => import("@/views/secondShowPage.vue")
            }
        ],
        component:() => import("@/views/mainView.vue"),
    }
]