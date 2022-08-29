  // const reachFunctions = {
  //   connect: async (secret, mnemonic = false) => {
  //     let result = ""
  //     try {
  //       const account = mnemonic ? await reach.newAccountFromMnemonic(secret) : await reach.getDefaultAccount();
  //       setAccount(account);
  //       setView(views.DEPLOY_OR_ATTACH);
  //       result = 'success';
  //     } catch (error) {
  //       result = 'failed';
  //     }
  //     return result;
  //   },

  //   setAsDeployer: (deployer = true) => {
  //     if (deployer) {
  //       setView(views.SET_TOKEN_INFO);
  //     }
  //     else {
  //       setView(views.PASTE_CONTRACT_INFO);
  //     }
  //   },

  //   deploy: async () => {
  //     const contract = account.contract(backend);
  //     backend.Deployer(contract, Deployer);
  //     setView(views.DEPLOYING);
  //     const ctcInfo = JSON.stringify(await contract.getInfo(), null, 2)
  //     setContractInfo(ctcInfo);
  //     setView(views.WAIT_FOR_ATTACHER)
  //   },

  //   attach: (contractInfo) => {
  //     const contract = account.contract(backend, JSON.parse(contractInfo));
  //     backend.Attacher(contract, Attacher)
  //     setView(views.ATTACHING)
  //   }
  // }

  //Participant Objects
  // const Common = {
  //   random: () => reach.hasRandom.random(),

  //   test: () => setView(views.TEST_VIEW)
  // }

  // const Deployer = {
  //   ...Common
  // }

  // const Attacher = {
  //   ...Common
  // }