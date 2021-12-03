import { createStore } from "vuex";
import quiz from "./modules/quiz.js";

export default createStore({
  modules: {
    quiz,
  },
});
