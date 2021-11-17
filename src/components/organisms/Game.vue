<template>
  <Score
    :correctAnswers="$store.state.correctAnswers"
    :questionsAmount="$store.state.questionsAmount"
  />
  <List />
  <button
    type="button"
    @click="$store.dispatch('nextQuestion')"
    :disabled="$store.getters.isDisabled"
  >
    Next question
  </button>
  <button type="button" @click="$store.dispatch('stopGame')">Stop game</button>
</template>

<script>
import Score from "../atoms/Score.vue";
import List from "../molecules/List.vue";

export default {
  components: {
    Score,
    List,
  },
};
</script>

<style>
</style>