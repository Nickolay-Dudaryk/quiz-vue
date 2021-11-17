<script>
import Settings from "./components/organisms/Settings.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Game from "./components/organisms/Game.vue";
import FetchError from "./components/molecules/FetchError.vue";
import { shuffleArr, disableBtns } from "./helper";

export default {
  components: {
    Settings,
    PulseLoader,
    Game,
    FetchError,
  },
  methods: {
    handleUserChoice(event, userAnswer, correctAnswer) {
      const listItem = event.target.closest("li");
      const btns = listItem.querySelectorAll(".user-select-btn");

      if (userAnswer === correctAnswer) {
        event.target.classList.add("user-select-btn_correct");
        this.correctAnswers = this.correctAnswers + 1;
      } else {
        event.target.classList.add("user-select-btn_incorrect");

        btns.forEach((el) => {
          if (el.textContent === correctAnswer) {
            el.classList.add("user-select-btn_correct");
          }
        });
      }

      disableBtns(btns);
    },
    // nextQuestion() {
    //   if (this.currentQuestionIdx < this.questionsAmount - 1) {
    //     this.currentQuestionIdx = this.currentQuestionIdx + 1;
    //   }
    // },
  },
};
</script>

<template>
  <div class="container">
    <Settings v-if="!$store.state.isPlaying" />

    <PulseLoader v-else-if="$store.state.isPlaying && $store.state.isFetching" />

    <FetchError v-else-if="$store.state.isFetchError" />

    <Game v-else />
  </div>
</template>

<style lang="scss">
@import "./styles/index.scss";
@import "@vueform/slider/themes/default.css";

.container {
  width: 100%;
  height: 100vh;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-select-btn {
  transition: background-color 0.4s;

  &_correct {
    background-color: lightgreen;
  }

  &_incorrect {
    background-color: lightcoral;
  }
}
</style>
