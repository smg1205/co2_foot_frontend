// 这个页面主要写路由的跳转，放在一个文件里面，直接调用就行，方便易懂
import {router} from "@/router/router.js";

function goToMain(){
    router.push("/main").then(r => r)
}

export {goToMain}
