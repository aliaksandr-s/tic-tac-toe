import Vue from 'vue'
import Grid from '../components/Grid.vue'

Event.$on = () => undefined // to remove errors

describe('CPU tests', () => {
  const winConditions = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
        [1, 5, 9], [3, 5, 7]             // diagonals
      ]

  describe('winning cases', () => {
    test('row case', () => {
      const initData = {
        data: {
          cpuPlayer: 'X',
          humanPlayer: 'O',
          cells: {
            1: { value: 'X', isFrozen: false, index: 1 },
            2: { value: 'X', isFrozen: false, index: 2 },
            3: { value: '', isFrozen: false, index: 3 },
            4: { value: '', isFrozen: false, index: 4 },
            5: { value: 'O', isFrozen: false, index: 5 },
            6: { value: '', isFrozen: false, index: 6 },
            7: { value: '', isFrozen: false, index: 7 },
            8: { value: 'O', isFrozen: false, index: 8 },
            9: { value: 'O', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(3)
    });

    test('coll case', () => {
      const initData = {
        data: {
          cpuPlayer: 'X',
          humanPlayer: 'O',
          cells: {
            1: { value: 'X', isFrozen: false, index: 1 },
            2: { value: 'O', isFrozen: false, index: 2 },
            3: { value: 'O', isFrozen: false, index: 3 },
            4: { value: 'X', isFrozen: false, index: 4 },
            5: { value: '', isFrozen: false, index: 5 },
            6: { value: '', isFrozen: false, index: 6 },
            7: { value: '', isFrozen: false, index: 7 },
            8: { value: '', isFrozen: false, index: 8 },
            9: { value: '', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(7)
    });

    test('diagonal case', () => {
      const initData = {
        data: {
          cpuPlayer: 'X',
          humanPlayer: 'O',
          cells: {
            1: { value: 'X', isFrozen: false, index: 1 },
            2: { value: 'O', isFrozen: false, index: 2 },
            3: { value: '', isFrozen: false, index: 3 },
            4: { value: 'O', isFrozen: false, index: 4 },
            5: { value: '', isFrozen: false, index: 5 },
            6: { value: '', isFrozen: false, index: 6 },
            7: { value: '', isFrozen: false, index: 7 },
            8: { value: '', isFrozen: false, index: 8 },
            9: { value: 'X', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(5)
    });
  })

  describe('do not let the opponent to win cases', () => {
    test('row case', () => {
      const initData = {
        data: {
          cpuPlayer: 'X',
          humanPlayer: 'O',
          cells: {
            1: { value: 'X', isFrozen: false, index: 1 },
            2: { value: '', isFrozen: false, index: 2 },
            3: { value: '', isFrozen: false, index: 3 },
            4: { value: '', isFrozen: false, index: 4 },
            5: { value: 'X', isFrozen: false, index: 5 },
            6: { value: '', isFrozen: false, index: 6 },
            7: { value: '', isFrozen: false, index: 7 },
            8: { value: 'O', isFrozen: false, index: 8 },
            9: { value: 'O', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(7)
    });

    test('column case', () => {
      const initData = {
        data: {
          activePlayer: 'X',
          humanPlayer: 'O',
          cells: {
            1: { value: '', isFrozen: false, index: 1 },
            2: { value: 'O', isFrozen: false, index: 2 },
            3: { value: '', isFrozen: false, index: 3 },
            4: { value: '', isFrozen: false, index: 4 },
            5: { value: 'O', isFrozen: false, index: 5 },
            6: { value: 'X', isFrozen: false, index: 6 },
            7: { value: 'X', isFrozen: false, index: 7 },
            8: { value: '', isFrozen: false, index: 8 },
            9: { value: '', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(8)
    });

    test('diagonal case', () => {
      const initData = {
        data: {
          activePlayer: '',
          humanPlayer: 'O',
          cells: {
            1: { value: 'O', isFrozen: false, index: 1 },
            2: { value: '', isFrozen: false, index: 2 },
            3: { value: '', isFrozen: false, index: 3 },
            4: { value: 'X', isFrozen: false, index: 4 },
            5: { value: 'O', isFrozen: false, index: 5 },
            6: { value: '', isFrozen: false, index: 6 },
            7: { value: 'X', isFrozen: false, index: 7 },
            8: { value: '', isFrozen: false, index: 8 },
            9: { value: '', isFrozen: false, index: 9 }
          },
        }
      }

      const Constructor = Vue.extend(Grid)
      const vm = new Constructor(initData).$mount()
      expect(vm.getAvailvableCellIndex(initData.data.cells, initData.data.cpuPlayer, initData.data.humanPlayer)).toEqual(9)
    });
  })
});
