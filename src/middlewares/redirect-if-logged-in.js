import { isLoggedIn } from '../common/helpers';

export default async function redirectIfLoggedIn(props) {
  if (await isLoggedIn()) {
    return props.history.push('/')
  }
}