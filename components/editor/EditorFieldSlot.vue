<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.editorTextfield >>> p {
  color: black;
}
.editorTextfield >>> h1 {
  color: black;
  font-size: 30px;
}
.editorTextfield >>> h2 {
  color: black;
  font-size: 25px;
}
.editorTextfield >>> h3 {
  color: black;
  font-size: 20px;
}
.editorTextfield >>> code {
  font-family: 'Source Code Pro';
  background-color: #3e3e3e;
  color: lightgrey;
  border: 2px solid lightgrey;
  display: block;
  padding: 20px;
}
</style>
