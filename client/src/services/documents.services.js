
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

export const details = async (id) => {
    const response = await request.get(`/documents/details?fileId=${id}`)
    return response
}

export const deleteId = async (id) => {
    const response = await request.delete(`/documents/deleteId?fileId=${id}`)
    console.log(response);
    return response
}
