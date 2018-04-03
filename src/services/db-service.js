import Env from './../environments';

export default class DbService {

  static baseUrl() { return Env.baseUrl; }
  static parseUrl(url) { return DbService.baseUrl() + url; }

  static findModel(modelUrl) {
    const url = DbService.parseUrl('/api/model');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: modelUrl })
    }).then(res => res.json());
  }

  static updateModel(modelUrl, modelValue) {
    const url = DbService.parseUrl('/api/model');
    return fetch(url, {
      method: 'PUT',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ url: modelUrl, value: modelValue })
    }).then(res => res.json());
  }
}
