'use strict'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import userService from '../src/service/UserServiceImpl'
import {IUser} from '../src/models'
import connect from '../src//mongoose/connect'
connect();

describe('User', () => {
  test('getUser', async (done) => {
    //{"_id":"11-fCQF7-TgIZvWlVyL0iCeL","displayName":"11","createdAt":{"$date":{"$numberLong":"1614094586731"}},"__v":{"$numberInt":"0"}}
    const user : IUser = await userService.getUser("11-fCQF7-TgIZvWlVyL0iCeL");
    //console.log('getUser', user);
    expect(user.id).toBe("11-fCQF7-TgIZvWlVyL0iCeL");
    done();
  });

  test('saveUser', async () => {
    //{"_id":"11-fCQF7-TgIZvWlVyL0iCeL","displayName":"11","createdAt":{"$date":{"$numberLong":"1614094586731"}},"__v":{"$numberInt":"0"}}

    const input : IUser = {
      id: 'test-' + Date.now(),
      displayName: 'test',
      createdAt: new Date()
    }
    const user : IUser = await userService.saveUser(input);
    console.log('saveUser', user);
    expect(user.id).not.toBe(undefined);
    
  });

  test('getUsers', async (done) => {
    
    const users : IUser[] = await userService.getUsers(["11-fCQF7-TgIZvWlVyL0iCeL", "test-1614226378509"]);
    console.log('getUsers', users);
    expect(users.length).toBe(2);
    done();
    
  });
});