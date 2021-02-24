'use strict'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import userService from '../src/service/UserServiceImpl'
import {IUser} from '../src/models'
import connect from '../src//mongoose/connect'
connect();

describe('Test', () => {
  test('Test UserService::getUser', async (done) => {
    //{"_id":"11-fCQF7-TgIZvWlVyL0iCeL","displayName":"11","createdAt":{"$date":{"$numberLong":"1614094586731"}},"__v":{"$numberInt":"0"}}
    const user : IUser = await userService.getUser("11-fCQF7-TgIZvWlVyL0iCeL");
    console.log('user', user);
    expect(user.id).toBe("11-fCQF7-TgIZvWlVyL0iCeL");
    done();
  });
});