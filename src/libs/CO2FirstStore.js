import { defineStore } from 'pinia';
import axios from 'axios';

export const useCO2Store = defineStore('CO2', {
    state: () => ({
        CO2Info: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchCO2Data() {
            try {
                const response = await axios.get('http://localhost:8080/api/co2/getMonth?id=1');
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
                        this.CO2Info.push(obj[base]);
                    }
                }
            } catch (error) {
                console.error('获取CH4数据失败:', error);
            }
        }
    }
});
