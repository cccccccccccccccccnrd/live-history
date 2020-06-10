<template>
<div id="app">
  <div class="chat-container">
    <div class="fade"></div>
    <div
      class="chat"
      ref="chat"
    >
      <message
        class="message"
        v-for="(msg, index) in messages"
        :key="`message-${ index }`"
        :msg="msg"
      />
    </div>
  </div>
</div>
</template>

<script>
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  data () {
    return {
      messages: ['We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', 'We are watching YOU.', 'KIM KIYOSAKI È DIVENTATA FAMOSA PER AVER FATTO UN POMPINO A ROBERT T. KIYOSAKI', 'DIVORY FICKT ÄRSCHE RAUCHT JOINT HI HI WEN DU DAS LIEST, DEINE ALTE KRIECHT INS BAD HIHI KANKITO', ]
    }
  },
  mounted () {
    const url = window.location.hostname === 'localhost' ? 'ws://localhost:2001' : 'wss://cnrd.computer/live-history-ws'
    const socket = new WebSocket(url)

    socket.addEventListener('message', (message) => {
      const msg = JSON.parse(message.data)
      console.log(msg)
      if (msg.type === 'bot-message') {
        console.log(msg.payload)
        if (msg.payload.length > 0) {
          this.messages = this.messages.concat(message.payload)
          this.scroll()
        }
      }
    })

    this.scroll()
  },
  methods: {
    scroll () {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
    display: none;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
}

p {
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.chat-container {
  width: auto;
  height: auto;
}

.chat {
  position: relative;
  width: 100%;
  max-width: 375px;
  height: 80vh;
  padding: 1em;
  border: 1px solid black;
  border-radius: 25px;
  overflow: hidden;
  overflow-y: scroll;
}

.fade {
  position: absolute;
  width: 375px;
  height: 5%;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
  z-index: 10;
}

.message:last-of-type {
  margin: 0;
}
</style>