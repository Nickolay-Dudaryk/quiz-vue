<template>
  <p>Sorry, something went wrong. Please, try again.</p>
  <button type="button" @click="onGameStop" class="btn btn_stop">Main page</button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["stopGame"]),

    onGameStop() {
      this.stopGame();
    },
  },
};
</script>
