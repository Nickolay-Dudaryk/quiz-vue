<template>
  <div class="score-block">
    <p>Score: {{ $store.state.correctAnswers }} of {{ $store.state.questionsAmount }}</p>
    <p>Question {{ $store.state.currentQuestionIdx + 1 }} of {{ $store.state.questionsAmount }}</p>
  </div>
</template>

<script>
export default {
};
</script>
<style lang="scss">
  .score-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>