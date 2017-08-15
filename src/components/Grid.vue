<template>
  <div>
    <div class="gameStatus" :class="gameStatusColor">
      {{ gameStatusMessage }}
    </div>
    <table class="grid">
      <tr>
        <cell name="1"></cell>
        <cell name="2"></cell>
        <cell name="3"></cell>
      </tr>
      <tr>
        <cell name="4"></cell>
        <cell name="5"></cell>
        <cell name="6"></cell>
      </tr>
      <tr>
        <cell name="7"></cell>
        <cell name="8"></cell>
        <cell name="9"></cell>
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
        activePlayer: 'O',
        gameStatus: 'turn',
        gameStatusColor: 'statusTurn',
        moves: 0,
        cells: {
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: ''
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
        this.cells[cellNumber] = this.activePlayer
        this.moves = this.moves + 1
        this.gameStatus = this.changeGameStatus()
        this.changePlayer()
      })
    },
    computed: {
      nonActivePlayer () {
        return this.activePlayer === 'O' ? 'X' : 'O'
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
      changePlayer () {
        this.activePlayer = this.nonActivePlayer
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
          if (arguments[i] === '' || arguments[i] !== arguments[i - 1]) {
            return false
          }
        }
        return true
      },
      gameIsWon () {
        // fires win event for the App component to change the score
        Event.$emit('win', this.activePlayer)
        // fires an event for the Cell to freeze
        Event.$emit('freeze')
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

.gameStatus {
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
</style>
