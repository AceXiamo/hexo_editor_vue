import request from '@/js/request';

export function files(data) {
    return request({
        url: '/api/hexo/files',
        method: 'get',
        params: data
    });
}

export function readFile(data) {
    return request({
        url: '/api/hexo/readFile',
        method: 'get',
        params: data
    });
}

export function saveFile(data) {
    return request({
        url: '/api/hexo/saveFile',
        method: 'post',
        data: data
    });
}

export function removeFile(data) {
    return request({
        url: '/api/hexo/removeFile',
        method: 'post',
        data: data
    });
}

export function createFile(data) {
    return request({
        url: '/api/hexo/createFile',
        method: 'post',
        data: data
    });
}