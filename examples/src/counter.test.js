import { counterMachine } from './counter'
import { interpret } from 'xstate'

it('performs counter state transitions correctly', () => {
  let count = counterMachine.initialState
  const counterService = interpret(counterMachine)
    .onTransition(state => {
      count = state.context.count
    })
    .start()
  expect(count).toEqual(0)

  counterService.send('INC')
  expect(count).toEqual(1)

  counterService.send('DEC')
  expect(count).toEqual(0)
})
