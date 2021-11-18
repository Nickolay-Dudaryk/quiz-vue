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
        class="btn btn_answer"
      >
        {{ el }}
      </button>
    </li>
  </ul>
</template>

<script>
import Question from "../atoms/Question.vue";
import { disableBtns } from "../../helper";
import { mapMutations } from "vuex";

export default {
  components: {
    Question,
  },
  methods: {
    ...mapMutations(["setCorrectAnswers", "setAmountOfAnswers"]),

    handleUserChoice( event, userAnswer, correctAnswer) {
      const listItem = event.target.closest("li");
      const btns = listItem.querySelectorAll(".btn");

      if (userAnswer === correctAnswer) {
        event.target.classList.add("btn_correct");
        this.setCorrectAnswers(1);
      } else {
        event.target.classList.add("btn_incorrect");

        btns.forEach((el) => {
          if (el.textContent === correctAnswer) {
            el.classList.add("btn_correct");
          }
        });
      }

      this.setAmountOfAnswers(1);
      disableBtns(btns);
    }
  },
};
</script>
<style lang="scss">
.list-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  .btn {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
