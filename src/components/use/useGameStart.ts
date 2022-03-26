import { FIELD, GAME_STATUS, GAME_SPEED } from "../../constants";
import { Ref } from "vue";
import Ifields from "../../types/fields";

export default function useGameStart(
  init: () => void,
  fields: Ref<Ifields[]>,
  difficult: Ref<number>,
  countCell: number,
  gameStatus: Ref<number>
) {
  const start = () => {
    init();
    prepareGame();
  };

  const prepareGame = () => {
    gameStatus.value = GAME_STATUS.PREVIEW;
    for (let i = 0; i < difficult.value; i++) {
      const index = rand(0, countCell - 1);

      if (fields.value[index].value !== FIELD.FILLED) {
        fields.value[index].value = FIELD.FILLED;
      } else {
        i--;
      }
    }
    setTimeout(() => {
      gameStatus.value = GAME_STATUS.STARTED;
    }, GAME_SPEED);
  };

  const rand = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return { start };
}
