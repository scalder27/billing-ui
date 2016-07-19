export const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }

    return "";
};

export const oneClickSelection = node => {
    let range;

    if (window.getSelection) {
        var sel = window.getSelection();
        range = document.createRange();
        range.selectNode(node);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    }
};
