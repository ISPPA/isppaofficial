<template>
  <section id="pageContent">
    <section class="pageContainer">
      <section style="max-width:75em;">
        <section>
          <Logo id="pageLogo"/>
        </section>
        <section class="" style="margin-top:4em;padding:2em;">
          <div>
            <p v-html="proposalText" style="text-align:left;color:black;font-size:16px;margin-top:1em;line-height:1.6;" v-if="!editorVisible"></p>

            <p style="float:right;font-size:15px;color:#9e9e9e;cursor:pointer;" @click="editorVisible = true" v-if="!editorVisible && $store.state.authUser.role === 'Administrator'">
              edit <a-icon type="edit"/>
            </p>

            <TextEditor :database="'htmlsnips'" :htmlId="'proposal'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closeEditor" v-if="editorVisible"/>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Logo from "~/components/layout/Logo";
import TextEditor from '~/components/editor/TextEditor'

export default {
  middleware: 'auth',
  components: {
    Logo,
    TextEditor
  },
  data() {
    return {
      editorVisible: false
    }
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
}
</script>

<style>
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#pageContent {
  animation: 0.5s appear;
}
#pageLogo {
  margin-top: 10%;
}
.pageContainer {
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  color: white;
  padding: 1em;
}
@media screen and (max-width: 650px) {
  .pageContainer {
    padding: 0.25em;
  }
  #pageLogo {
    margin-left: 12.5%;
  }
}
</style>
