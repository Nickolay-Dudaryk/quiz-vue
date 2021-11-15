<template>
  <p>Score: {{ correctAnswers }} of {{ questionsAmount }}</p>
</template>

<script>
export default {
  props: {
    correctAnswers: Number,
    questionsAmount: Number,
  },
};
</script>