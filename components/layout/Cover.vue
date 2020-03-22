<template lang="html">
  <section style="max-width:75em;">
    <section>
      <Logo style="" id="pageLogo"/>
    </section>
    <section class="" style="text-align: center; margin-top:4em;padding:2em;">
      <div>
        <p v-html="proposalText" style="text-align:left;color:black;font-size:16px;margin-top:1em;line-height:1.6;" v-if="!editorVisible"></p>

        <p style="float:right;font-size:15px;color:#9e9e9e;cursor:pointer;" @click="editorVisible = true" v-if="!editorVisible && $store.state.authUser.role === 'Administrator'">
          edit <a-icon type="edit"/>
        </p>

        <TextEditor :database="'htmlsnips'" :htmlId="'proposal'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closeEditor" v-if="editorVisible"/>
      </div>
    </section>
  </section>
</template>

<script>
import Logo from "~/components/layout/Logo";
import TextEditor from '~/components/editor/TextEditor'

export default {
  data() {
    return {
      editorVisible: false
    }
  },
  components: {
    Logo,
    TextEditor
  },
  methods: {
    closeEditor() {
      this.editorVisible = false;
    }
  },
  computed: {
    proposalText() {
      let htmlElement = '';
      for (let i = 0; i < this.$store.state['htmlsnips'].length; i++) {
        if (this.$store.state['htmlsnips'][i]._id === 'proposal' + this.$store.state.language) {
          htmlElement = this.$store.state['htmlsnips'][i].rawHtml;
        }
      }
      return htmlElement;
    }
  }
};
</script>

<style lang="css" scoped>
#pageLogo {
  margin-left: 30%;
  margin-top: 10%;
}

/* .cover {
  background-image: url('../assets/content/cover/background.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
} */
</style>
