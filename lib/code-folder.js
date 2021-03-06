(function() {
  var CodeFolder;

  console.log("code-folder running");

  module.exports = CodeFolder = {
    codeFolderView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      console.log("activate");
      return atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return editor.displayBuffer.tokenizedBuffer.onDidTokenize(function() {
            return _this.doFold('fold', editor);
          });
        };
      })(this));
    },
    doFold: function(action, editor) {
      var folding, i, level, ref, results, row;
      console.log("dofold");
      if (editor == null) {
        editor = atom.workspace.getActiveTextEditor();
      }
      folding = false;
      level = null;
      results = [];
      for (row = i = ref = editor.getLastBufferRow(); ref <= 0 ? i <= 0 : i >= 0; row = ref <= 0 ? ++i : --i) {
        console.log({
          row: row,
          level: editor.indentationForBufferRow(row),
          text: editor.lineTextForBufferRow(row)
        });
        if (editor.isFoldableAtBufferRow(row) && folding && editor.indentationForBufferRow(row) <= level) {
          console.log("folding for realz - " + (editor.foldBufferRow(row)));
        }
        if (editor.lineTextForBufferRow(row).indexOf("!fold") !== -1) {
          folding = true;
          level = editor.indentationForBufferRow(row);
          if (editor.lineTextForBufferRow(row).indexOf("!fold-children") !== -1) {
            level = editor.indentationForBufferRow(row) + 1;
          }
          if (editor.lineTextForBufferRow(row).indexOf("!fold-deep") !== -1) {
            results.push(level = 999);
          } else {
            results.push(void 0);
          }
        } else if (editor.lineTextForBufferRow(row).indexOf("@fold") !== -1) {
          results.push(folding = false);
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

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
  };

}).call(this);
