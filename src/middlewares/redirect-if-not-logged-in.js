import { isLoggedIn } from '../common/helpers';

export default async function redirectIfNotLoggedIn(props) {
  if (!await isLoggedIn()) {
    return props.history.push('/login')
  }
}