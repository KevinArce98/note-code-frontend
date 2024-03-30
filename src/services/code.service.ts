import { CreateCodeDto } from '../types';

export const createCode = async (data: CreateCodeDto) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    return response.json();
  } catch (error) {
    return null;
  }
};

export const getCode = async (codeId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/code/${codeId}`);
    return response.json();
  } catch (error) {
    return null;
  }
};