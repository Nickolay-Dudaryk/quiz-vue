<template>
  <select
    class="category-select"
    :value="$store.state.selectedDifficulty"
    @change="$store.commit('selectDifficulty', $event.target.value)"
  >
    <option value="any">Any Difficulty</option>
    <option value="easy">Easy</option>
    <option value="medium">Meduim</option>
    <option value="hard">Hard</option>
  </select>
</template>

<script>
export default {
};
</script>
