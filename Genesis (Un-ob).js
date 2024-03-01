const genesis = {}
genesis.scratch = document.getElementById('app')._reactRootContainer._internalRoot.current.child.pendingProps.store.getState()
genesis.genesis = document.getElementById('app')._reactRootContainer._internalRoot.current.child.pendingProps.store.getState().scratchGui.vm.runtime.getSpriteTargetByName('Genesis')
genesis.scratch.session.session.user.token = "tokenHidden";
genesis.scratch.session.session.user.email = "email@email.com";
genesis.filterText = [
  'blowing up computer in t-minus 3 seconds.',
  "don't spread viruses, spread love!",
  "stealing information is wrong.",
  "Javascript is a very diverse language, try using some other code!",
  "using Genesis to steal accounts is wrong, the creators project has been logged to the Genesis Database.",
  "contact the creator and ask them why they are trying to steal accounts.",
  "don't abuse Genesis, we block webhooks and sending data."
];
genesis.getVariable = function(target,variable){
  if (target == 'stage') {
    return genesis.scratch.scratchGui.vm.runtime.getTargetForStage().lookupVariableByNameAndType(String(variable),'').value;
  } else {
    return genesis.scratch.scratchGui.vm.runtime.getSpriteTargetByName(String(target)).lookupVariableByNameAndType(String(variable),'').value;
  }
};
var oldOpcode = 9999
var evalReturn;
function b(e){let o="";for(let t=0;t<e.length;t++)"A"<=e[t]&&e[t]<="Z"?o+=String.fromCharCode(e.charCodeAt(t)+32):o+=e[t];return o};
function a(){
  setInterval(function() {
    genesis.genesis.lookupVariableByNameAndType('connected?', '').value = 'connected';
    if (genesis.genesis.lookupVariableByNameAndType('opcode', '').value !== oldOpcode) {
      var cmd = b(String(genesis.genesis.lookupVariableByNameAndType('return', '').value))
      if (cmd.includes("method: 'POST'") || cmd.includes("method: 'POST'") || cmd.includes("href") || cmd.includes("open(") || cmd.includes("csrftoken") || cmd.includes("authorization") || cmd.includes("document.") || cmd.includes("sessionsid") || cmd.includes("vm.runtime") || cmd.includes("getElementById('app')")) {
        // filter detection, block immediately.
        genesis.genesis.lookupVariableByNameAndType('return', '').value = 'Command detected as unsafe, '+genesis.filterText[Math.floor(Math.random() * genesis.filterText.length)];
      } else {
        if ((evalReturn = eval(genesis.genesis.lookupVariableByNameAndType('return', '')).value).length > 500) {
          genesis.genesis.lookupVariableByNameAndType('return', '').value = 'Sorry! Genesis blocks strings over 3000 characters long to protect from crashes and memory leaks.'
        } else {
          genesis.genesis.lookupVariableByNameAndType('return', '').value = eval(evalReturn)
        }
      }; oldOpcode = genesis.genesis.lookupVariableByNameAndType('opcode', '').value; genesis.genesis.lookupVariableByNameAndType('oldOpcode', '').value = genesis.genesis.lookupVariableByNameAndType('opcode', '').value;
    }
  }, 33)
};a();
