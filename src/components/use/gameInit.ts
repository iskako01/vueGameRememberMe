import { onBeforeMount, ref, watch } from "vue";
import { FIELD, DEFAULT_DIFFICULT, MAX_DIFFICULT } from "../../constants";
import Ifields from "../../types/fields";

export default function useGameInit(countCell: number) {
  const fields = ref<Ifields[]>([]);
  const difficult = ref(DEFAULT_DIFFICULT);

  const init = () => {
    fields.value = [];
    for (let i = 0; i < countCell; i++) {
      fields.value.push({
        id: i,
        clicked: false,
        value: FIELD.EMPTY,
      });
    }
  };

  watch(difficult, () => {
    if (difficult.value > MAX_DIFFICULT) {
      difficult.value = MAX_DIFFICULT;
    }
  });

  onBeforeMount(init);

  return { init, difficult, fields };
}
