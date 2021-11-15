<script>
// import Slider from "@vueform/slider";
// import CategorySelect from "./components/atoms/CategorySelect.vue";
// import DifficultySelect from "./components/atoms/DifficultySelect.vue";
import Settings from "./components/organisms/Settings.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Score from "./components/atoms/Score.vue";
import Question from "./components/atoms/Question.vue";
import axios from "axios";
import { shuffleArr, disableBtns } from "./helper";

export default {
  components: {
    // Slider,
    // CategorySelect,
    // DifficultySelect,
    Settings,
    PulseLoader,
    Score,
    Question,
  },
  data() {
    return {
    //   selectedCategory: "0",
    //   questionsAmount: 10,
    //   currentQuestionIdx: 0,
    //   isLastQuestion: false,
    //   selectedDifficulty: "any",
    //   isPlaying: false,
    //   isFetching: false,
    //   ifFetchError: false,
    //   sliderOptions: {
    //     min: 1,
    //     max: 50,
    //   },
    //   questions: [],
    //   correctAnswers: 0,
    };
  },
  methods: {
    startGame() {
      const amount = this.questionsAmount;
      const category =
        this.selectedCategory === "0"
          ? ""
          : `&category=${this.selectedCategory}`;
      const difficulty =
        this.selectedDifficulty === "any"
          ? ""
          : `&difficulty=${this.selectedDifficulty}`;

      this.fetchQuestions(amount, category, difficulty);
      this.isPlaying = true;
    },
    stopGame() {
      this.selectedCategory = "0";
      this.questionsAmount = 10;
      this.currentQuestionIdx = 0;
      this.isLastQuestion = false;
      this.selectedDifficulty = "any";
      this.isPlaying = false;
      this.isFetching = false;
      this.isFetchError = false;
      this.questions = [];
      this.correctAnswers = 0;
    },
    // selectCategory(category) {
    //   this.selectedCategory = category;
    // },
    // selectDifficulty(difficulty) {
    //   this.selectedDifficulty = difficulty;
    // },
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
    nextQuestion() {
      if (this.currentQuestionIdx < this.questionsAmount - 1) {
        this.currentQuestionIdx = this.currentQuestionIdx + 1;
      }
    },
    async fetchQuestions(amount, category, difficulty) {
      try {
        this.isFetching = true;
        const url = `https://opentdb.com/api.php?amount=${amount}${category}${difficulty}`;
        const response = await axios.get(url);

        const data = response.data.results;

        if (!data.length) {
          throw new Error();
        }

        const result = [];

        for (let i = 0; i < data.length; i++) {
          result.push({
            question: data[i].question,
            answers: shuffleArr([
              ...data[i].incorrect_answers,
              data[i].correct_answer,
            ]),
            correct_answer: data[i].correct_answer,
          });
        }

        this.questions = result;
      } catch (error) {
        this.isFetchError = true;

        console.error(
          `Something goes wrong with fetching data from API: ${error.message}`
        );
      } finally {
        this.isFetching = false;
      }
    },
  },
  computed: {
    isDisabled: function () {
      if (this.questionsAmount - 1 == this.currentQuestionIdx) {
        return !this.isLastQuestion;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <Settings v-if="!isPlaying" />

    <PulseLoader v-else-if="isPlaying && isFetching" />

    <div v-else-if="isFetchError">
      <p>Sorry, something went wrong. Please, try again.</p>
      <button type="button" @click="stopGame">Main page</button> 
    </div>

    <div v-else>
      <Score
        :correctAnswers="this.correctAnswers"
        :questionsAmount="this.questionsAmount"
      />
      <ul class="list">
        <li
          v-for="(item, index) in this.questions"
          :key="item"
          v-show="this.currentQuestionIdx === index"
          class="list-item"
        >
          <Question :question="item.question" />
          <button
            type="button"
            v-for="el in item.answers"
            :key="el"
            @click="handleUserChoice($event, el, item.correct_answer)"
            class="user-select-btn"
          >
            {{ el }}
          </button>
        </li>
      </ul>
      <button type="button" @click="nextQuestion" :disabled="isDisabled">
        Next question
      </button>
      <button type="button" @click="stopGame">Stop game</button>
    </div>
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

.range-select {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;

  &__slider {
    cursor: pointer;
    margin-bottom: 10px;
  }

  .slider-touch-area {
    cursor: pointer;
  }
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
