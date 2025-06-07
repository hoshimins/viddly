
export const userService = {
  async register(username: string, password: string) {

    return { user: { id: 1, username } };
  },

  async login(username: string, password: string) {
    return { token: 'token' };
  },
};
