<template>
  <section style="text-align:left;">

    <div>
      <p v-if="editor" v-html="editor.getHTML()" style="text-align:left;color:black;font-size:16px;margin-top:1em;line-height:1.6;"></p>
    </div>

    <client-only>
      <div>
        <div class="menuBar">
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <a-button-group size="large" class="menuButtonRow">

              <a-button type="primary"
                class="menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold">
                <a-icon type="bold" />
              </a-button>

              <a-button type="primary"
                class="menubar__button"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic">
                <a-icon type="italic" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike">
                <a-icon type="strikethrough" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                >
                <a-icon type="underline" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph">
                p
              </a-button>

              <a-button type="primary"
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })">
                H1
              </a-button>

              <a-button type="primary"
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })">
                H2
              </a-button>

              <a-button type="primary"
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })">
                H3
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list">
                <a-icon type="bars" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list">
                <a-icon type="ordered-list" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote">
                "
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code">
                <a-icon type="code" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block">
                <a-icon type="code" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                @click="commands.horizontal_rule">
                <a-icon type="dash" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                @click="commands.undo">
                <a-icon type="undo" />
              </a-button>

              <a-button type="primary"
                class="menubar__button buttonToHideOnMobile"
                @click="commands.redo">
                <a-icon type="redo" />
              </a-button>

              <a-button type="primary"
                class="menubar__button"
                @click="saveHtml()">
                <a-icon type="save" />
              </a-button>

              <a-button type="danger"
                class="menubar__button"
                @click="closeEditor()">
                <a-icon type="close" />
              </a-button>

              <!-- <a-button type="primary"
                class="menubar__button"
                @click="commands.hard_break">
                <a-icon type="enter" />
              </a-button> -->

            </a-button-group>


          </editor-menu-bar>
        </div>

        <editor-content class="editorTextfield" :editor="editor" />

      </div>
    </client-only>
  </section>


</template>

<script>
import { Editor,
  EditorContent,
  EditorMenuBar
} from 'tiptap'

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  TrailingNode,
} from 'tiptap-extensions'

export default {
  props: {
    database: String,
    htmlId: String,
    author: String,
    language: String,
    closeEditor: Function
  },
  mounted() {
    let editorData = '';

    for (let i = 0; i < this.$store.state[this.database].length; i++) {
      if (this.$store.state[this.database][i]._id === this.htmlId + this.language) {
        this.htmlElement = this.$store.state[this.database][i];
        editorData = this.$store.state[this.database][i].rawHtml;
      }
    }
    this.editor = new Editor({
      content: editorData,
      extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
        ],
    })
  },
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      htmlElement: {},
      editor: null
    }
  },
  methods: {
    async saveHtml() {
      try {
        let fullId = this.htmlId + this.language;
        let content = '';
        if (this.htmlElement._id != undefined) {
          let editedHtmlElement = {
            _id: fullId,
            _rev: this.htmlElement._rev,
            rawHtml: this.editor.getHTML()
          }
          await this.$putDoc(editedHtmlElement, fullId, this.htmlElement._rev, this.database)
        } else {
          let newHtmlElement = {
            _id: fullId,
            rawHtml: this.editor.getHTML()
          }
          await this.$postDocOwnId(newHtmlElement, this.database, this.author, fullId);
        }
        this.$notification['success']({
          message: 'Erfolg!',
          description: 'Text wurde gespeichert.',
        });
        this.closeEditor();
        this.editor.destroy();
      } catch (err) {
        console.log(err);
      }
    }
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  }
}
</script>
<style>
.ProseMirror {
  padding: 0.25em;
  outline-width: 0;
  color: black;
}
.menuBar {
  padding-top: 0.5em;
  padding-bottom: 1em;
}
.editorTextfield {
  padding: 0.25em;
  line-height: 1.6;
  border: 1px solid lightgrey;
}
.menuButtonRow {
  width:100%;
  display:flex;
  flex-direction:row;
}
.menubar__button {
  flex-grow:1;
}
@media screen and (max-width: 1000px) {
  .buttonToHideOnMobile {
    display: none;
  }
}
</style>
