/**
 * Created by jindrichdolezal on 01.05.2023
 */

import request from "supertest";
import {testDrink} from "../src/interfaces/Drink";
import expect from "expect";


/*
mutation CreateDrink($name: String!, $description: String!, $image: String!, $amountOfAlcohol: Float!, $brewery: String!, $type: String!, $ibu: Float!) {
  createDrink(name: $name, description: $description, image: $image, amountOfAlcohol: $amountOfAlcohol, brewery: $brewery, type: $type, IBU: $ibu) {
    id
    name
    description
    image
    amountOfAlcohol
    brewery
    type
      IBU
  }
}*/
const createDrink = (
  url: string | Function,
  drink: testDrink,
  token: string
): Promise<testDrink> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateDrink($name: String!, $description: String!, $image: String!, $amountOfAlcohol: Float!, $brewery: String!, $type: String!, $ibu: Float!) {
                  createDrink(name: $name, description: $description, image: $image, amountOfAlcohol: $amountOfAlcohol, brewery: $brewery, type: $type, IBU: $ibu) {
                  id
                  name
                  description
                  image
                  amountOfAlcohol
                  brewery
                  type
                  IBU
                  }
            }`,
        variables: drink,
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const newDrink = response.body.data.createDrink;
          expect(newDrink.name).toBe(drink.name);
          expect(newDrink.description).toBe(drink.description);
          expect(newDrink.image).toBe(drink.image);
          expect(newDrink.amountOfAlcohol).toBe(drink.amountOfAlcohol);
          expect(newDrink.brewery).toBe(drink.brewery);
          expect(newDrink.type).toBe(drink.type);
          expect(newDrink.IBU).toBe(drink.ibu);
          resolve(newDrink);
        }
      });
  });
};

/*
mutation UpdateDrink($updateDrinkId: ID!, $name: String) {
  updateDrink(id: $updateDrinkId, name: $name) {
    name
    IBU
    amountOfAlcohol
    brewery
    description
    id
    image
    type
  }
}
*/

const updateDrink = (
  url: string | Function,
  drink: testDrink,
  id: string,
  token: string
): Promise<testDrink> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateDrink($updateDrinkId: ID!, $name: String) {
                  updateDrink(id: $updateDrinkId, name: $name) {
                    name
                    IBU
                    amountOfAlcohol
                    brewery
                    description
                    id
                    image
                    type
                  }
                }`,
        variables: {
          ...drink,
          updateDrinkId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const newDrink = response.body.data.updateDrink;
          console.log(newDrink);
          expect(newDrink.name).toBe(drink.name);
          resolve(newDrink);
        }
      });
  });
};

/*
mutation DeleteDrink($deleteDrinkId: ID!) {
  deleteDrink(id: $deleteDrinkId) {
    id
    name
    description
    image
    amountOfAlcohol
    brewery
    type
    IBU
  }
}
 */
const deleteDrink = (
  url: string | Function,
  id: string,
  token: string
): Promise<testDrink> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteDrink($deleteDrinkId: ID!) {
                  deleteDrink(id: $deleteDrinkId) {
                    id
                    name
                    description
                    image
                    amountOfAlcohol
                    brewery
                    type
                    IBU
                  }
                }`,
        variables: {
          deleteDrinkId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response.body);
          const deletedDrink = response.body.data.deleteDrink;
          expect(deletedDrink.id).toBe(id);
          resolve(deletedDrink);
        }
      });
  });
};

/*
query Drinks {
  drinks {
    id
    name
    description
    image
    amountOfAlcohol
    brewery
    type
    IBU
  }
}
 */
const getDrinks = (url: string | Function): Promise<testDrink[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Drinks {
  drinks {
    id
    name
    description
    image
    amountOfAlcohol
    brewery
    type
    IBU
  }
}`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response.body);
          const drinks = response.body.data.drinks;
          expect(drinks).toBeInstanceOf(Array);
          drinks.forEach((drink: testDrink) => {
            console.log(drink.id);
            expect(drink).toHaveProperty('id');
            expect(drink).toHaveProperty('name');
            expect(drink).toHaveProperty('description');
            expect(drink).toHaveProperty('image');
            expect(drink).toHaveProperty('amountOfAlcohol');
            expect(drink).toHaveProperty('brewery');
            expect(drink).toHaveProperty('type');
            expect(drink).toHaveProperty('IBU');
          });
          resolve(drinks);
        }
      });
  });
};

/*
Query Drink($drinkId: ID!) {
  drink(id: $drinkId) {
    id
    name
    description
    image
    amountOfAlcohol
    brewery
    type
    IBU
  }
}
 */
const getSingleDrink = (url: string | Function, id: string): Promise<testDrink> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Drink($drinkId: ID!) {
                  drink(id: $drinkId) {
                    id
                    name
                    description
                    image
                    amountOfAlcohol
                    brewery
                    type
                    IBU
                  }
                }`,
        variables: {
          drinkId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const drink = response.body.data.drink;
          expect(drink.id).toBe(id);
          expect(drink).toHaveProperty('name');
          expect(drink).toHaveProperty('description');
          expect(drink).toHaveProperty('image');
          expect(drink).toHaveProperty('amountOfAlcohol');
          expect(drink).toHaveProperty('brewery');
          expect(drink).toHaveProperty('type');
          expect(drink).toHaveProperty('IBU');
          resolve(drink);
        }
      });
  });
};

export {
  createDrink,
  updateDrink,
  deleteDrink,
  getDrinks,
  getSingleDrink,
}
