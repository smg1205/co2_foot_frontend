import axios from 'axios';

async function fetchAIData() {
    try {
        const response = await axios.get('http://localhost:8080/queryAI?id=1');

        // 如果后端直接返回字符串
        if (typeof response.data === 'string') {
            console.log(response.data);
            return response.data;
        } else {
            console.warn('返回的数据不是字符串');
            return JSON.stringify(response.data); // 以防万一，转换成字符串返回
        }
    } catch (error) {
        console.error('请求失败喵~', error);
        return '请求失败喵~';
    }
}

export {fetchAIData};