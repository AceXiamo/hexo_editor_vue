import request from '@/js/request';

export function login(data) {
  return request({
    url: '/api/login',
    method: 'get',
    params: data
  });
}

export function saveSKey(data) {
  return request({
    url: '/api/saveSKey',
    method: 'get',
    params: data
  });
}
