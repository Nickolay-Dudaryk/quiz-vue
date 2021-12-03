<template>
  <router-link to="/quiz" class="btn btn_start router-link">Quiz</router-link>
  <router-link to="/" class="btn btn_start router-link router-link_disabled">Game 2</router-link>
  <router-link to="/" class="btn btn_start router-link router-link_disabled">Game 3</router-link>
  <router-link to="/" class="btn btn_start router-link router-link_disabled">Game 4</router-link>
  <router-link to="/" class="btn btn_start router-link router-link_disabled">Statistics</router-link>
  <router-link to="/settings" class="btn btn_start router-link">Settings</router-link>
</template>

<script>
export default {};
</script>

<style lang="scss">
.router-link {
  min-width: 300px;
  text-decoration: none;
  max-width: 70%;
  margin-bottom: 30px;
  text-align: center;

  &_menu {
    position: absolute;
    top: 25px;
    left: 25px;
    min-width: 90px;
  }

  &_disabled {
    pointer-events: none;
    background-color: gray;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>