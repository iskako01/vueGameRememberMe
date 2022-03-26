import {
  DEFAULT_DIFFICULT,
  FIELD,
  GAME_SPEED,
  GAME_STATUS,
} from "../../constants";
import { nextTick, Ref } from "vue";
import Ifields from "../../types/fields";

export default function useGameProcess(
  fields: Ref<Ifields[]>,
  gameStatus: Ref<number>,
  difficult: Ref<number>,
  start: () => void
) {
  const selectCell = (id: number) => {
    if (fields.value[id].clicked === false) {
      fields.value[id].clicked = true;

      checkGame();
    }
  };

  const checkGame = () => {
    const errorIndex = fields.value.findIndex((field) => {
      return field.clicked && field.value === FIELD.EMPTY;
    });

    if (errorIndex > -1) {
      setGameOver();
      return;
    }

    const notFoundItemIndex = fields.value.findIndex((field) => {
      return !field.clicked && field.value === FIELD.FILLED;
    });

    if (notFoundItemIndex === -1) {
      setWin();
    }
  };

  const setGameOver = () => {
    gameStatus.value = GAME_STATUS.FAIL;
    if (difficult.value === 1) {
      difficult.value = DEFAULT_DIFFICULT;
      return;
    }
    difficult.value--;
  };
  const setWin = () => {
    gameStatus.value = GAME_STATUS.WIN;
    setTimeout(async () => {
      difficult.value++;
      //   speedGame.value += 100;
      await nextTick();

      start();
    }, GAME_SPEED);
  };

  return { selectCell };
}
