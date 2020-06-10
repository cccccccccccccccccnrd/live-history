<template>
<a
  :href="msg.url"
  target="_blank"
  class="message"
  :class="{ self: !self }"
>
  <p>{{ msg.content.toLowerCase() }}</p>
</a>
</template>

<script>
export default {
  props: ['msg'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    self () {
      return Math.random() >= 0.5
    }
  }
}
</script>

<style>
:root {
  --width: 35px;
}

a {
  color: white;
  text-decoration: none;
}

.message {
  display: block;
  margin: 0 0 1em 0;
  padding: 1em 2em;
  color: white;
  border: 1px solid white;
  border-radius: var(--width) var(--width) 0 var(--width);
  overflow: hidden;
}

.message.self {
  border-radius: var(--width) var(--width) var(--width) 0;
}

.message:hover {
  background: linear-gradient(180deg, rgba(0, 0, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
  border: 1px solid transparent;
  cursor: cursor;
}
</style>