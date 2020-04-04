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

              <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorAboutVisible = true" v-if="!editorAboutVisible && $store.state.authUser != undefined && ($store.state.authUser.role === 'Editor' || $store.state.authUser.role === 'Administrator')">
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

              <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorProposalVisible = true" v-if="!editorProposalVisible && $store.state.authUser != undefined && ($store.state.authUser.role === 'Editor' || $store.state.authUser.role === 'Administrator')">
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

              <a-tag class="tagButton" color="#5B577F" v-for="(pool, pIndex) in sortedPools" :key="`database-${pIndex}`" @click="openWebsiteNewTab(pool.website)">

                <a-tooltip>
                  <template slot="title">
                    {{ pool.name }}
                  </template>
                  {{ pool.ticker }}
                </a-tooltip>

              </a-tag>

            </div>
          </section>
          <br>

          <section v-if="$store.state.authUser">
            <div class="proposalHeaderIconContainer">
              <a-icon type="profile" style="font-size:30px;color:white;"/>
            </div>
            <div class="proposalHeader">

              <h2 style="float:right;color:white;"><b>MEMBER SETTINGS</b></h2>
            </div>



            <section style="background:#E7EDFE;padding:1em;">
              <h2 style="color:#2e2e2e;"><b>Your Pools:</b></h2>
              <div v-if="currentUserPools.length != 0">

                <Pool  v-for="(pool, pIndex) in currentUserPools" :key="`currentUserPool-${pIndex}`" :pool="pool"/>


              </div>
              <p style="color:#5e5e5e;" v-else>No pool claimed. Start by claiming your pool!</p>

              <div style="margin-top:1em;" v-if="!claimPoolVisible">
                <a-button style="background:#F7F7F7;color:#6e6e6e;" @click="claimPoolVisible = !claimPoolVisible" v-if="!claimPoolVisible" type="dashed" block>CLAIM POOL</a-button>
              </div>

              <section style="background:#C7E2FF;padding:1em;margin-top:1em;" v-if="claimPoolVisible">
                <h2 style="color:#2e2e2e;">Claim a Pool:</h2>
                <div style="width:calc(90% + 1em);margin-left:calc(5% - 0.5em);margin-bottom:0.25em;">
                  <multiselect
                    v-model="participantToClaim"
                    :options="unclaimedPools"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="true"
                    placeholder="Select a POOL"
                    label="ticker"
                    track-by="_id"
                    :preselect-first="false">
                  </multiselect>
                </div>
                <a-button type="primary" style="width:calc(90% + 1em);margin-top:0.5em;" @click="claimPool(participantToClaim)" v-if="participantToClaim">claim <b> {{ participantToClaim.ticker }} </b> pool</a-button>
                <a-button type="danger" style="width:calc(90% + 1em);margin-top:0.5em;background:#FFE3E0;color:red;" @click="claimPoolVisible = !claimPoolVisible">cancel</a-button>
              </section>

              <div style="margin-top:1em;" v-if="!addPoolVisible">
                <a-button style="background:#F7F7F7;color:#6e6e6e;" @click="addPoolVisible = !addPoolVisible" v-if="!addPoolVisible" type="dashed" block>ADD NEW PARTICIPATING POOL</a-button>
              </div>

              <section style="background:#C7E2FF;padding-left:1em;padding-right:1em;padding-top:2em;padding-bottom:1em;margin-top:1em;" v-if="addPoolVisible">
                <h2 style="color:#2e2e2e;">ADD POOL:</h2>
                <div class="inputContainer">
                  <a-input class="basicInput" placeholder="Name" v-model="newParticipant.name"/>
                  <a-input class="basicInput" placeholder="Ticker" v-model="newParticipant.ticker"/>
                  <a-input class="basicInput" placeholder="Website" v-model="newParticipant.website"/>
                  <a-input class="basicInput" placeholder="Pool ID" v-model="newParticipant.poolId"/>
                </div>
                <a-button type="primary" style="width:calc(90% + 1em);margin-top:1em;" @click="saveParticipant()">SAVE POOL</a-button>
                <a-button type="danger" style="width:calc(90% + 1em);margin-top:0.5em;background:#FFE3E0;color:red;" @click="addPoolVisible = !addPoolVisible">cancel</a-button>
                <br><br>
              </section>



            </section>

            <div class="textElement">

              <span style="float:right;font-size:15px;color:#6762CC;cursor:pointer;" @click="editorPeerListVisible = true" v-if="!editorPeerListVisible && $store.state.authUser != undefined && ($store.state.authUser.role === 'Editor' || $store.state.authUser.role === 'Administrator')">
                edit <a-icon type="edit"/>
              </span>

              <Textfield :html="peerList" v-if="!editorPeerListVisible"/>
              <TextEditor :database="'htmlsnips'" :htmlId="'peerlist'" :author="$store.state.authUser.username" :language="$store.state.language" :closeEditor="closePeerListEditor" v-if="editorPeerListVisible"/>



              <code v-if="peerListSyntax === '0817'">
                &nbsp;&nbsp;layers:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;preferred_list:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view_max: 100<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;peers:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;ISPPA&nbsp;NODES<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;last&nbsp;edited:&nbsp;{{ findLastEditedNode }}<br>
                <span v-for="(node, nodeIndex) in shuffledNodelist" :key="nodeIndex">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;address:&nbsp;"/ip4/{{ node.ipAddress }}/tcp/{{ node.port }}"<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;"{{ node.nodeId }}"<br>
                </span>
              </code>

              <code v-if="peerListSyntax === '0814'">
                &nbsp;&nbsp;#&nbsp;ISPPA&nbsp;NODES<br>
                &nbsp;&nbsp;#&nbsp;last&nbsp;edited: {{ findLastEditedNode }}<br>
                <span v-for="(node, nodeIndex) in shuffledNodelist" :key="nodeIndex">
                  &nbsp;&nbsp;-&nbsp;address:&nbsp;"/ip4/{{ node.ipAddress }}/tcp/{{ node.port }}"<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;"{{ node.nodeId }}"<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;preferred:&nbsp;true<br>
                </span>
              </code>

              <div style="margin-top:0.5em;">
                <a-tag style="cursor:pointer;text-align:right;color:#2e2e2e;" @click="peerListSyntax = '0817'">0.8.17 Syntax</a-tag>
                <a-tag style="cursor:pointer;text-align:right;color:#2e2e2e;" @click="peerListSyntax = '0814'">0.8.14 Syntax</a-tag>
              </div>

            </div>
            <br>
          </section>
          <br>


          <section v-if="$store.state.authUser && $store.state.authUser.role === 'Administrator'">
            <div class="proposalHeaderIconContainer">
                <a-icon type="setting" style="float:left;font-size:30px;color:white;"/>
            </div>
            <div class="proposalHeader">
              <h2 style="float:right;color:white;"><b>ADMINISTRATION</b></h2>
            </div>
            <div>

              <section style="background:#DBFFD4;padding-left:1em;padding-right:1em;padding-top:1em;padding-bottom:2em;">
                <h2 style="color:#2e2e2e;">APPROVE PARTICIPANT:</h2>
                <p style="color:#5e5e5e;">Currently no pending applications.</p>
              </section>

              <section style="background:#FFE3E0;padding-left:1em;padding-right:1em;padding-top:1em;padding-bottom:2em;">
                <h2 style="color:#2e2e2e;">REMOVE POOL:</h2>

                <div style="width:calc(90% + 1em);margin-left:calc(5% - 0.5em);margin-bottom:0.25em;">
                  <multiselect
                    v-model="participantToRemove"
                    :options="sortedPools"
                    :multiple="false"
                    :close-on-select="true"
                    :clear-on-select="true"
                    :preserve-search="true"
                    placeholder="Select a POOL"
                    label="ticker"
                    track-by="_id"
                    :preselect-first="false">
                  </multiselect>
                </div>
                <a-button type="primary" style="width:calc(90% + 1em);margin-top:1em;" @click="removeParticipant(participantToRemove)">REMOVE POOL</a-button>
              </section>

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
import TextEditor from '~/components/editor/TextEditor';
import Multiselect from 'vue-multiselect';
import moment from 'moment';

