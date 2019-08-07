import { Machine, assign } from 'xstate'

const increment = context => context.count + 1
const decrement = context => context.count - 1

export const counterMachine = Machine({
  context: {
    count: 0
  },
  id: 'counter',
  initial: 'active',
  states: {
    active: {
      on: {
        DEC: { actions: assign({ count: decrement }) },
        DISABLE: { target: 'inactive' },
        INC: { actions: assign({ count: increment }) }
      }
    },
    inactive: {
      on: {
        ENABLE: { target: 'active' }
      }
    }
  }
})
