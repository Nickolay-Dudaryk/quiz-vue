import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
    selectedCategory: "0",
    questionsAmount: 10,
    currentQuestionIdx: 0,
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
    setCurrentQuestionIdx(state) {
      state.currentQuestionIdx += 1;
    },
    setCorrectAnswers(state) {
      state.correctAnswers += 1;
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
    startGame: ({ state }) => {
      const amount = state.questionsAmount;
      const category =
        state.selectedCategory === "0"
          ? ""
          : `&category=${state.selectedCategory}`;
      const difficulty =
        state.selectedDifficulty === "any"
          ? ""
          : `&difficulty=${state.selectedDifficulty}`;

      dispatch("fetchQuestions", amount, category, difficulty);

      commit("isPlaying", true);
    },
    stopGame: ({ commit }) => {
      commit("selectedCategory", "0");
      commit("questionsAmount", 10);
      commit("setCurrentQuestionIdx", 0);
      commit("isLastQuestion", false);
      commit("selectDifficulty", "any");
      commit("isPlaying", false);
      commit("isFetching", false);
      commit("isFetchError", false);
      commit("setQuestions", []);
      commit("setCorrectAnswers", 0);
    },
    nextQuestion: ({ state, commit }) => {
      if (state.currentQuestionIdx < state.questionsAmount - 1) {
        commit("setCurrentQuestionIdx");
      }
    },
    async fetchQuestions({ commit }, amount, category, difficulty) {
      try {
        commit("isFetching", true);
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
