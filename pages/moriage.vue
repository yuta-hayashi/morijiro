<template>
  <section class="section">
    <div class="field">
      <div class="control">
        <vs-button
          v-for="b in soundList"
          :key="b.code"
          color="primary"
          type="filled"
          size="large"
          @click="send(b.code)"
        >
          {{ b.text }}
        </vs-button>
      </div>
    </div>
  </section>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      msg: "",
      socket: "",
      soundList: [
        { text: "拍手歓声", code: "clapandcheer" },
        { text: "小笑い", code: "smalllaugh" },
        { text: "笑い", code: "laugh" },
        { text: "悲鳴", code: "scream" },
        { text: "キャーすごい！", code: "wowsugo" },
        { text: "ドン！", code: "don" }
      ]
    };
  },
  mounted() {
    this.socket = io(":81", {
      transports: ["websocket", "polling", "flashsocket"]
    });
    // this.socket.on("new-msg", msg => {
    //   console.log(msg);
    // });
  },
  methods: {
    send(code) {
      if (code) {
        // messageをサーバーサイドに投げる
        this.socket.emit("send-msg", code);
      }
    }
  }
};
</script>
