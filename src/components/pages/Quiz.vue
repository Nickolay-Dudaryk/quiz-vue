<template>
  <Options v-if="!$store.state.isPlaying" />

  <PulseLoader v-else-if="$store.state.isPlaying && $store.state.isFetching" />

  <FetchError v-else-if="$store.state.isFetchError" />

  <Finish
    v-else-if="$store.state.amountOfAnwsers === $store.state.questionsAmount"
  />

  <Game v-else />
</template>

<script>
import Options from "../organisms/Options.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Game from "../organisms/Game.vue";
import Finish from "../organisms/Finish.vue";
import FetchError from "../molecules/FetchError.vue";

export default {
  components: {
    Options,
    PulseLoader,
    Game,
    Finish,
    FetchError,
  },
};
</script>

<style>
</style>