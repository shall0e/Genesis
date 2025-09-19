let genesis = {}

genesis.scratch = document.getElementById('app')._reactRootContainer._internalRoot.current.child.pendingProps.store.getState()
genesis.genesis = document.getElementById('app')._reactRootContainer._internalRoot.current.child.pendingProps.store.getState().scratchGui.vm.runtime.getSpriteTargetByName('Genesis')
genesis.scratch.session.session.user.token = "tokenHidden";
genesis.scratch.session.session.user.email = "email@email.com";
genesis.filterText = [
  "don't spread viruses, spread love!",
  "stealing information is wrong.",
  "contact the creator and ask them why they are trying to steal accounts.",
  "don't abuse Genesis, we block webhooks and sending data."
];

genesis.getVariable = function(target,variable){
  if (target.toLowercase() == 'stage') {
    return genesis.scratch.scratchGui.vm.runtime.getTargetForStage().lookupVariableByNameAndType(String(variable),'').value;
  } else {
    return genesis.scratch.scratchGui.vm.runtime.getSpriteTargetByName(String(target)).lookupVariableByNameAndType(String(variable),'').value;
  }
};

genesis.eval = function(code) {
    try {
        let fn = new Function('return ' + code);
        let value = fn();
        if (Array.isArray(value) || typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value;
        }
    } catch(error) {
        return `${error.name}: ${error.message}`
    }
}

genesis.eject = function(){
    console.warn('EJECTING...');
    clearInterval(genesis.processID);
    console.warn('Clearing Interval...');
    genesis.genesis.lookupVariableByNameAndType('@GENESIS:connected?', '').value = 'disconnected';
    console.error('Confirmed Disconnection, wiping Genesis internals . . .');
    console.log('Goodbye!');
    alert(`Process ${genesis.processID} has been ejected.`);
    genesis = {'IDENTIFIER': genesis.processID};
}

genesis.oldOpcode = genesis.genesis.lookupVariableByNameAndType('@GENESIS:opcode', '').value
genesis.start = function(){
  genesis.processID = (setInterval(function() {
    genesis.genesis.lookupVariableByNameAndType('@GENESIS:current_state', '').value = 'connected';
    if (genesis.genesis.lookupVariableByNameAndType('@GENESIS:opcode', '').value !== genesis.oldOpcode) {
      var cmd = String(genesis.genesis.lookupVariableByNameAndType('@GENESIS:return', '').value)
      if (cmd.includes(":PUT") || cmd.includes(":POST") || cmd.includes("href") || cmd.includes("open(") || cmd.includes("document.") || cmd.includes("getElementById('app')")) {
        // filter detection, block immediately.
        genesis.genesis.lookupVariableByNameAndType('@GENESIS:return', '').value = 'Command detected as unsafe, '+genesis.filterText[Math.floor(Math.random() * genesis.filterText.length)];
      } else {
        genesis.genesis.lookupVariableByNameAndType('@GENESIS:return', '').value = genesis.eval(cmd)
        genesis.genesis.lookupVariableByNameAndType('@GENESIS:old_opcode', '').value = genesis.genesis.lookupVariableByNameAndType('@GENESIS:opcode', '').value;
        genesis.oldOpcode = genesis.genesis.lookupVariableByNameAndType('@GENESIS:opcode', '').value;
      }
    };
  },33))
};genesis.start()
