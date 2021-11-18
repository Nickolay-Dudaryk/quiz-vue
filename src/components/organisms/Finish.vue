<template>
  <p class="finish-text">
    Your score is: {{ $store.state.correctAnswers }} of
    {{ $store.state.questionsAmount }}
  </p>
  <button type="button" @click="onGameStop" class="btn btn_start">
    Main menu
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["stopGame"]),

    onGameStop() {
      this.stopGame();
    },
  },
};
</script>

<style lang="scss">
.finish-text {
  font-size: 1.5em;
  margin-bottom: 40px;
}
</style>