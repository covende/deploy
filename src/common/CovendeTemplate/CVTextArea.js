import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

/**
 *
 * @param {Object} param0
 * @param {String} param0.content
 * @param {Function} param0.setContent
 * @param {Boolean} param0.readonly
 * @returns
 */
function CVTextArea({ content, setContent, readonly = false, onChange=()=>{}}) {
  const editor = useRef(null);

  const config = {
    readonly: readonly,
    hotkeys: {
      redo: 'ctrl+z',
      undo: 'ctrl+y,ctrl+shift+z',
      indent: 'ctrl+]',
      outdent: 'ctrl+[',
      bold: 'ctrl+b',
      italic: 'ctrl+i',
      removeFormat: 'ctrl+shift+m',
      insertOrderedList: 'ctrl+shift+7',
      insertUnorderedList: 'ctrl+shift+8',
      openSearchDialog: 'ctrl+f',
      openReplaceDialog: 'ctrl+r'
    },
    events: {
      processPaste: function (event, html) {
        jodit_editor.selection.insertHTML(html);
        jodit_editor.tempContent = jodit_editor.getEditorValue();
      },
      afterPaste: function (event) {
        let el = document.querySelector('<div></div>');
        el.html(
          jodit_editor.tempContent
            ? jodit_editor.tempContent
            : jodit_editor.getEditorValue()
        );
        jodit_editor.setEditorValue(el.html());
        jodit_editor.tempContent = null;
      }
    },
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(e)=>onChange(e)}
    />
  );
}

export default CVTextArea;
