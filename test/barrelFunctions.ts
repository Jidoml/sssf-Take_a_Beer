/**
 * Created by jindrichdolezal on 09.05.2023
 */

import request from "supertest";
import {testBarrel} from "../src/interfaces/Barrel";

/*
mutation CreateBarrel($price: Float!, $volume: Float!, $drink: ID!, $available: Boolean!) {
  createBarrel(price: $price, volume: $volume, drink: $drink, available: $available) {
    id
    price
    volume
    drink {
      name
    }
    available
  }
}
 */

const createBarrel = (
  url: string | Function,
  barrel: testBarrel,
  token: string
): Promise<testBarrel> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateBarrel($price: Float!, $volume: Float!, $drink: ID!, $available: Boolean!) {
      createBarrel(price: $price, volume: $volume, drink: $drink, available: $available) {
        id
        price
        volume
        drink {
          name
        }
        available
      }
    }`,
        variables: barrel,
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const newBarrel = response.body.data.createBarrel;
          expect(newBarrel.price).toBe(barrel.price);
          expect(newBarrel.volume).toBe(barrel.volume);
          expect(newBarrel.available).toBe(barrel.available);
          return resolve(newBarrel);
        }
      });
  });
};

/*
mutation DeleteBarrel($deleteBarrelId: ID!) {
  deleteBarrel(id: $deleteBarrelId) {
    id
    price
    volume
    drink {
      name
    }
    available
  }
}
 */

const deleteBarrel = (
  url: string | Function,
  id: string,
  token: string
): Promise<testBarrel> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteBarrel($deleteBarrelId: ID!) {
      deleteBarrel(id: $deleteBarrelId) {
        id
        price
        volume
        drink {
          name
        }
        available
      }
    }`,
        variables: {deleteBarrelId: id},
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const deletedBarrel = response.body.data.deleteBarrel;
          expect(deletedBarrel.id).toBe(id);
          expect(deletedBarrel.price).toBe(65);
          expect(deletedBarrel.volume).toBe(50);
          expect(deletedBarrel.available).toBe(true);
          return resolve(deletedBarrel);
        }
      });
  });
}

/*
query Barrels {
  barrels {
    id
    price
    volume
    drink {
      name
    }
    available
  }
}
 */
const getBarrels = (url: string | Function): Promise<testBarrel[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Barrels {
      barrels {
        id
        price
        volume
        drink {
          name
        }
        available
      }
    }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const barrels = response.body.data.barrels;
          expect(barrels).toBeInstanceOf(Array);
          resolve(barrels);
        }
      });
  });
};

/*
query BarrelByDrink($drinkId: ID!) {
  barrelByDrink(drinkId: $drinkId) {
    id
    price
    volume
    drink {
      name
    }
    available
  }
}
 */

const getBarrelByDrink = (url: string | Function, drinkId: string): Promise<testBarrel[]> => {
  return new Promise((resolve, reject) => {
  request(url)
    .post('/graphql')
    .set('Content-type', 'application/json')
    .send({
      query: `query BarrelByDrink($drinkId: ID!) {
      barrelByDrink(drinkId: $drinkId) {
        id
        price
        volume
        drink {
          name
        }
        available
      }
    }`,
      variables: {drinkId: drinkId},
    })
    .expect(200, (err, response) => {
      console.log(response.body.barrelByDrink);
      if (err) {
        reject(err);
      } else {
        console.log(response.body);
        const barrels = response.body.data.barrelByDrink;
        expect(barrels).toBeInstanceOf(Array);
        resolve(barrels);
      }
    });
  });
};

export {createBarrel, deleteBarrel, getBarrels, getBarrelByDrink};
