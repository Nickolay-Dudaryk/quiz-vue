import { createStore } from "vuex";
import axios from "axios";
import { shuffleArr } from "../helper";

export default createStore({
  state: () => ({
    selectedCategory: "0",
    questionsAmount: 10,
    currentQuestionIdx: 0,
    amountOfAnwsers: 0,
    isLastQuestion: false,
    selectedDifficulty: "any",
    isPlaying: false,
    isFetching: false,
    isFetchError: false,
    sliderOptions: {
      min: 1,
      max: 50,
    },
    questions: [],
    correctAnswers: 0,
  }),
  getters: {
    isDisabled: (state) => {
      if (state.questionsAmount - 1 == state.currentQuestionIdx) {
        return !state.isLastQuestion;
      }
    },
  },
  mutations: {
    selectCategory(state, category) {
      state.selectedCategory = category;
    },
    questionsAmount(state, amount) {
      state.questionsAmount = amount;
    },
    selectDifficulty(state, difficulty) {
      state.selectedDifficulty = difficulty;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    },
    isLastQuestion(state, bool) {
      state.isLastQuestion = bool;
    },
    setCurrentQuestionIdx(state, num) {
      if (num != 0) {
        state.currentQuestionIdx += num;
      } else {
        state.currentQuestionIdx = num;
      }
    },
    setAmountOfAnswers(state, num) {
      if (num != 0) {
        setTimeout(() => {
          state.amountOfAnwsers += num;
        }, 1500);
      } else {
        state.amountOfAnwsers = num;
      }
    },
    setCorrectAnswers(state, num) {
      if (num != 0) {
        state.correctAnswers += num;
      } else {
        state.correctAnswers = num;
      }
    },
    isPlaying(state, bool) {
      state.isPlaying = bool;
    },
    isFetching(state, bool) {
      state.isFetching = bool;
    },
    isFetchError(state, bool) {
      state.isFetchError = bool;
    },
  },
  actions: {
    startGame: ({ commit, dispatch }) => {
      dispatch("fetchQuestions");

      commit("isPlaying", true);
    },
    stopGame: ({ commit }) => {
      commit("selectCategory", "0");
      commit("questionsAmount", 10);
      commit("setCurrentQuestionIdx", 0);
      commit("isLastQuestion", false);
      commit("selectDifficulty", "any");
      commit("isPlaying", false);
      commit("isFetching", false);
      commit("isFetchError", false);
      commit("setQuestions", null);
      commit("setCorrectAnswers", 0);
      commit("setAmountOfAnswers", 0);
    },
    nextQuestion: ({ state, commit }) => {
      if (state.currentQuestionIdx < state.questionsAmount - 1) {
        commit("setCurrentQuestionIdx", 1);
      }
    },
    async fetchQuestions({ state, commit }) {
      try {
        commit("isFetching", true);

        const amount = state.questionsAmount;
        const category =
          state.selectedCategory === "0"
            ? ""
            : `&category=${state.selectedCategory}`;
        const difficulty =
          state.selectedDifficulty === "any"
            ? ""
            : `&difficulty=${state.selectedDifficulty}`;

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

        commit("setQuestions", result);
      } catch (error) {
        commit("isFetchError", true);

        console.error(
          `Something goes wrong with fetching data from API: ${error.message}`
        );
      } finally {
        commit("isFetching", false);
      }
    },
  },
});
