import userService from "../services/user-service";


export function isLoggedIn() {
  return userService.isLoggedIn();
}

export const appName = 'Helpers';