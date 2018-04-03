import Env from './../environments';

export default class DbService {

  static baseUrl() { return Env.baseUrl; }
  static parseUrl(url) { return DbService.baseUrl() + url; }

  static getItems() {
    const url = DbService.parseUrl('/api/items');
    console.log(url);
    return fetch(url).then(res => res.json());
  }

  static addItem(item) {
    const url = DbService.parseUrl('/api/items');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then(res => res.json());
  }
}