import Pool from '~/components/pool/Pool'

export default {
  components: {
    Logo,
    TextEditor,
    Textfield,
    Multiselect,
    Pool
  },
  data() {
    return {
      editorAboutVisible: false,
      editorProposalVisible: false,
      editorPeerListVisible: false,
      claimPoolVisible: false,
      addPoolVisible: false,
      participantToRemove: '',
      participantToClaim: '',
      peerListSyntax: '0817',
      newParticipant: {
        name: '',
        ticker: '',
        website: '',
        poolId: ''
      }
    }
  },
  methods: {
    closeAboutEditor() {
      this.editorAboutVisible = false;
    },
    closeProposalEditor() {
      this.editorProposalVisible = false;
    },
    closePeerListEditor() {
      this.editorPeerListVisible = false;
    },
    routeToSettings() {
      this.$router.push('/settings');
    },
    openWebsiteNewTab(link) {
      window.open(link, "_blank");
    },
    async saveParticipant() {
      try {
        await this.$postDoc(this.newParticipant, 'participants', this.$store.state.authUser.username);
        this.$notification['success']({
          message: 'Success!',
          description: 'New participant saved.',
        });
        this.newParticipant = {
          name: '',
          ticker: '',
          website: '',
          poolId: '',
          addedBy: this.$store.state.authUser.username
        };
      } catch (err) {
        console.log(err);
      }
    },
    async removeParticipant(participant) {
      try {
        let result = confirm(`Delete ${participant.ticker}?`);
        if (result) {
          await this.$remDoc(participant, 'participants', this.$store.state.authUser.username);
          this.$notification['success']({
            message: 'Success!',
            description: 'Selected participant removed.',
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async claimPool(pool) {
      try {
        pool.claimedBy = this.$store.state.authUser.username;
        await this.$putDoc(pool, pool._id, pool._rev, 'participants');
        this.$notification['success']({
          message: 'Success!',
          description: 'Pool successfully claimed.',
        });
        this.participantToClaim = '';
      } catch (err) {
        console.log(err);
      }
    },
    sortByTicker( a, b ) {
      if ( a.ticker < b.ticker ){
        return -1;
      }
      if ( a.ticker > b.ticker ){
        return 1;
      }
      return 0;
    },
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
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
    },
    peerList() {
      let htmlElement = '';
      for (let i = 0; i < this.$store.state['htmlsnips'].length; i++) {
        if (this.$store.state['htmlsnips'][i]._id === 'peerlist' + this.$store.state.language) {
          htmlElement = this.$store.state['htmlsnips'][i].rawHtml;
        }
      }
      return htmlElement;
    },
    sortedPools() {
      let peers = [];
      for (let i = 0; i < this.$store.state.participants.length; i++) {
        peers.push(this.$store.state.participants[i]);
      }
      return peers.sort(this.sortByTicker);
    },
    unclaimedPools() {
      let peers = [];
      for (let i = 0; i < this.sortedPools.length; i++) {
        if (this.sortedPools[i].claimedBy === undefined) {
          peers.push(this.sortedPools[i]);
        }
      }
      return peers.sort(this.sortByTicker);
    },
    currentUserPools() {
      let peers = [];
      for (let i = 0; i < this.sortedPools.length; i++) {
        if (this.sortedPools[i].claimedBy && this.sortedPools[i].claimedBy === this.$store.state.authUser.username) {
          peers.push(this.sortedPools[i]);
        }
      }
      return peers.sort(this.sortByTicker);
    },
    shuffledNodelist() {
      return this.shuffle(this.$store.state.nodelist);
    },
    findLastEditedNode() {
      let lastEdited = new Date(Math.max.apply(null, this.$store.state.nodelist.map(function(e) {
        return new Date(e.lastEdited);
      })));
      return moment(lastEdited).format("YYYY/MM/DD|HH:mm:ss");
    },
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
.proposalHeaderIconContainerSmall {
  float: left;
  background: #6A61FF;
  padding: 0.5em;
  width: 2em;
  height: 2em;
  border-bottom: 1px solid grey;
}
.proposalHeaderSmall {
  padding: 0.5em;
  height: 2em;
  background: #5B577F;
  border-right: 5px solid #6A61FF;
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
@-moz-document url-prefix() {
  .tagButton {
    margin: 0.25em;
    font-size: 20px;
    padding-top:0.15em;
  }
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
.inputContainer {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  width:calc(90% + 1em);
  margin-left: calc(5% - 0.5em);
}
.basicInput {
  background:white;
  max-width:calc(50% - 0.5em);
  color:#2e2e2e;
  margin:0.25em;
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
  .basicInput {
    background:white;
    max-width: 100%;
    color:#2e2e2e;
    margin:0.25em;
  }
}
</style>
