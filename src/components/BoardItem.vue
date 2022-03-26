<template>
  <span :class="classActive" @click="selectCell(field.id)"></span>
</template>

<script lang="ts">
import { GAME_STATUS, FIELD } from "../constants";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    field: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: Number as PropType<number>,
      required: false,
      dafault: GAME_STATUS.NONE,
    },
  },
  emits: ["select-cell"],
  setup(props, { emit }) {
    const classActive = computed(() => {
      let itemClass = "item ";
      if (
        (props.field.value === FIELD.FILLED &&
          props.gameStatus === GAME_STATUS.PREVIEW) ||
        props.field.clicked
      ) {
        itemClass += "active ";
      }

      if (props.field.value === FIELD.EMPTY && props.field.clicked) {
        itemClass = "item ";
        itemClass += "error ";
      }
      return itemClass;
    });
    const selectCell = (id: number) => {
      if (props.gameStatus === GAME_STATUS.STARTED) {
        emit("select-cell", id);
      }
    };

    return { classActive, selectCell };
  },
});
</script>

<style scoped>
.item {
  width: 50px;
  height: 50px;
  background-color: #8aa3bb;
  margin: 5px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition: 0.4s;
  transform-style: preserve-3d;
}

.item.active {
  background-color: #58e487;
  transform: rotateX(180deg);
}
.item.error {
  background-color: #e69b77;
  transform: rotateX(180deg);
}
</style>
