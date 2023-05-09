/**
 * Created by jindrichdolezal on 01.05.2023
 */

import {createDrink,
        updateDrink,
        deleteDrink,
        getDrinks,
        getSingleDrink}
from "./drinkFunctions";
import mongoose from "mongoose";
import {getNotFound} from "./testFunctions";
import app from "../src/app";
import LoginMessageResponse from "../src/interfaces/LoginMessageResponse";
import {UserTest} from "../src/interfaces/User";
import randomstring from "randomstring";
import {getSingleUser, getUser, loginBrute, loginUser, postUser, putUser} from "./userFunctions";
import jwt from "jsonwebtoken";
import {Drink, testDrink} from "../src/interfaces/Drink";
import {testBarrel} from "../src/interfaces/Barrel";
import {createBarrel, deleteBarrel, getBarrelByDrink, getBarrels} from "./barrelFunctions";
import {testLoans} from "../src/interfaces/Loans";
import {createLoan} from "./loanFunctions";

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  // test create user
  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const adminUser: UserTest = {
    username: 'admin',
    email: 'admin@test.com',
    password: 'lol007',
  };

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  // create second user to try to modify someone else's cats and userdata
  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  // test login
  it('should login user', async () => {
    userData = await loginUser(app, testUser);
  });

  // test login with second user
  it('should login second user', async () => {
    userData2 = await loginUser(app, testUser2);
  });

  // test login with admin
  it('should login admin', async () => {
    adminData = await loginUser(app, adminUser);
  });

  // make sure token has role (so that we can test if user is admin or not)
  it('token should have role', async () => {
    const dataFromToken = jwt.verify(
      userData.token!,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('role');
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  // test update user
  it('should update user', async () => {
    await putUser(app, userData.token!);
  });

  // test create drink
  let drinkData: testDrink;
  it('should create drink', async () => {
    drinkData = {
      name: 'Test drink ' + randomstring.generate(7),
      amountOfAlcohol: 5,
      brewery: 'Test brewery ' + randomstring.generate(7),
      description: 'Test description ' + randomstring.generate(7),
      image: "https://images.punkapi.com/v2/192.png",
      type: 'Test type ' + randomstring.generate(7),
      ibu: 25.0,
    };
  });

  // test post create drink
  let drinkId: string;
  let drink: testDrink;
  it('should post drink', async () => {
    console.log('drinkData', drinkData);
    drink = await createDrink(app, drinkData, adminData.token!);
    drinkId = drink.id!;
  });

  // test get all drinks
  it('should get all drinks', async () => {
    await getDrinks(app);
  });

  // test get single drink
  it('should get single drink', async () => {
    await getSingleDrink(app, drinkId);
  });

  // // modify drink with user who is not admin
  // it('should not modify drink', async () => {
  //   const newDrinkData: testDrink = {
  //     name: 'Test drink ' + randomstring.generate(7),
  //   };
  //   await updateDrink(app, newDrinkData, drinkId, userData.token!);
  // });

  // modify drink with admin
  it('should modify drink', async () => {
    const newDrinkData: testDrink = {
      name: 'Test drink ' + randomstring.generate(7),
    };
    await updateDrink(app, newDrinkData, drinkId, adminData.token!);
  });

  // test create barrel
  let barrelData: testBarrel;
  it('should create barrel', async () => {
    barrelData = {
      price: 65,
      volume: 50,
      drink: drinkId,
      available: true,
    };
  });

  // test post create barrel
  let barrelId: string;
  it('should post barrel', async () => {
    console.log('barrelData', barrelData);
    const barrel = await createBarrel(app, barrelData, adminData.token!);
    barrelId = barrel.id!;
});

  // test get all barrels
  it('should get all barrels', async () => {
    await getBarrels(app);
  });

  // test get single barrel by drink
  it('should get single barrel by drink', async () => {
    await getBarrelByDrink(app, drinkId);
  });

  // test create loan
  let loanData: testLoans;
  it('should create loan', async () => {
    loanData = {
      barrel: [barrelId],
      user: userData.user.id!,
      pickUp: "Helsinki",
    };
  });

  // test post create loan
  let loan : testLoans;
  it('should post loan', async () => {
    console.log('loanData', loanData);
    loan = await createLoan(app, loanData, userData.token!);
  });


  // delete barrel
  it('should delete barrel', async () => {
    await deleteBarrel(app, barrelId, adminData.token!);
  });

  // delete drink with user who is admin
  it('should delete drink', async () => {
    await deleteDrink(app, drinkId, adminData.token!);
  });

  // test brute force protectiom
  test('Brute force attack simulation', async () => {
    const maxAttempts = 20;
    const mockUser: UserTest = {
      username: 'Test User ' + randomstring.generate(7),
      email: randomstring.generate(9) + '@user.fi',
      password: 'notthepassword',
    };

    try {
      // Call the mock login function until the maximum number of attempts is reached
      for (let i = 0; i < maxAttempts; i++) {
        const result = await loginBrute(app, mockUser);
        if (result) throw new Error('Brute force attack unsuccessful');
      }

      // If the while loop completes successfully, the test fails
      throw new Error('Brute force attack succeeded');
    } catch (error) {
      console.log(error);
      // If the login function throws an error, the test passes
      expect((error as Error).message).toBe('Brute force attack unsuccessful');
    }
  }, 15000);
});
