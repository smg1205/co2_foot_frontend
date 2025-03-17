import { defineStore } from 'pinia';
import axios from 'axios';

export const useEleStore = defineStore('ele', {
    state: () => ({
        electricityCarbonEmissionFactors: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchEleData() {
            try {
                const response = await axios.get('http://localhost:8080/api/elec/getDaily?id=1');
                if (response.data.code === 0) {
                    // 提取 organicMatterFraction 和 observationDate
                    this.electricityCarbonEmissionFactors = response.data.data.map(item => item.electricityCarbonEmissionFactor);
                }
            } catch (error) {
                console.error('获取日电耗数据失败:', error);
            }
        }
    }
});
