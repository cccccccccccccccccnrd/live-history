<template>
  <div
    class="message"
    :class="{ self: self }"
  >
    <p>{{ msg }}</p>
  </div>
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
.message {
  margin: 0 0 1em 0;
  padding: 1em 2em;
  color: white;
  background: black;
  border-radius: 100px 100px 0 100px;
}

.message.self {
  border-radius: 100px 100px 100px 0;
}
</style>