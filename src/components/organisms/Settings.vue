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

    <button type="button" @click="startGame" class="primary-btn">
      Start game
    </button>
  </div>
</template>

<script>
import CategorySelect from "../atoms/CategorySelect.vue";
import DifficultySelect from "../atoms/DifficultySelect.vue";
import Slider from "@vueform/slider";

export default {
  components: {
    CategorySelect,
    DifficultySelect,
    Slider,
  },
};
</script>

<style></style>
