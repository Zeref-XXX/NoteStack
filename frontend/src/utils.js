import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        duration: 5000
    })
}

export const handleError = (msg) => {
    toast.error(msg, { 
        position: 'top-right',
        duration: 5000
    })
}

// Function to handle HTTP response errors
export const handleResponse = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}

