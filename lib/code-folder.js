var CodeFolder;

module.exports = CodeFolder = {
  codeFolderView: null,
  modalPanel: null,
  subscriptions: null,
  activate: function(state) {
    return atom.workspace.observeTextEditors((function(_this) {
      return function(editor) {
        return editor.displayBuffer.tokenizedBuffer.onDidTokenize(function() {
          return _this.doFold('fold', editor);
        });
      };
    })(this));
  },
  doFold: function(action, editor) {
    var i, ref, results, row;
    if (editor == null) {
      editor = atom.workspace.getActiveTextEditor();
    }
    results = [];
    for (row = i = 0, ref = editor.getLastBufferRow(); 0 <= ref ? i <= ref : i >= ref; row = 0 <= ref ? ++i : --i) {
      if (editor.isFoldableAtBufferRow(row)) {
        results.push(editor.foldBufferRow(row));
      } else {
        results.push(void 0);
      }
    }
    return results;

    /*
    regexes = []
    for row in [0..editor.getLastBufferRow()]
      continue unless editor.isBufferRowCommented(row)
      if editor.lineTextForBufferRow(row).indexOf("@auto-fold regex") != -1
        editor.lineTextForBufferRow(row).replace /\/(.*?)\//g, (m, regex) ->
          regexes.push new RegExp(regex)
          return m
      break
    
    eachRow = (f) ->
      foldNext = false
      any = false
      for row in [0..editor.getLastBufferRow()]
        if editor.isFoldableAtBufferRow(row) && (foldNext || regexes.some((r) -> editor.lineTextForBufferRow(row).match(r)?))
          any = true if f(row)
        foldNext = editor.isBufferRowCommented(row) && editor.lineTextForBufferRow(row).indexOf("@auto-fold here") != -1
      return any
    
    if action == 'toggle'
      action = if eachRow((row) -> editor.isFoldedAtBufferRow(row)) then 'unfold' else 'fold'
    
    if action == "fold"
      eachRow (row) -> editor.foldBufferRow(row) unless editor.isFoldedAtBufferRow(row)
    else
      eachRow (row) -> editor.unfoldBufferRow(row) if editor.isFoldedAtBufferRow(row)
     */
  }
};
