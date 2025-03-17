import { defineStore } from 'pinia';
import axios from 'axios';

export const useNO2Store = defineStore('NO2', {
    state: () => ({
        NO2Info: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchNO2Data() {
            try {
                const response = await axios.get('http://localhost:8080/api/n2o/getMonth?id=1');
                if (response.data.code === 0) {
                    // 提取 organicMatterFraction 和 observationDate
                    let obj = response.data.data
                    for(let i = 1;i < 13;i ++){
                        let base = "2024-";
                        if(i < 10){
                            base = base + "0" + i.toString()
                        }else{
                            base = base + i.toString()
                        }
                        this.NO2Info.push(obj[base]);
                    }
                // console.log*this
                }
            } catch (error) {
                console.error('获取NO2数据失败:', error);
            }
        }
    }
});
