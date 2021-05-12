<template>
  <section class="section">
    <h1>プレゼンター画面</h1>
    <div class="reactionList">
      <p v-for="(code, index) in reactions" :key="index">{{ code }}</p>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      reactions: [],
      socket: ""
    };
  },
  mounted() {
    this.socket = io(":81", {
      transports: ["websocket", "polling", "flashsocket"]
    });
    this.socket.on("new-msg", code => {
      this.playSound(code);
      this.reactions.push(code);
    });
  },
  methods: {
    playSound(soundCode) {
      const sound = new Audio(`/sound/${soundCode}.mp3`);
      sound.play();
    }
  }
};
</script>
