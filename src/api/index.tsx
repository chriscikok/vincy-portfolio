import axios from 'axios';

interface S3ObjectListResponse {
    files: string[];
}

export async function fetchObjectList(url: string, prefix: string) {
  try {
    const response = await axios.get<S3ObjectListResponse>(url, {
      params: { prefix },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.files ?? [];
  } catch (error) {
    console.error('Error fetching object list:', error);
    return [];
  }
}