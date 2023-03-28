import request from '@/js/request';

export function list(data) {
  return request({
    url: '/api/source/list',
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/api/source/save',
    method: 'post',
    data: data
  });
}

export function update(data) {
  return request({
    url: '/api/source/update',
    method: 'post',
    data: data
  });
}

export function del(data) {
  return request({
    url: '/api/source/del',
    method: 'post',
    params: data
  });
}
