console.log "code-folder running"

module.exports = CodeFolder =
	codeFolderView: null
	modalPanel: null
	subscriptions: null

	# folding test @fold
	activate: (state) ->
		console.log "activate"
		atom.workspace.observeTextEditors (editor) =>
			editor.displayBuffer.tokenizedBuffer.onDidTokenize =>
				@doFold 'fold', editor
	doFold: (action, editor) ->
		console.log "dofold"
		editor ?= atom.workspace.getActiveTextEditor()

		folding = false
		level = null



		for row in [editor.getLastBufferRow()..0]
			console.log {
				row: row
				level: editor.indentationForBufferRow(row)
				text: editor.lineTextForBufferRow(row)
			}
			if editor.isFoldableAtBufferRow(row) and folding and editor.indentationForBufferRow(row) <= level
				console.log "folding for realz - #{editor.foldBufferRow(row)}"
			if editor.lineTextForBufferRow(row).indexOf("!fold") != -1
				folding = true
				level = editor.indentationForBufferRow(row)
				if editor.lineTextForBufferRow(row).indexOf("!fold-children") != -1
					level = editor.indentationForBufferRow(row) + 1
				if editor.lineTextForBufferRow(row).indexOf("!fold-deep") != -1
					level = 999
			else if editor.lineTextForBufferRow(row).indexOf("@fold") != -1
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
