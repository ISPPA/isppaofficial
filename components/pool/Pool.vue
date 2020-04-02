<template>
  <section>
    <section v-for="(pool, pIndex) in currentUserPools" :key="`currentUserPool-${pIndex}`" style="margin-top:1em;">
      <div class="proposalHeaderIconContainerSmall">
        <a-icon type="deployment-unit" style="font-size:18px;color:white;"/>
      </div>
      <div class="proposalHeaderSmall">
        <h2 style="float:right;color:white;font-size:15px;"><b>{{ pool.name }} | {{ pool.ticker }}</b></h2>
      </div>
      <div class="textElement">
        <a-tooltip>
          <template slot="title">
            Release Pool
          </template>
          <a-icon style="float:right;color:red;margin:0.25em;font-size:25px;" type="api" @click="releasePool(pool)"/>
        </a-tooltip>

        <p style="color:#2e2e2e;text-align:left;">Pool ID: {{ pool.poolId }}</p>
        <p style="color:#2e2e2e;text-align:left;">Website: {{ pool.website }}</p>
        <br>

        <h2 style="color:#2e2e2e;">{{ pool.ticker }} NODES:</h2>

        <section class="nodeElement" v-for="(node, nodeIndex) in findNodeById(pool.poolId)" :key="nodeIndex">
          <a-icon style="float:right;color:red;margin:0.5em;font-size:20px;" type="delete" @click="removeNode(node)"/>

          <div class="labelTab">
            <span style="color:#2e2e2e;font-size:14px;">Label:<b style="font-size:18px;"> {{ node.label.toUpperCase() }}</b></span>
          </div>

          <div style="padding: 1em;">

            <code>
              &nbsp;&nbsp;# {{ node.label }}<br>
              <span>
                &nbsp;&nbsp;- address: "/ip4/{{ node.ipAddress }}/tcp/{{ node.port }}"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;id: "{{ node.nodeId }}"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;preferred: true<br>
              </span>
            </code>
          </div>
        </section>

        <div style="margin-top:1em;margin-left:0.5em;margin-right:0.5em;" v-if="currentUserPools.length != 0 && !addNodeVisible">

          <a-button style="background:#F7F7F7;color:#6e6e6e;" @click="addNodeVisible = !addNodeVisible" v-if="currentUserPools.length != 0 && !addNodeVisible" type="dashed" block>ADD NODE</a-button>

        </div>
        <section style="background:#C7E2FF;padding-left:1em;padding-right:1em;padding-top:1em;padding-bottom:2em;margin-top:1em;margin-left:0.5em;margin-right:0.5em;" v-if="currentUserPools.length != 0 && addNodeVisible">
          <div>
            <h2 style="color:#2e2e2e;">ADD NODE:</h2>

            <div>
              <a-input style="background:white;max-width:45%;min-width:15em;color:#2e2e2e;margin:0.25em;" placeholder="Label" v-model="newNode.label"/>
              <a-input style="background:white;max-width:45%;min-width:15em;color:#2e2e2e;margin:0.25em;" placeholder="Node ID" v-model="newNode.nodeId"/>
              <a-input style="background:white;max-width:45%;min-width:15em;color:#2e2e2e;margin:0.25em;" placeholder="IP Address" v-model="newNode.ipAddress"/>
              <a-input style="background:white;max-width:45%;min-width:15em;color:#2e2e2e;margin:0.25em;" placeholder="Port" v-model="newNode.port"/>
              <a-button type="primary" style="width:calc(90% + 1em);margin-top:1em;" @click="saveNode(pool.poolId);addNodeVisible = false">SAVE NODE</a-button>
            </div>
            <a-button type="danger" style="width:calc(90% + 1em);margin-top:0.5em;background:#FFE3E0;color:red;" @click="cancelAddNode()">cancel</a-button>

          </div>
        </section>
      </div>


    </section>
  </section>
</template>

<script>
export default {
  props: {
    currentUserPools: Array
  },
  data() {
    return {
      addNodeVisible: false,
      newNode: {
        poolId: '',
        label: '',
        nodeId: '',
        ipAddress: '',
        port: ''
      },
    }
  },
  methods: {
    async releasePool(pool) {
      try {
        let result = confirm(`Release ${pool.ticker}?`);
        if (result) {
          delete pool.claimedBy;
          await this.$putDoc(pool, pool._id, pool._rev, 'participants');
          this.$notification['success']({
            message: 'Success!',
            description: 'Pool successfully released.',
          });
        }

      } catch (err) {
        console.log(err);
      }
    },
    async saveNode(poolId) {
      try {
        this.newNode.poolId = poolId;
        this.newNode.lastEdited = new Date();
        await this.$postDoc(this.newNode, 'nodelist', this.$store.state.authUser.username);
        this.$notification['success']({
          message: 'Success!',
          description: 'New node saved.',
        });
        this.newNode = {
          poolId: '',
          label: '',
          nodeId: '',
          ipAddress: '',
          port: ''
        };
      } catch (err) {
        console.log(err);
      }
    },
    cancelAddNode() {
      this.addNodeVisible = false;
      this.newNode = {
        poolId: '',
        label: '',
        nodeId: '',
        ipAddress: '',
        port: ''
      };
    },
    findNodeById(id) {
      let nodelist = [];
      for (let i = 0; i < this.$store.state.nodelist.length; i ++) {
        if (this.$store.state.nodelist[i].poolId === id) {
          nodelist.push(this.$store.state.nodelist[i]);
        }
      }
      return nodelist.reverse();
    },
    async removeNode(node) {
      try {
        let result = confirm(`Delete ${node.label}?`);
        if (result) {
          await this.$remDoc(node, 'nodelist', this.$store.state.authUser.username);
          this.$notification['success']({
            message: 'Success!',
            description: 'Selected node removed.',
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.nodeElement {
  background: #E7EDFE;
  border: solid #C8D9E8 5px;
  margin: 0.5em;
}
.labelTab {
  background:white;
  max-width:25em;
  text-align:left;
  margin-left:1em;
  padding:0.5em;
  border-left:1px solid #3e3e3e;
  border-right:1px solid #3e3e3e;
  border-bottom:1px solid #3e3e3e;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
code {
  background: #5e5e5e;
  color: #F0F0F0;
}
</style>
