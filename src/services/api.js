import axios from 'axios';

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

export const fetchData = async () => {
    try {
        const response = await axios.post(API_URL, {
            username: "test",
            password: "123456"
        });

        // The API returns { TABLE_DATA: { data: [ [name, pos, city, id, date, salary], ... ] } }
        if (response.data?.TABLE_DATA?.data) {
            return response.data.TABLE_DATA.data.map(item => ({
                name: item[0],
                designation: item[1],
                city: item[2],
                id: item[3],
                date: item[4],
                salary: item[5]?.replace(/[$,]/g, '') || '0' // Convert "$320,800" to "320800"
            }));
        }

        return [];
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
