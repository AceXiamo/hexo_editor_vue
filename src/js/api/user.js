import request from '@/js/request';

export function login(data) {
    return request({
        url: '/api/login',
        method: 'get',
        params: data
    });
}