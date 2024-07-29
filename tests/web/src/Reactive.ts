import { ref, effect } from "z-util-page/Reactive";
import { createView } from "@/utils/view";

const View = createView('Reactive');

View.addTestBtn('ref响应式', () => {
  let sum = 0;
  const count = ref({
    a: 11
  });
  effect(() => {
    sum = count.value.a;
  });

  count.value.a = 15;
  console.log(sum, count);
});
