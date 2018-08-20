'use babel';

import AtomSolidityCommentsView from './atom-solidity-comments-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSolidityCommentsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSolidityCommentsView = new AtomSolidityCommentsView(state.atomSolidityCommentsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSolidityCommentsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-solidity-comments:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSolidityCommentsView.destroy();
  },

  serialize() {
    return {
      atomSolidityCommentsViewState: this.atomSolidityCommentsView.serialize()
    };
  },

  toggle() {
    console.log('AtomSolidityComments was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
