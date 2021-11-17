<template>
  <ul class="list">
    <li
      v-for="(item, index) in $store.state.questions"
      :key="item"
      v-show="$store.state.currentQuestionIdx === index"
      class="list-item"
    >
      <Question :question="item.question" />
      <button
        type="button"
        v-for="el in item.answers"
        :key="el"
        @click="handleUserChoice($event, el, item.correct_answer)"
        class="user-select-btn"
      >{{ el }}</button>
    </li>
  </ul>
</template>

<script>
import Question from "../atoms/Question.vue";

export default {
  components: {
    Question,
  },
};
</script>