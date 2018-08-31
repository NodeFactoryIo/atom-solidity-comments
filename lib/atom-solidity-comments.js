'use babel';

import { CompositeDisposable } from 'atom';
import {generateCommentsFromText} from "@nodefactory/solidity-comments-core";

export default {

  atomSolidityCommentsView: null,
  subscriptions: null,
  editor: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-solidity-comments:toggle': () => this.run()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  run() {
    this.reload()
    this.editor.setText(generateCommentsFromText(this.editor.getText()));
  },

  //reload global variables after a docstring been added.
  reload() {
    this.editor = atom.workspace.getActiveTextEditor();
  },

};
