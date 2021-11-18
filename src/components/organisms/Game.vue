<template>
  <div class="game-page">
    <Score />
    <List />

    <div class="game-page__controls">
      <button type="button" @click="onGameStop" class="btn btn_stop">Stop game</button>
      <button
        type="button"
        @click="onNextQuestion"
        :disabled="$store.getters.isDisabled"
        class="btn btn_next"
      >
        Next question
      </button>
    </div>
  </div>
</template>

<script>
import Score from "../atoms/Score.vue";
import List from "../molecules/List.vue";
import { mapActions } from "vuex"

export default {
  components: {
    Score,
    List,
  },
  methods: {
    ...mapActions(["nextQuestion", "stopGame"]),

    onNextQuestion() {
      this.nextQuestion();
    },
    onGameStop() {
      this.stopGame();
    }
  }
};
</script>

<style lang="scss">
  .game-page {
    width: 100%;
    max-width: 500px;

    &__controls {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        width: 100%;
        margin-right: 20px;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>