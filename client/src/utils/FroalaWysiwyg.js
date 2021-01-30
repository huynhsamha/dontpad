/**
 * Configure for Frola Editor
 * https://www.froala.com/wysiwyg-editor/docs/options#fontFamily
 */
export const config = {
  placeholderText: 'Edit Your Content Here!',
  spellcheck: false,
  scaytAutoload: false,
  charCounterCount: false,
  theme: 'custom',
  indentMargin: 10,
  heightMin: window.screen.availHeight,
  height: window.screen.availHeight,
  autofocus: true,
  tabSpaces: 4,
  disableRightClick: true,
  htmlExecuteScripts: false,
  htmlRemoveTags: ['script', 'style', 'base', 'iframe'],
  htmlAllowComments: false,
  fontFamily: {
    'Roboto, sans-serif': 'Roboto',
    'Quicksand, sans-serif': 'Quicksand',
    'Nunito, sans-serif': 'Nunito',
    'Open Sans, sans-serif': 'Open Sans',
    'Open Sans Condensed, sans-serif': 'Open Sans Condensed',
    'Arial,Helvetica,sans-serif': 'Arial',
    'Georgia,serif': 'Georgia',
    'Impact,Charcoal,sans-serif': 'Impact',
    'Tahoma,Geneva,sans-serif': 'Tahoma',
    '\'Times New Roman\',Times,serif': 'Times New Roman',
    'Verdana,Geneva,sans-serif': 'Verdana'
  },
  toolbarButtons: [
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
    'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|',
    'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',
    'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|',
    'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
    'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo', '|', 'fullscreen'
  ],
  events: {
    'froalaEditor.html.set': function (e, editor) {
      // console.log('Set');
      // editor.selection.save();
      // editor.selection.restore();
    },
    'froalaEditor.html.beforeGet': function (e, editor) {
      // console.log('beforeGet');
      // editor.selection.save();
    },
    'froalaEditor.html.afterGet': function (e, editor) {
      // console.log('afterGet');
      // editor.selection.restore();
    }
  }
};
