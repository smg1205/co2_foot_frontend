import { defineStore } from 'pinia';
import axios from 'axios';

export const useCh4Store = defineStore('ch4', {
    state: () => ({
        organicMatterFractions: [], // 存储 organicMatterFraction
    }),
    actions: {
        async fetchCh4Data() {
            try {
                const response = await axios.get('http://localhost:8080/api/ch4/getDaily?id=1');
                if (response.data.code === 0) {
                    // 提取 organicMatterFraction 和 observationDate
                    this.organicMatterFractions = response.data.data.map(item => item.organicMatterFraction);
                }
            } catch (error) {
                console.error('获取CH4数据失败:', error);
            }
        }
    }
});
