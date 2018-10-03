<template-editor>
  <div class="editor-container">
    <div id="editor" style="position: relative">

    </div>
  </div>

  <script>
    var editor;

    this.setValue = (value) => {
      if (editor) {
        editor.session.setValue(value);
      }
    }

    this.getValue = () => {
      if (editor) {
        return editor.getValue();
      }
    }

    this.clear = () => {
      if (editor) {
        editor.session.setValue('');
      }
    }

    this.on('mount', () => {
      ace.require("ace/ext/language_tools");
      editor = ace.edit("editor");
      editor.session.setMode("ace/mode/html");
      editor.setTheme("ace/theme/tomorrow");
      // enable autocompletion and snippets
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: false,
        enableLiveAutocompletion: false,

      });

      if (this.opts.text) {
        this.setValue(this.opts.text);
      }
    });
    this.on('unmount', () => {

    });
  </script>
  <style>
    .editor-container {
      height: 80vh;

    }

    #editor {
      width: 100%;
      height: 100%;
      position: relative;
    }
  </style>
</template-editor>