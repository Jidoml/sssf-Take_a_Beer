/**
 * Created by jindrichdolezal on 01.05.2023
 */

// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';

const getNotFound = (url: string | Function) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/what-is-this')
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

export {getNotFound};
