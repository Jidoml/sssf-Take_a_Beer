/**
 * Created by jindrichdolezal on 08.05.2023
 */

import request from "supertest";
import {testLoans} from "../src/interfaces/Loans";

/*
mutation CreateLoan($user: ID!, $barrel: [ID]!, $pickUp: String!) {
  createLoan(user: $user, barrel: $barrel, pickUp: $pickUp) {
    user {
      username
      id
    }
    barrel {
      id
      price
      drink {
        name
        id
      }
    }
    pickUp
  }
}
 */

const createLoan = (
  url: string | Function,
  loan: testLoans,
  token: string
): Promise<testLoans> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateLoan($user: ID!, $barrel: [ID]!, $pickUp: String!) {
          createLoan(user: $user, barrel: $barrel, pickUp: $pickUp) {
            user {
              username
              id
            }
            barrel {
              id
              price
              drink {
                name
                id
              }
            }
            pickUp
          }
        }`,
        variables: loan,
      })
      .expect(200, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          console.log(response.body);
          const newLoan = response.body.data.createLoan;
          expect(newLoan.user.id).toBe(loan.user);
          expect(newLoan.barrel).toBeInstanceOf(Array);
          expect(newLoan.pickUp).toBe(loan.pickUp);
          resolve(newLoan);
        }
      });
  });
};

export {createLoan};
