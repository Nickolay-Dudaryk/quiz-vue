import { createStore } from "vuex";

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
  getters: {},
  mutations: {
    startGame(state) {
      const amount = state.questionsAmount;
      const category =
        state.selectedCategory === "0"
          ? ""
          : `&category=${state.selectedCategory}`;
      const difficulty =
        state.selectedDifficulty === "any"
          ? ""
          : `&difficulty=${state.selectedDifficulty}`;

      commit("isPlaying", true);
    },
    selectCategory(state, category) {
      state.selectedCategory = category;
    },
    questionsAmount(state, amount) {
      console.log(state.questionsAmount);
      console.log(amount);
      state.questionsAmount = amount;
    },
    selectDifficulty(state, difficulty) {
      state.selectedDifficulty = difficulty;
    },
    isLastQuestion(state, bool) {
      state.isLastQuestion = bool;
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
  actions: {},
  modules: {},
});
