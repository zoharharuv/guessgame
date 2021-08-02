var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage('questTree')
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Zohar');
        gQuestsTree.no = createQuest('Mika');
        gCurrQuest = gQuestsTree;
        gPrevQuest = null;
        _saveTreeToStorage();
    }
    gCurrQuest = gQuestsTree;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    _saveTreeToStorage();
}

function getCurrQuest() {
    return gCurrQuest;
}

function _saveTreeToStorage() {
    saveToStorage('questTree', gQuestsTree);
}
