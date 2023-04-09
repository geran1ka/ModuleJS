'use strict';
(() => {
  const result = {
    _scopePlayer: 5,
    _scopeBot: 5,
    get scopePlayer() {
      return this._scopePlayer;
    },
    set scopePlayer(value) {
      this._scopePlayer += value;
      switch (true) {
        case (this._scopePlayer < 0):
          this._scopePlayer = 0;
          break;
        case (this._scopePlayer >= 10):
          this._scopePlayer = 10;
          break;
        default:
          this._scopePlayer;
          break;
      }
    },
    get scopeBot() {
      return this._scopeBot;
    },
    set scopeBot(value) {
      this._scopeBot += value;
      switch (true) {
        case (this._scopeBot < 0):
          this._scopeBot = 0;
          break;
        case (this._scopeBot >= 10):
          this._scopeBot = 10;
          break;
        default:
          this._scopeBot;
          break;
      }
    },
    set resetScope(value) {
      this._scopeBot = 5;
      this._scopePlayer = 5;
    },
  };
  //

  // функция для хода компьютера
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // переменная определяет чей ход: четное число - загадывает игрок
  // нечетное число - загадывает бот
  // Определение первого хода в игре камень ножницы бумага
  const game = () => {
    // Определение кто перым загадывает чиcло

    const getWhoGoesFirst = () => {
      const gameFigures = ['камень', 'ножницы', 'бумага'];
      // функция запроса ввода данных от игрока
      const getUserResponse = (arr) => {
        let userResponse = prompt(`${arr}: `);
        if (userResponse === null) {
          const stopPlay = confirm(`Вы точно хотите завершить игру?`);
          return !stopPlay ? getUserResponse(arr) : false;
        }
        // Нестрогая проверка
        userResponse = userResponse.trim().toLocaleLowerCase();
        const [found, isNotUniqe] = arr.filter(item =>
          item.slice(0, userResponse.length) === userResponse);

        return found && !isNotUniqe ? arr.indexOf(found) : getUserResponse(arr);
      };
        // Выбор компьютера
      const comp = getRandomIntInclusive(0, 2);
      // Выбор игрока
      const user = getUserResponse(gameFigures);
      // функция вывода результата
      const logWin = (str) => {
        alert(`
          ${str}
          -------------------------------------------------------------------
          Бот: ${gameFigures[comp]}
          Игрок: ${gameFigures[user]}
        `);
      };

      // Определение победителя.
      switch (true) {
        case (!user && user !== 0): // Проверка на завершение игры
          return false;
        case (user === comp):
          logWin('Ничья');
          return getWhoGoesFirst();
        case (comp === (user + 1) % 3):
          logWin('Победитель: игрок');
          return 0;
        default:
          logWin('Победитель: бот');
          return 1;
      }
    };
    // ===============================================================
    // Определение переменной для очередности хода игрока и бота
    let goesFirst = 0;
    // Игра Mарблы 10 шариков
    return function marbleStart() {
      // вывод стартовой информации

      if (goesFirst === 0) {
        alert(`
          МАРБЛЫ: 10 стеклянных шариков.
          -------------------------------------------------------------------
          Старт игры
          -------------------------------------------------------------------
          Игрок: ${result.scopePlayer}
          Бот: ${result.scopeBot}
          `);
        alert(`
          -------------------------------------------------------------------
          В начале игры для определения первого хода бот 
          и игрок играют в «Камень, ножницы, бумага», 
          тот кто выиграл, тот первый загадывает число.
          -------------------------------------------------------------------
        `);
        goesFirst = getWhoGoesFirst();
      }
      // функция вывода количества шариков
      const alertWinner = (str) => alert(`
        ${str}
        ---------------------------------------------------------------------
        Игрок: ${result.scopePlayer}
        Бот: ${result.scopeBot}
      `);
      // функция запроса данных от игрока
      const userResponse = (max) => {
        const user = prompt(`Введите число от 1 до ${max}: `);
        if (user === null) {
          return confirm(`Вы точно хотите завершить игру?`) ?
          false : userResponse(max);
        }
        if (Number.isNaN(user) || !(user <= max && user >= 1)) {
          return userResponse(max);
        }
        return user;
      };
      // Проверка на завершение игры
      if (!goesFirst && goesFirst !== 0) {
        return alertWinner('Игра завершена пользователем!');
      }
      if (goesFirst % 2 === 0) {
        // Игрок загадывает количество шариков.
        const user = userResponse(result.scopePlayer);
        // Бот отгадывает четное или не четное количество шариков;
        const computer = getRandomIntInclusive(0, 1);
        // Определение победителя
        switch (true) {
          case (user === false):
            return alertWinner('Игра завершена пользователем!');
          case (user % 2 === computer):
            result.scopePlayer = -user;
            result.scopeBot = +user;
            alertWinner('Бот угадал');
            break;
          default:
            result.scopePlayer = +user;
            result.scopeBot = -user;
            alertWinner('Бот не угадал');
            break;
        }
      } else {
        // Бот загадывает количество шариков.
        const computerOne = getRandomIntInclusive(1, result.scopeBot);
        console.log('computer: ', computerOne);
        // Игрок отгадывает четное или не четное количество шариков;
        const user = confirm(`Число четное?: `) ? 0 : 1;
        console.log('userOdd: ', user);

        switch (true) {
          case (computerOne % 2 === user):
            result.scopePlayer = +computerOne;
            result.scopeBot = -computerOne;
            alertWinner('Вы угадали');
            break;
          default:
            result.scopePlayer = -computerOne;
            result.scopeBot = +computerOne;
            alertWinner('Вы не угадали');
            break;
        }
      }
      // Изменение переменной для очередности шага
      goesFirst++;
      // Определение проигравшего
      switch (true) {
        case (result.scopePlayer <= 0):
          alert('К сожалению, у Вас закончились шарики!');
          break;
        case (result.scopeBot <= 0):
          alert('У бота закончились шарики!');
          break;
        default:
          return marbleStart();
      }
      // Перезапуск игры
      if (confirm(`Хотите сыграть еще?`)) {
        result.resetScope = 5;
        goesFirst = 0;
        return marbleStart();
      }
    };
  };
  window.RPS = game;
})();
