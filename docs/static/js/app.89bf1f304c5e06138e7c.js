webpackJsonp([1],{30:function(e,t,n){function a(e){n(77)}var s=n(19)(n(33),n(82),a,null,null);e.exports=s.exports},32:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(31),s=n(30),r=n.n(s);a.a.config.productionTip=!1,window.Event=new a.a,new a.a({el:"#app",template:"<App/>",components:{App:r.a}})},33:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(81),s=n.n(a);t.default={components:{Grid:s.a},name:"app",data:function(){return{matches:0,wins:{O:0,X:0}}},created:function(){var e=this;Event.$on("win",function(t){return e.wins[t]++})},methods:{restart:function(){Event.$emit("gridReset"),this.matches++}}}},34:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["name","value","isFrozen"],methods:{strike:function(){!this.isFrozen&&this.$parent.activePlayer&&Event.$emit("strike",this.name)}}}},35:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(39),s=n.n(a),r=n(36),i=n.n(r),l=n(41),c=n.n(l),u=n(40),o=n.n(u),v=n(38),f=n.n(v),h=n(80),d=n.n(h);t.default={components:{Cell:d.a},data:function(){return{activePlayer:"",gameStatus:"turn",gameStatusColor:"statusTurn",moves:0,cells:{1:{value:"",isFrozen:!1,index:1},2:{value:"",isFrozen:!1,index:2},3:{value:"",isFrozen:!1,index:3},4:{value:"",isFrozen:!1,index:4},5:{value:"",isFrozen:!1,index:5},6:{value:"",isFrozen:!1,index:6},7:{value:"",isFrozen:!1,index:7},8:{value:"",isFrozen:!1,index:8},9:{value:"",isFrozen:!1,index:9}},winConditions:[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]}},created:function(){var e=this;Event.$on("strike",function(t){e.cells[t].value=e.activePlayer,e.freezeCell(e.cells[t]),e.moves=e.moves+1,e.gameStatus=e.changeGameStatus(),e.changePlayer()}),Event.$on("gridReset",function(){f()(e.$data,e.$options.data(),{activePlayer:e.$data.activePlayer}),e.cpuTurn()})},computed:{nonActivePlayer:function(){return this.getOppositePlayer(this.activePlayer)},gameStatusMessage:function(){switch(this.gameStatus){case"win":return this.nonActivePlayer+" Won !";case"draw":return"Draw !";default:return this.activePlayer+"'s turn"}}},watch:{gameStatus:function(){switch(this.gameStatus){case"win":this.gameStatusColor="statusWin";break;case"draw":this.gameStatusColor="statusDraw"}}},methods:{freezeCell:function(e){e.isFrozen=!0},unFreezeCell:function(e){e.isFrozen=!1},getOppositePlayer:function(e){return"O"===e?"X":"O"},changePlayer:function(){this.activePlayer=this.nonActivePlayer,this.cpuTurn()},getAvailvableCellIndex:function(e,t,n){var a=o()(e),s=this.winConditions.map(function(t){return t.map(function(t){return e[t]})}),r=function(e,t){return[].concat(c()(e.slice(0,t)),c()(e.slice(t+1,e.length)))},l=function(e,n){return""===e.value&&n.every(function(e){return e.value===t})},u=function(e,t){return""===e.value&&t.every(function(e){return e.value===n})},v=function(e){var t=s.map(function(t){return t.filter(function(t,n,a){return e(t,r(a,n))})});return i.a.apply(Array,c()(t)).map(function(e){return e.index})},f=v(l);if(f.length>=1)return f[0];var h=v(u);if(h.length>=1)return h[0];var d=a.filter(function(e){return!e.value}).map(function(e){return e.index});return d[Math.floor(Math.random()*d.length)]},cpuTurn:function(){var e=this;if(this.activePlayer===this.cpuPlayer&&"turn"===this.gameStatus){this.freezeAllCells();var t=this.getAvailvableCellIndex(this.cells,this.cpuPlayer,this.getOppositePlayer(this.cpuPlayer));setTimeout(function(){Event.$emit("strike",t),e.unFreezeAvailvableCells()},1e3)}},selectPlayer:function(e){this.activePlayer=e,this.cpuPlayer=this.getOppositePlayer(e)},changeGameStatus:function(){return this.checkForWin()?this.gameIsWon():9===this.moves?"draw":"turn"},checkForWin:function(){for(var e=0;e<this.winConditions.length;e++){var t=this.winConditions[e],n=this.cells;if(this.areEqual(n[t[0]],n[t[1]],n[t[2]]))return!0}return!1},areEqual:function(){for(var e=arguments.length,t=1;t<e;t++)if(""===arguments[t].value||arguments[t].value!==arguments[t-1].value)return!1;return!0},freezeAllCells:function(){var e=this;s()(this.cells).forEach(function(t){return e.freezeCell(e.cells[t])})},unFreezeAvailvableCells:function(){var e=this;s()(this.cells).forEach(function(t){""===e.cells[t].value&&e.unFreezeCell(e.cells[t])})},gameIsWon:function(){return Event.$emit("win",this.activePlayer),this.freezeAllCells(),"win"}}}},77:function(e,t){},78:function(e,t){},79:function(e,t){},80:function(e,t,n){function a(e){n(79)}var s=n(19)(n(34),n(84),a,null,null);e.exports=s.exports},81:function(e,t,n){function a(e){n(78)}var s=n(19)(n(35),n(83),a,null,null);e.exports=s.exports},82:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"scoreBoard"},[n("span",[e._v("O has "+e._s(e.wins.O)+" wins")]),e._v(" "),n("h2",[e._v("Score Board")]),e._v(" "),n("span",[e._v("X has "+e._s(e.wins.X)+" wins")])]),e._v(" "),n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"details"}},[n("h1",[e._v("Tic Tac Toe")]),e._v(" "),n("h2",[e._v("Match #"+e._s(e.matches+1))])]),e._v(" "),n("grid"),e._v(" "),n("button",{staticClass:"restart",on:{click:e.restart}},[e._v("Restart")])],1)])},staticRenderFns:[]}},83:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.activePlayer?n("div",{staticClass:"gamePanel",class:e.gameStatusColor},[e._v("\n    "+e._s(e.gameStatusMessage)+"\n  ")]):e._e(),e._v(" "),e.activePlayer?e._e():n("div",{staticClass:"gamePanel"},[e._v("\n    Choose:\n    "),n("span",{staticClass:"selectPlayer__player animated wiggle",on:{click:function(t){e.selectPlayer("X")}}},[e._v("X")]),e._v("\n    or\n    "),n("span",{staticClass:"selectPlayer__player animated shake",on:{click:function(t){e.selectPlayer("O")}}},[e._v("O")])]),e._v(" "),n("table",{staticClass:"grid"},[n("tr",[n("cell",{attrs:{name:"1",value:e.cells[1].value,isFrozen:e.cells[1].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"2",value:e.cells[2].value,isFrozen:e.cells[2].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"3",value:e.cells[3].value,isFrozen:e.cells[3].isFrozen}})],1),e._v(" "),n("tr",[n("cell",{attrs:{name:"4",value:e.cells[4].value,isFrozen:e.cells[4].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"5",value:e.cells[5].value,isFrozen:e.cells[5].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"6",value:e.cells[6].value,isFrozen:e.cells[6].isFrozen}})],1),e._v(" "),n("tr",[n("cell",{attrs:{name:"7",value:e.cells[7].value,isFrozen:e.cells[7].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"8",value:e.cells[8].value,isFrozen:e.cells[8].isFrozen}}),e._v(" "),n("cell",{attrs:{name:"9",value:e.cells[9].value,isFrozen:e.cells[9].isFrozen}})],1)])])},staticRenderFns:[]}},84:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("td",{staticClass:"cell",on:{click:e.strike}},[e._v(e._s(e.value))])},staticRenderFns:[]}}},[32]);
//# sourceMappingURL=app.89bf1f304c5e06138e7c.js.map