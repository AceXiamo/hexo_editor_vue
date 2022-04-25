import request from '@/js/request';

export function all() {
  return request({
    url: '/api/cover/all',
    method: 'get'
  });
}

export function edit(data) {
  return request({
    url: '/api/cover/edit',
    method: 'post',
    params: data
  });
}
