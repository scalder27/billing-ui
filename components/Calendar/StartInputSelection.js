const SmartInputSelection = {
    CHARACTER: "character",
    END_TO_END: "EndToEnd",
    END_TO_START: "EndToStart",

    getSelection(node) {
        let start, end;
        if (node.selectionStart !== undefined) {
            start = node.selectionStart;
            end = node.selectionEnd;
        } else {
            const range = document.selection.createRange();
            if (range == null) {
                start = end = 0;
            }

            const textRange = node.createTextRange();
            const duplicate = textRange.duplicate();
            textRange.moveToBookmark(range.getBookmark());
            duplicate.setEndPoint(this.END_TO_END, textRange);
            end = duplicate.text.length;
            duplicate.setEndPoint(this.END_TO_START, textRange);
            start = duplicate.text.length;
        }

        return {
            start: start,
            end: end
        };
    },

    setSelection(node, a, b) {
        let start, end;
        if (b === undefined && typeof a === "number") {
            end = a;
        } else if (b === undefined) {
            end = a.end;
            start = a.start;
        }

        if (node.selectionStart !== undefined) {
            node.selectionStart = start;
            node.selectionEnd = end;
        } else {
            const textRange = node.createTextRange();
            textRange.collapse(true);
            textRange.moveStart(this.CHARACTER, start);
            textRange.moveEnd(this.CHARACTER, end - start);
            textRange.select();
        }
    }
};

export default SmartInputSelection;
