<script>
import Settings from "./components/organisms/Settings.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Game from "./components/organisms/Game.vue";
import Finish from "./components/organisms/Finish.vue";
import FetchError from "./components/molecules/FetchError.vue";

export default {
  components: {
    Settings,
    PulseLoader,
    Game,
    Finish,
    FetchError,
  },
};
</script>

<template>
  <div class="container">
    <Settings v-if="!$store.state.isPlaying" />

    <PulseLoader v-else-if="$store.state.isPlaying && $store.state.isFetching" />

    <FetchError v-else-if="$store.state.isFetchError" />

    <Finish v-else-if="$store.state.amountOfAnwsers === $store.state.questionsAmount" />

    <Game v-else />
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
