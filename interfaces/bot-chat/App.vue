<template>
<div id="app">
  <div class="chat-container">
    <div class="bar top"></div>
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
    <div class="bar bottom"></div>
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
      messages: []
    }
  },
  mounted () {
    const url = window.location.hostname === 'localhost' ? 'ws://localhost:2201' : 'wss://wwww.cnrd.computer/ws'
    const socket = new WebSocket(url)

    socket.addEventListener('message', (message) => {
      const msg = JSON.parse(message.data)
      console.log(msg)
      if (msg.type === 'bot-message') {
        console.log(msg.payload)
        if (msg.payload.length > 0) {
          this.messages = this.messages.concat(msg.payload)
          this.$nextTick(() => {
            this.scroll()
          })
        }
      }
    })

    this.scroll()
  },
  methods: {
    scroll () {
      this.$refs.chat.scroll({
        top: this.$refs.chat.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  computed: {
    loading () {
      return this.messages.length === 0
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
  scroll-behavior: smooth;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 13px;
  font-weight: 500;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.bar {
  width: 100%;
  height: 4em;
}

.bar.top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.bar.bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.chat-container {
  width: auto;
  height: auto;
  background: rgba(0, 0, 0, 1);
  border-radius: 25px;
}

.chat {
  position: relative;
  width: 375px;
  /* width: 90%; */
  height: 70vh;
  padding: 1.5em;
  overflow: hidden;
  overflow-y: scroll;
}

.message:last-of-type {
  margin: 0;
}

@media (max-width: 600px) {
  .chat-container {
    display: flex;
    flex-flow: column nowrap;
    width: auto;
    height: 100vh;
    border-radius: 0px;
  }

  .chat {
    height: auto;
    width: 100%;
  }

  .bar {
    height: 5em;
  }
}
</style>