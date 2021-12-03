<script>

export default {
};
</script>

<template>
  <router-link to="/" class="btn btn_start router-link router-link_menu">Menu</router-link>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/index.scss";
@import "@vueform/slider/themes/default.css";

.container {
  width: 100%;
  height: 100vh;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
