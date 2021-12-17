document.addEventListener('DOMContentLoaded', () => {
  'use script'
  let events = [];
  let winner, alert, interface, rows, finish, restart, champion;

  let comp = 'o'
  let user = 'x'

  onload = function () {
    interface = document.getElementById('interface')
    rows = interface.getElementsByClassName('item')
    finish = document.getElementById('finish')
    alert = finish.getElementsByClassName('alert')[0]
    restart = finish.getElementsByClassName('restart')[0]
    champion = interface.getElementsByClassName('finished')[0]

    restart.onclick = function () {
      champion.style.display = 'none'
      finish.style.display = 'none'
      clearTable()
      randomMove()
    }

    for (let i = 0; i < rows.length; i++) {
      rows[i].onclick = function () {
        drawSym(this)
      }
    }
    randomMove()
  }

  function randomMove() {
    let rnd = getRandomInt(2)
    if (rnd == 1) {
      autoDrawing()
    }
    return true
  }

  function drawSym(item, sym = user) {
    // console.log(item);
    if (item.hasChildNodes()) return false
    item.innerHTML = sym

    let winner = checkWinner()

    if (sym == user && !winner) autoDrawing()

    if (winner == user) {
      alert.innerHTML = 'Сіз жеңдіңіз!'
      alert.style.color = '#77D970'
      champion.style.backgroundColor = 'rgba(0,200,0, 0.5)'
    } else if (winner == comp) {
      alert.innerHTML = 'Компьютерді ұтып алды! Тағы да байқап көріңіз!'
      alert.style.color = '#FF0000'
      champion.style.backgroundColor = 'rgba(200,0,0, 0.5)'
    }
    if (winner) {
      champion.style.display = 'block'
      finish.style.display = 'flex'
    }
    return true
  }

  function checkWinner() {
    let winner = ''
    let j = 0

    let xy_1_1 = rows[0].innerHTML
    let xy_1_2 = rows[4].innerHTML
    let xy_1_3 = rows[8].innerHTML

    let xy_2_1 = rows[2].innerHTML
    let xy_2_2 = rows[4].innerHTML
    let xy_2_3 = rows[6].innerHTML

    if ((xy_1_1 && xy_1_2 && xy_1_3) || (xy_2_1 && xy_2_2 && xy_2_3)) {
      if (xy_1_1 == user && xy_1_2 == user && xy_1_3 == user) {
        winner = user
      } else if (
        xy_1_1 == comp &&
        xy_1_2 == comp &&
        xy_1_3 == comp
      ) {
        winner = comp
      }

      if (xy_2_1 == user && xy_2_2 == user && xy_2_3 == user) {
        winner = user
      } else if (
        xy_2_1 == comp &&
        xy_2_2 == comp &&
        xy_2_3 == comp
      ) {
        winner = comp
      }
    }

    if (!winner) {
      for (let i = 0; i < 3; i++) {
        // alert(i);

        let a1 = rows[i].innerHTML
        let a2 = rows[i + 3].innerHTML
        let a3 = rows[i + 6].innerHTML

        let b1 = rows[i].innerHTML
        let b2 = rows[i + 1].innerHTML
        let b3 = rows[i + 2].innerHTML

        // console.log("b1 = '" + (b1) + "' b2 = '" + (b2) + "' b3 = '" + (b3) +"'");

        if (a1 == user && a2 == user && a3 == user) {
          winner = user
          break
        } else if (a1 == comp && a2 == comp && a3 == comp) {
          winner = comp
          break
        }

        if (i != 0) j = 3 * i

        b1 = rows[j].innerHTML
        b2 = rows[j + 1].innerHTML
        b3 = rows[j + 2].innerHTML

        if (b1 == user && b2 == user && b3 == user) {
          winner = user
          break
        } else if (b1 == comp && b2 == comp && b3 == comp) {
          winner = comp
          break
        }
        if (winner) break
      }
    }

    return winner
  }

  function autoDrawing() {
    if (!ckeckFreeSpace()) {
      alert.innerHTML = 'Тең ойын! '
      alert.style.color = '#00C1D4'
      champion.style.display = 'block'
      finish.style.display = 'flex'

      return false
    }
    let el, rnd

    do {
      rnd = getRandomInt(rows.length)
      el = rows[rnd]
      // console.log(rnd);
    } while (!drawSym(el, comp))

    if (!ckeckFreeSpace()) {
      autoDrawing()
    }
  }

  function clearTable() {
    for (let i = 0; i < rows.length; i++) {
      rows[i].innerHTML = ''
    }
  }

  function ckeckFreeSpace() {
    let res = false

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].hasChildNodes()) {
        res = false
      } else {
        res = true
        break
      }
    }

    return res
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function addHandler(el, ev, func) {
    try {
      el.addEventListener(ev, func, false)
    } catch (e) {
      el.attachEvent('on' + ev, func)
    }
  }

  function removerEvent(el, ev, func) {
    try {
      el.removeEventListener(ev, func, false)
    } catch (x) {
      el.detachEvent('on' + ev, func)
    }
  }
})
