import { defineStore } from 'pinia';
import axios from 'axios';

export const useHeatStore = defineStore('heat', {
    state: () => ({
        standardCoalEmissionFactors: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchHeatData() {
            try {
                const response = await axios.get('http://localhost:8080/api/heat/getDaily?id=1');
                if (response.data.code === 0) {
                    // 提取 organicMatterFraction 和 observationDate
                    this.standardCoalEmissionFactors = response.data.data.map(item => item.standardCoalEmissionFactor);
                }
            } catch (error) {
                console.error('获取日热耗数据失败:', error);
            }
        }
    }
});
