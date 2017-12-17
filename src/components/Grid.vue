<template>
  <div>
    <div v-if="activePlayer" class="gamePanel" :class="gameStatusColor">
      {{ gameStatusMessage }}
    </div>
    <div v-if="!activePlayer" class="gamePanel" >
      Choose:
      <span @click="selectPlayer('X')" class="selectPlayer__player animated wiggle">X</span>
      or
      <span @click="selectPlayer('O')" class="selectPlayer__player animated shake">O</span>
    </div>
    <table class="grid">
      <tr>
        <cell name="1" :value="cells['1']['value']" :isFrozen="cells['1']['isFrozen']"></cell>
        <cell name="2" :value="cells['2']['value']" :isFrozen="cells['2']['isFrozen']"></cell>
        <cell name="3" :value="cells['3']['value']" :isFrozen="cells['3']['isFrozen']"></cell>
      </tr>
      <tr>
        <cell name="4" :value="cells['4']['value']" :isFrozen="cells['4']['isFrozen']"></cell>
        <cell name="5" :value="cells['5']['value']" :isFrozen="cells['5']['isFrozen']"></cell>
        <cell name="6" :value="cells['6']['value']" :isFrozen="cells['6']['isFrozen']"></cell>
      </tr>
      <tr>
        <cell name="7" :value="cells['7']['value']" :isFrozen="cells['7']['isFrozen']"></cell>
        <cell name="8" :value="cells['8']['value']" :isFrozen="cells['8']['isFrozen']"></cell>
        <cell name="9" :value="cells['9']['value']" :isFrozen="cells['9']['isFrozen']"></cell>
      </tr>
    </table>
  </div>
</template>

