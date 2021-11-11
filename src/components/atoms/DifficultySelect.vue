<template>
  <select
    v-model="selectedDifficulty"
    class="category-select"
    :value="selectedDifficulty"
    @change="$emit('selectDifficulty', $event.target.value)"
  >
    <option value="any">Any Difficulty</option>
    <option value="easy">Easy</option>
    <option value="meduim">Meduim</option>
    <option value="hard">Hard</option>
  </select>
</template>

<script>
export default {
  props: {
    selectedDifficulty: String,
  },
};
</script>
