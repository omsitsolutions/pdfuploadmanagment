
import request from './request.services';

export const viewer = async (id) => {
    
    const response = await request.post(`/documents/viewer?fileId=${id}`, {}, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/pdf'
        }
    })

    return response
}


