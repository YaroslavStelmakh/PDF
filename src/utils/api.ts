import axios from 'axios';

const API_URL = 'http://95.217.134.12:4010';
const API_KEY = '78684310-850d-427a-8432-4a6487f6dbc4';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, 
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  },
  (error) => {
    if (error.response) {
      console.error('Server response error:', error.response.data);
      return Promise.reject(new Error(`Server error: ${error.response.status}`));
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject(new Error('No response received from server.'));
    } else {
      console.error('Axios configuration error:', error.message);
      return Promise.reject(new Error(`Axios error: ${error.message}`));
    }
  }
);

export const convertToPdf = async (text: string): Promise<string> => {
  try {
    const response = await axiosInstance.post('/create-pdf', { text }, {
      params: { apiKey: API_KEY },
      responseType: 'blob', 
    });

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return pdfUrl;
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw error;
  }
};

export default axiosInstance;
