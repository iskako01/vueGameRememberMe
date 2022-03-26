<template>
  <div class="board-container">
    <div class="board">
      <board-item
        v-for="field in fields"
        :key="field.id"
        :field="field"
        :gameStatus="gameStatus"
        @select-cell="selectCell"
      />
    </div>

    <p class="difficult">
      Level <strong>{{ difficult }}</strong>
    </p>
    <button class="btn" @click="start" :disabled="!disableButton">Start</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { GAME_STATUS } from "../constants";
import BoardItem from "./BoardItem.vue";
import useGameProcess from "./use/gameProcess";
import useGameInit from "./use/gameInit";
import useGameStart from "./use/useGameStart";

export default defineComponent({
  components: { BoardItem },
  setup() {
    const countCell = 25 ;
    const gameStatus = ref(GAME_STATUS.NONE);

    const { init, difficult, fields } = useGameInit(countCell);
    const { start } = useGameStart(
      init,
      fields,
      difficult,
      countCell,
      gameStatus
    );
    const { selectCell } = useGameProcess(fields, gameStatus, difficult, start);

    const disableButton = computed(() => {
      return (
        gameStatus.value !== GAME_STATUS.PREVIEW &&
        gameStatus.value !== GAME_STATUS.WIN
      );
    });
    return {
      difficult,
      fields,
      init,
      start,
      gameStatus,
      disableButton,
      selectCell,
    };
  },
});
</script>

<style scoped>
.board {
  margin: 0 auto;
  width: 300px;
  height: 100%;
  background-color: #d3e2f1;
}
.btn {
  width: 150px;
  height: 40px;
  border-radius: 30px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background-color: #319352;
}
.btn:hover {
  background-color: #a8f0c0;
  transition: all 0.5s ease;
}
</style>
