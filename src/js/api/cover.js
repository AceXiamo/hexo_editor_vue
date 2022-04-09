import request from '@/js/request';

export function all() {
  return request({
    url: '/api/cover/all',
    method: 'get'
  });
}