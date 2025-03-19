import { defineStore } from 'pinia';
import axios from 'axios';

export const useFlocculantStore = defineStore('Flocculant', {
    state: () => ({
        flocculants: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchFlocculantData() {
            try {
                const response = await axios.get('http://localhost:8080/api/flocculant/getMonth?id=1');
                if (response.data.code === 0) {
                    // 提取 organicMatterFraction 和 observationDate
                    let obj = response.data.data
                    for(let i = 1;i < 13;i ++){
                        let base = "2023-";
                        if(i < 10){
                            base = base + "0" + i.toString()
                        }else{
                            base = base + i.toString()
                        }
                        this.flocculants.push(obj[base]);
                    }
                }
            } catch (error) {
                console.error('获取絮凝剂数据失败:', error);
            }
        }
    }
});
