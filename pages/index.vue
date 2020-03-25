<template>
  <section id="pageContent">
    <a-icon type="setting" class="lowVisibilityIcon" @click="routeToSettings()" v-if="$store.state.authUser && $store.state.authUser.role === 'Administrator'"/>
    <section class="pageContainer">
      <section style="max-width:75em;">
        <section>
          <Logo id="pageLogo"/>
        </section>
        <section class="contentContainer">
          <section>
            <div class="proposalHeaderIconContainer">
              <a-icon type="solution" style="font-size:30px;color:white;"/>
            </div>
            <div class="proposalHeader">

              <h2 style="float:right;color:white;"><b>ABOUT ISPPA</b></h2>
            </div>
            <div class="textElement">

              <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorAboutVisible = true" v-if="!editorAboutVisible && $store.state.authUser != undefined">
                edit <a-icon type="edit"/>
              </span>

              <Textfield :html="aboutText" v-if="!editorAboutVisible"/>

              <TextEditor :database="'htmlsnips'" :htmlId="'aboutus'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closeAboutEditor" v-if="editorAboutVisible"/>
            </div>
          </section>
          <br>

          <section>
            <div class="proposalHeaderIconContainer">
              <a-icon type="experiment" style="font-size:30px;color:white;"/>
            </div>
            <div class="proposalHeader">

              <h2 style="float:right;color:white;"><b>OUR TESTCASE</b></h2>
            </div>
            <div class="textElement">

              <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorProposalVisible = true" v-if="!editorProposalVisible && $store.state.authUser != undefined">
                edit <a-icon type="edit"/>
              </span>

              <Textfield :html="proposalText" v-if="!editorProposalVisible"/>

              <TextEditor :database="'htmlsnips'" :htmlId="'designspec'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closeProposalEditor" v-if="editorProposalVisible"/>
            </div>
          </section>
          <br>

          <section>
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
  </section>
</template>

<script>
import Logo from "~/components/layout/Logo";
import Textfield from "~/components/layout/Textfield";
import TextEditor from '~/components/editor/TextEditor'

export default {
  components: {
    Logo,
    TextEditor,
    Textfield
  },
  data() {
    return {
      editorAboutVisible: false,
      editorProposalVisible: false,
      pools: [
        'AHLNET',
        'AIJOU',
        'ANP',
        'BAKE',
        'BAKE2',
        'BCSH',
        'CALM',
        'CHEAP',
        'CHKN',
        'CLIO1',
        'COOL',
        'CSP',
        'ELMO',
        'HAPPY',
        'HRBR',
        'HRMA',
        'HRMS',
        'ITALY',
        'KIWI',
        'LIEBE',
        'LOVE',
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
    closeAboutEditor() {
      this.editorAboutVisible = false;
    },
    closeProposalEditor() {
      this.editorProposalVisible = false;
    },
    routeToSettings() {
      this.$router.push('/settings');
    }
  },
  computed: {
    aboutText() {
      let htmlElement = '';
      for (let i = 0; i < this.$store.state['htmlsnips'].length; i++) {
        if (this.$store.state['htmlsnips'][i]._id === 'aboutus' + this.$store.state.language) {
          htmlElement = this.$store.state['htmlsnips'][i].rawHtml;
        }
      }
      return htmlElement;
    },
    proposalText() {
      let htmlElement = '';
      for (let i = 0; i < this.$store.state['htmlsnips'].length; i++) {
        if (this.$store.state['htmlsnips'][i]._id === 'designspec' + this.$store.state.language) {
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
.lowVisibilityIcon {
  padding: 0.5em;
  position: absolute;
  display: inline;
  right: 0;
  color: #4e4e4e;
  cursor: pointer;
}
.lowVisibilityIcon:hover {
  color: lightgrey;
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
  #pageLogo {
    margin-top: 5%;
  }
  .pageContainer {
    padding: 0em;
  }
  .contentContainer {
    margin-top: 1.5em;
    padding: 0em;
    max-width: 100vw;
  }
}
</style>