<script>
  import Cell from './Cell.vue'

  export default {
    components: { Cell },

    data () {
      return {
        activePlayer: '',
        gameStatus: 'turn',
        gameStatusColor: 'statusTurn',
        moves: 0,
        cells: {
          1: { value: '', isFrozen: false, index: 1 },
          2: { value: '', isFrozen: false, index: 2 },
          3: { value: '', isFrozen: false, index: 3 },
          4: { value: '', isFrozen: false, index: 4 },
          5: { value: '', isFrozen: false, index: 5 },
          6: { value: '', isFrozen: false, index: 6 },
          7: { value: '', isFrozen: false, index: 7 },
          8: { value: '', isFrozen: false, index: 8 },
          9: { value: '', isFrozen: false, index: 9 }
        },
        winConditions: [
          [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
          [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
          [1, 5, 9], [3, 5, 7]             // diagonals
        ]
      }
    },

    created () {
      Event.$on('strike', cellNumber => {
        this.cells[cellNumber]['value'] = this.activePlayer
        this.freezeCell(this.cells[cellNumber])
        this.moves = this.moves + 1
        this.gameStatus = this.changeGameStatus()
        this.changePlayer()
      })

      Event.$on('gridReset', () => {
        Object.assign(this.$data, this.$options.data(), {activePlayer: this.$data.activePlayer})
        this.cpuTurn()
      })
    },

    computed: {
      nonActivePlayer () {
        return this.getOppositePlayer(this.activePlayer)
      },

      gameStatusMessage () {
        switch (this.gameStatus) {
          case 'win':
            return `${this.nonActivePlayer} Won !`
          case 'draw':
            return 'Draw !'
          default:
            return `${this.activePlayer}'s turn`
        }
      }
    },

    watch: {
      gameStatus () {
        switch (this.gameStatus) {
          case 'win':
            this.gameStatusColor = 'statusWin'
            break
          case 'draw':
            this.gameStatusColor = 'statusDraw'
            break
        }
      }
    },

    methods: {
      freezeCell (cell) {
        cell.isFrozen = true
      },

      getOppositePlayer (player) {
        return player === 'O' ? 'X' : 'O'
      },

      changePlayer () {
        this.activePlayer = this.nonActivePlayer
        this.cpuTurn()
      },

      getAvailvableCellIndex (cells, cpuPlayer, humanPlayer) {
        const cellsArr = Object.values(cells)
        const winCondMap = this.winConditions.map(winArr => winArr.map(val => cells[val]))
        const arrWithout = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]

        // filters
        const filterWinning = (current, rest) => current.value === '' && rest.every(el => el.value === cpuPlayer)
        const filterNotLoosing = (current, rest) => current.value === '' && rest.every(el => el.value === humanPlayer)

        const getFilteredIndexes = (filter) => {
          const resultArr = winCondMap.map(winCondArr => winCondArr.filter((el, i, arr) => filter(el, arrWithout(arr, i))))
          const cleanResultArr = Array.concat(...resultArr).map(el => el.index)
          return cleanResultArr
        }

        // check if the cpu can win
        const winningIndexes = getFilteredIndexes(filterWinning)
        if (winningIndexes.length >= 1) {
          return winningIndexes[0]
        }

        // don't let the player to win
        const notLoosingIndexes = getFilteredIndexes(filterNotLoosing)
        if (notLoosingIndexes.length >= 1) {
          return notLoosingIndexes[0]
        }

        // just a random cell
        const availableCells = cellsArr.filter((cell) => !cell.value).map(cell => cell.index)
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)]
        return randomIndex
      },

      cpuTurn () {
        // TODO: Improve cpu and add delay
        if (this.activePlayer === this.cpuPlayer && this.gameStatus === 'turn') {
          const index = this.getAvailvableCellIndex(this.cells, this.cpuPlayer, this.getOppositePlayer(this.cpuPlayer))
          Event.$emit('strike', index)
        }
      },

      selectPlayer (player) {
        this.activePlayer = player
        this.cpuPlayer = this.getOppositePlayer(player)
      },

      changeGameStatus () {
        if (this.checkForWin()) {
          return this.gameIsWon()
        } else if (this.moves === 9) {
          return 'draw'
        }
        return 'turn'
      },

      checkForWin () {
        for (let i = 0; i < this.winConditions.length; i++) {
          // gets a single condition wc from the whole array
          let wc = this.winConditions[i]
          let cells = this.cells
          // compares 3 cell values based on the cells in the condition
          if (this.areEqual(cells[wc[0]], cells[wc[1]], cells[wc[2]])) {
            return true
          }
        }
        return false
      },

      areEqual () {
        let len = arguments.length

        // loops through each value and compares them with an empty sting and
        // for inequality
        for (let i = 1; i < len; i++) {
          if (arguments[i]['value'] === '' || arguments[i]['value'] !== arguments[i - 1]['value']) {
            return false
          }
        }
        return true
      },

      freezeAllCells () {
        Object.keys(this.cells).forEach(key => this.freezeCell(this.cells[key]))
      },

      gameIsWon () {
        // fires win event for the App component to change the score
        Event.$emit('win', this.activePlayer)
        // fires an event for the Cell to freeze
        this.freezeAllCells()
        // Event.$emit('freeze')
        // sets the status to win
        return 'win'
      }
    }
  }
</script>

<style>
.grid {
  background-color: #34495e;
  color: #fff;
  width: 100%;
  border-collapse: collapse;
}

.selectPlayer__player {
  display: inline-block;
  margin: 0 10px 0 10px;
}

.selectPlayer__player:hover {
  cursor: pointer;
}

.gamePanel {
  margin: 0px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f1c40f;
  color: #fff;
  font-size: 1.4em;
  font-weight: bold;
}

.statusTurn {
  background-color: #f1c40f;
}

.statusWin {
  background-color: #2ecc71;
}

.statusDraw {
  background-color: #9b59b6;
}

.animated {
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
    animation-iteration-count:infinite;
}

@keyframes wiggle {
    0% { transform: skewX(9deg); }
    10% { transform: skewX(-8deg); }
    20% { transform: skewX(7deg); }
    30% { transform: skewX(-6deg); }
    40% { transform: skewX(5deg); }
    50% { transform: skewX(-4deg); }
    60% { transform: skewX(3deg); }
    70% { transform: skewX(-2deg); }
    80% { transform: skewX(1deg); }
    90% { transform: skewX(0deg); }
    100% { transform: skewX(0deg); }
}
.wiggle {
    animation-name: wiggle;
    animation-timing-function: ease-in;
}
.animated.wiggle {
    animation-duration: 0.75s;
}

@keyframes shake {
    0%, 100% {transform: translateX(0);}
    10%, 30%, 50%, 70%, 90% {transform: translateX(-1px);}
    20%, 40%, 60%, 80% {transform: translateX(1px);}
}
.shake {
    animation-name: shake;
}
</style>
