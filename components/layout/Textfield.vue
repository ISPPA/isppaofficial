<template>
  <section>
    <div v-html="html" class="vHtmlText" style="text-align:left;color:black;font-size:16px;line-height:1.6;"></div>
  </section>
</template>

<script>
export default {
  props: {
    html: String
  }
}
</script>

<style lang="css" scoped>
.vHtmlText >>> p {
  color: black;
}
.vHtmlText >>> h1 {
  color: black;
  font-size: 30px;
}
.vHtmlText >>> h2 {
  color: black;
  font-size: 25px;
}
.vHtmlText >>> h3 {
  color: black;
  font-size: 20px;
}

.vHtmlText >>> code {
  font-family: 'Source Code Pro';
  background-color: #3e3e3e;
  color: lightgrey;
  border: 2px solid lightgrey;
  display: block;
  padding: 20px;
}
</style>
