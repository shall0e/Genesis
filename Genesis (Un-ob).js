function b(e){let o="";for(let t=0;t<e.length;t++)"A"<=e[t]&&e[t]<="Z"?o+=String.fromCharCode(e.charCodeAt(t)+32):o+=e[t];return o}
function a(){
  var genesis = document.getElementById('app')._reactRootContainer._internalRoot.current.child.pendingProps.store.getState().scratchGui.vm.runtime.getSpriteTargetByName('Genesis')
  var oldOpcode = genesis.lookupVariableByNameAndType('opcode', '').value
  setInterval(function() {
    genesis.lookupVariableByNameAndType('connected?', '').value = 'connected';
    if (genesis.lookupVariableByNameAndType('opcode', '').value !== oldOpcode) {
      var cmd = b(String(genesis.lookupVariableByNameAndType('return', '').value))
      var cmdRaw = genesis.lookupVariableByNameAndType('return', '').value
      if (cmd.includes("method: 'POST'") || cmd.includes("method: 'POST'") || cmd.includes("href") || cmd.includes("open(") || cmd.includes("csrftoken") || cmd.includes("authorization") || cmd.includes("document.") || cmd.includes("sessionsid") || cmd.includes("vm.runtime") || cmd.includes("getElementById('app')")) {
        // filter detection, block immediately.
        genesis.lookupVariableByNameAndType('return', '').value = 'Command detected as harmful, heres a link to a chicken alfredo recipe: https://thecozycook.com/chicken-alfredo-pasta/'
      } else {
        var evalReturn = eval(cmdRaw)
        genesis.lookupVariableByNameAndType('return', '').value = evalReturn
      }
      oldOpcode = genesis.lookupVariableByNameAndType('opcode', '').value
    }
  }, 33)
};a()
