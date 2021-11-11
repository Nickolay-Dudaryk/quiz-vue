<template>
  <div class="settings-page">
    <CategorySelect
      :selectedCategory="selectedCategory"
      @selectCategory="selectCategory"
      v-if="!isPlaying"
    />

    <!-- <div class="range-select" v-if="!isPlaying">
      <Slider
        v-model="questionsAmount"
        v-bind="this.sliderOptions"
        class="range-select__slider"
      />
      <p class="range-select__text">Questions</p>
    </div> -->

    <!-- <DifficultySelect
      :selectedDifficulty="selectedDifficulty"
      @selectDifficulty="selectDifficulty"
      v-if="!isPlaying"
    /> -->

    <button
      type="button"
      @click="startGame"
      v-if="!isPlaying"
      class="primary-btn"
    >
      Start game
    </button>
  </div>
</template>

<script>
import CategorySelect from '../atoms/CategorySelect.vue';
import DifficultySelect from '../atoms/DifficultySelect.vue';
import Slider from "@vueform/slider";

export default {
    components: {
        CategorySelect,
        DifficultySelect,
        Slider
    },
    props: {
        selectedCategory: String,
    }
}
</script>

<style>

</style>