<template>
  <div class="question">
    <i class="icon-question-mark"></i>
    <p class="question__text" ref="questionEl"></p>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
  },
  mounted() {
    this.$refs.questionEl.innerHTML = this.question;
  },
};
</script>

<style lang="scss">
.question {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 25px 0;

  &__text {
    font-weight: bold;
    font-size: 1.2em;
    margin-left: 25px;
  }
}
</style>