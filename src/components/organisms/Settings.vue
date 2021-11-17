<template>
  <div class="settings-page">
    <CategorySelect />

    <div class="range-select">
      <Slider
        v-model="$store.state.questionsAmount"
        v-bind="$store.state.sliderOptions"
        @change="$store.commit('questionsAmount', $event)"
        class="range-select__slider"
      />
      <p class="range-select__text">Questions</p>
    </div>

    <DifficultySelect />

    <button type="button" @click="onGameStart" class="primary-btn">
      Start game
    </button>
  </div>
</template>

<script>
import CategorySelect from "../atoms/CategorySelect.vue";
import DifficultySelect from "../atoms/DifficultySelect.vue";
import Slider from "@vueform/slider";
import { mapActions } from "vuex";

export default {
  components: {
    CategorySelect,
    DifficultySelect,
    Slider,
  },
  methods: {
    ...mapActions(["startGame"]),

    onGameStart() {
      this.startGame();
    }
  }
};
</script>

<style lang="scss">
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
</style>
