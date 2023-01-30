<template>
  <div class="sidebar">
    <button autofocus @click="emitEventRectangle">Rectangle</button>
    <button @click="emitEventCircle">Circle</button>
    <button @click="emitEventLine">Line</button>
  </div>
</template>

<script>
export default {
  methods: {
    emitEventRectangle() {
      this.$emit("childEvent", "rectangle");
      this.button;
    },
    emitEventCircle() {
      this.$emit("childEvent", "circle");
    },
    emitEventLine() {
      this.$emit("childEvent", "line");
    },
  },
};
</script>

<style>
.sidebar {
  width: 90px;
  background-color: gray;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
   border-bottom-right-radius: 10%;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
button:focus {
  background: linear-gradient(#152b40, #152b40);
  color: white;
}
</style>
