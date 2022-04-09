import request from '@/js/request';

export function pixivInfo(data) {
  return request({
    url: '/api/pixiv/info',
    method: 'get',
    params: data
  });
}

export function toByte(data) {
  return request({
    url: '/api/pixiv/toByte',
    method: 'get',
    params: data
  });
}

export function list(data) {
  return request({
    url: '/api/pixiv/list',
    method: 'get',
    params: data
  });
}

export function save(data) {
  return request({
    url: '/api/pixiv/save',
    method: 'post',
    data: data
  });
}

export function imageInfo(data) {
  return request({
    url: '/api/pixiv/imageInfo',
    method: 'get',
    params: data
  });
}

export function del(data) {
  return request({
    url: '/api/pixiv/del',
    method: 'post',
    params: data
  });
}