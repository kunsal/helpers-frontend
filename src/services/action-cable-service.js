import userService from "./user-service";
import ActionCable from 'actioncable'

const consumer = () => {
  return ActionCable.createConsumer(`ws://localhost:8800/cable?token=${userService.token()}`);
}

export const HelpChannel = () => {
  return consumer.subscriptions.create({channel: 'HelpChannel'}, {
    received: () => console.log('Received info from help')
  })
}

export default consumer;