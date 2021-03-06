import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess } from '../_util';

function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      role: {
        roleName: 'Super Admin',
        value: 'super',
      },
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      desc: 'tester',
      token: 'fakeToken2',
      role: {
        roleName: 'Tester',
        value: 'test',
      },
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError('帐户或密码不正确！');
      }
      const { userId, username: _username, token, realName, desc, role } = checkUser;
      return resultSuccess({
        role,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: '/api/getUserInfoById',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { userId } = query;
      const checkUser = createFakeUserList().find((item) => item.userId === userId);
      if (!checkUser) {
        return resultError('没有获得相应的用户信息!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/api/getPermCodeByUserId',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { userId } = query;
      if (!userId) {
        return resultError('用户id不是空的!');
      }
      const codeList = fakeCodeList[userId];

      return resultSuccess(codeList);
    },
  },
] as MockMethod[];
