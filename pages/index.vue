<template>
  <section id="pageContent">
    <section class="pageContainer">
      <section style="max-width:75em;">
        <section>
          <Logo id="pageLogo"/>
        </section>
        <section class="contentContainer">
          <div class="proposalHeaderIconContainer">
            <a-icon type="solution" style="font-size:30px;color:white;"/>
          </div>
          <div class="proposalHeader">

            <h2 style="float:right;color:white;"><b>PROPOSAL</b></h2>
          </div>
          <div class="textElement">

            <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorVisible = true" v-if="!editorVisible && $store.state.authUser.username != undefined">
              edit <a-icon type="edit"/>
            </span>

            <!-- <div v-html="proposalText" class="vHtmlText" style="text-align:left;color:black;font-size:16px;margin-top:1em;line-height:1.6;" v-if="!editorVisible"></div> -->
            <Textfield :html="proposalText" v-if="!editorVisible"/>

            <TextEditor :database="'htmlsnips'" :htmlId="'proposal'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closeEditor" v-if="editorVisible"/>
          </div>
          <br>

          <div class="proposalHeaderIconContainer">
              <a-icon type="apartment" style="float:left;font-size:30px;color:white;"/>
          </div>
          <div class="proposalHeader">
            <h2 style="float:right;color:white;"><b>PARTICIPANTS</b></h2>
          </div>
          <div class="textElement">

            <a-tag class="tagButton" color="#5B577F" v-for="(pool, pIndex) in pools" :key="pIndex">
              {{ pool }}
            </a-tag>

          </div>
        </section>

      </section>
    </section>
  </section>
</template>

<script>
import Logo from "~/components/layout/Logo";
import Textfield from "~/components/layout/Textfield";
import TextEditor from '~/components/editor/TextEditor'

export default {
  middleware: 'auth',
  components: {
    Logo,
    TextEditor,
    Textfield
  },
  data() {
    return {
      editorVisible: false,
      pools: [
        'AHLNET',
        'ANP',
        'BAKE',
        'BCSH',
        'CALM',
        'CHEAP',
        'CHKN',
        'COOL',
        'CSP',
        'ELMO',
        'HAPPY',
        'HRBR',
        'HRMA',
        'HRMS',
        'KIWI',
        'MERRY',
        'MONKY',
        'SAND',
        'SEXY',
        'SEXY69',
        'SOBIT',
        'STACK',
        'STDN',
        'STR8',
        'VIPER'
      ]
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
.contentContainer {
  margin-top: 2em;
  padding: 1em;
}
#pageContent {
  animation: 0.5s appear;
}
#pageLogo {
  margin-top: 3.5%;
}
.proposalHeader {
  padding: 1em;
  height: 3.5em;
  background: #6480E8;
  border-right: 5px solid #C46EFF;
  border-bottom: 1px solid grey;
}
.proposalHeaderIconContainer {
  float: left;
  background: #C46EFF;
  padding: 1em;
  width: 3.75em;
  height: 3.5em;
  border-bottom: 1px solid grey;
}
.textElement {
  background: white;
  color: black;
  padding: 1.5em;
}
.vHtmlText >>> p {
  color: black;
}
.tagButton {
  margin: 0.25em;
  font-size: 20px;
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
  .contentContainer {
    margin-top: 1em;
    padding: 0em;
  }
}
</style>
