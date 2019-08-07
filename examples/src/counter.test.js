import { getShortestPaths } from '@xstate/graph'
import { Machine, interpret } from 'xstate'
import { counterMachine } from './counter'

it('performs counter state transitions correctly', () => {
  let count = 0
  const counterService = interpret(counterMachine)
    .onTransition(state => {
      count = state.context.count
    })
    .start()
  expect(count).toEqual(0)
  expect(counterService.state.value).toEqual('active')

  counterService.send('INC')
  expect(count).toEqual(1)

  counterService.send('DEC')
  expect(count).toEqual(0)

  counterService.send('DISABLE')
  expect(counterService.state.value).toEqual('inactive')

  counterService.send('INC')
  expect(count).toEqual(0)
  counterService.send('DEC')
  expect(count).toEqual(0)

  counterService.send('ENABLE')
  expect(counterService.state.value).toEqual('active')
})

it('automatically test all paths in counter', () => {
  const machine = Machine(counterMachine)
  const paths = getShortestPaths(machine)

  console.log(JSON.stringify(paths))
})

it('simplePaths example', () => {
  const feedbackMachine = Machine({
    id: 'feedback',
    initial: 'question',
    states: {
      question: {
        on: {
          CLICK_GOOD: 'thanks',
          CLICK_BAD: 'form',
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      form: {
        on: {
          SUBMIT: 'thanks',
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      closed: {
        type: 'final'
      }
    }
  })

  const simplePaths = getShortestPaths(feedbackMachine)

  console.log(JSON.stringify(simplePaths))
})
