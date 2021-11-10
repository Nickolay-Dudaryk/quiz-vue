<script>
import Slider from "@vueform/slider";
import CategorySelect from "./components/CategorySelect.vue";
import DifficultySelect from "./components/DifficultySelect.vue";
import axios from "axios";
import { shuffleArr, disableBtns } from "./helper";

export default {
  components: {
    Slider,
    CategorySelect,
    DifficultySelect,
  },
  data() {
    return {
      selectedCategory: "0",
      questionsAmount: 10,
      currentQuestionIdx: 0,
      isLastQuestion: false,
      selectedDifficulty: "any",
      isPlaying: false,
      sliderOptions: {
        min: 1,
        max: 50,
      },
      questions: [],
      correctAnswers: 0,
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
      this.correctAnswers = 0;
      this.isPlaying = false;
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    selectDifficulty(difficulty) {
      this.selectedDifficulty = difficulty;
    },
    handleUserChoice(event, userAnswer, correctAnswer, questionIdx) {
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
        const url = `https://opentdb.com/api.php?amount=${amount}${category}${difficulty}`;
        const response = await axios.get(url);

        const data = response.data.results;
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
        console.error(
          `Something goes wrong with fetching data from API: ${error.message}`
        );
      }
    },
  },
  computed: {
    isDisabled: function() {
      if (this.questionsAmount - 1 == this.currentQuestionIdx) {
        return !this.isLastQuestion
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="content-wrapper" v-if="!isPlaying">
      <CategorySelect
        :selectedCategory="selectedCategory"
        @selectCategory="selectCategory"
      />
    </div>

    <div class="content-wrapper" v-if="!isPlaying">
      <Slider
        v-model="questionsAmount"
        v-bind="this.sliderOptions"
        class="range-select"
      />
      <span>Number of questions</span>
    </div>

    <div class="content-wrapper" v-if="!isPlaying">
      <DifficultySelect
        :selectedDifficulty="selectedDifficulty"
        @selectDifficulty="selectDifficulty"
      />
    </div>

    <button type="button" @click="startGame" v-if="!isPlaying">
      Start game
    </button>

    <div v-else>
      <p>Score: {{ this.correctAnswers }} of {{ this.questionsAmount }}</p>
      <ul>
        <li
          v-for="(item, index) in this.questions"
          :key="item"
          v-show="this.currentQuestionIdx === index"
        >
          <p>{{ item.question }}</p>
          <button
            type="button"
            v-for="el in item.answers"
            :key="el"
            @click="handleUserChoice($event, el, item.correct_answer, index)"
            class="user-select-btn"
          >
            {{ el }}
          </button>
        </li>
      </ul>
      <button
        type="button"
        @click="nextQuestion"
        :disabled="isDisabled"
      >
        Next question
      </button>
      <button type="button" @click="stopGame">Stop game</button>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.range-select {
  margin-top: 40px;
  width: 50%;
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
