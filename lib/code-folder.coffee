module.exports = CodeFolder =
  codeFolderView: null
  modalPanel: null
  subscriptions: null

  # folding test @fold
  activate: (state) ->
    atom.workspace.observeTextEditors (editor) =>
      editor.displayBuffer.tokenizedBuffer.onDidTokenize =>
        @doFold 'fold', editor
  doFold: (action, editor) ->
    editor ?= atom.workspace.getActiveTextEditor()

    folding = false
    level = null

    for row in [0..editor.getLastBufferRow()]
      if editor.isFoldableAtBufferRow(row) and folding and editor.indentationForBufferRow(row) == level
        editor.foldBufferRow(row)
        console.log ("folding a row")
        console.log row
        console.log level
      if editor.lineTextForBufferRow(row).indexOf("@fold") != -1
        folding = true
        level = editor.indentationForBufferRow(row)
        console.log ("starting folding")
        console.log level
      else if editor.lineTextForBufferRow(row).indexOf("!fold") != -1
        folding = false
  # <!fold>

  ###
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
  ###
