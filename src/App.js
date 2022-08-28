import { useState } from 'react';
import * as backend from './reach/build/index.main.mjs'
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { views, Loader } from './utils/';
// import { ConnectAccount, PasteContractInfo, SelectRole, TestView, WaitForAttacher } from './screens';
import './App.css';

const reach = loadStdlib('ALGO');
reach.setWalletFallback(reach.walletFallback({ providerEnv: 'TestNet', MyAlgoConnect }));
const fmt = (x) => reach.formatCurrency(x, 4);

function App() {
  const [account, setAccount] = useState({})
  // const [view, setView] = useState(views.CONNECT_ACCOUNT)
  const [contractInfo, setContractInfo] = useState()
  const [turn, setTurn] = useState('x');
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [isDraw, setDraw] = useState(false);
  const [manageView, getSetView] = useState('player1');
  const [firstPlayer, setFirstPlayer] = useState('');
  const [secondPlayer, setSecondPlayer] = useState('');
  const [wager, setWager] = useState('');


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

  // Frontend Logic For Game ****************** //

  /** get wallet details */
  const connectWallet = async () => {
    try {
      var acc = await reach.getDefaultAccount();
      // const balAtomic = await reach.balanceOf(acc);
      // const bal = reach.formatCurrency(balAtomic, 4);
      console.log(acc, 'something')
      return acc 
    } catch (error) {
      console.log(error)
    }
  }

    /** deploy the contract as player one */
  // const deployContract = async () => {
  //   const contract = account.contract(backend);
  //     backend.Deployer(contract, Deployer);
  //     setView(views.DEPLOYING);
  //     const ctcInfo = JSON.stringify(await contract.getInfo(), null, 2)
  //     setContractInfo(ctcInfo);
  //     setView(views.WAIT_FOR_ATTACHER)
  // }

    /** dattach to contract as player two */
  // const attachContract = async () => {
  //   const contract = account.contract(backend, JSON.parse(contractInfo));
  //   backend.Attacher(contract, Attacher)
  //   setView(views.ATTACHING)
  // }
  const checkDraw = () => {
    const checkfill = cells.filter(f => f != null);

    if ((checkfill.length === 8) && (winner === null)) {
      setDraw(true)
    }
  }

  const handleSubmit = async (arg) => {
    const result = await connectWallet();
    console.log(result)
    if (arg === '1') {
      if (firstPlayer === '') {
        alert('Enter name')
        return
      }
      if (wager === '') {
        alert('Enter wager')
        return
      }

      handlePlayer("1")
   
    
     
    }
    if (arg === '2') {
      if (secondPlayer === '') {
        alert('Enter name')
        return
      }
      const bal= connectWallet()
      if(bal){
        //continue;
      }
      handlePlayer("2")
    }

  }
  const handlePlayer = (arg) => {
    const result = connectWallet();
    if (arg === '1') {
      console.log('player 1 balance: ')
      getSetView('player2')
    } else if (arg === '2') {
      console.log('player 2 balance: ')
      getSetView('game')
    }
  }

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          // do nothing
          // console.log('it is a draw')
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        } else {

        }
      });
    }
  };

  const handleClick = (num) => {
    let squares = [...cells];
    if (cells[num] !== null) {
      alert('already clicked');
      return;
    }

    if (winner != null) {
      alert('Game Over, Restart')
      return
    }


    if (turn === 'x') {
      squares[num] = 'x';
      setTurn('o');
    } else {
      squares[num] = 'o';
      setTurn('x');
    }
    checkForWinner(squares);
    setCells(squares);
    checkDraw()
  };

  const handleRestart = () => {
    setCells(Array(9).fill(null));
    setDraw(false)
    setWinner(null);

  };





  const Welcome = () => {
    return (
      <div>
        <h3>Welcome to Player One</h3>
        <p>Please Introduce yourself</p>
        <input class="text" name="name" placeholder='Enter your name' type='text' onChange={(e) => setFirstPlayer(e.target.value)} value={firstPlayer} />
        <input class="text" name="wager" placeholder='Enter wager' type='number' onChange={(e) => setWager(e.target.value)} value={wager} />
        <button className='button' onClick={() => handleSubmit('1')}>Access Game</button>

        <p className='text-info'>Enter your name and select the wager amount you are willing to risk for this game. You won't be able to continue playing the game if your wallet balance is less than your wager</p>

      </div>
    )
  }

  const AddParticipant = () => {
    return (
      <div>
        <h1>Welcome to Player Two</h1>
        <p>Please Introduce yourself</p>
        <input class="text" name="name" placeholder='Enter your name' type='text' onChange={(e) => setSecondPlayer(e.target.value)} value={secondPlayer} />
        <input class="text" disabled name="wager" placeholder='Enter wager' type='number' onChange={(e) => setWager(e.target.value)} value={wager} />
        <button className='button' onClick={() => handleSubmit("2")}>Access Game</button>
        <div>
          <p className='text-info'>Enter your name and accept the wager amount you are willing to risk for this game. You won't be able to continue playing the game if your wallet balance is less than your wager</p>
        </div>
      </div>
    )
  }

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  const PlayGame = () => {
    return (
      <div className='container'>
        <div> <p className='text'>Turn: {`${turn === 'x' ? firstPlayer : secondPlayer}`} </p></div>
        <div className='names'><p className={`${turn === 'x' ? 'activeClass' : null}`}>{firstPlayer}</p><p className={`${turn === 'x' ? null : 'activeClass'}`}>{secondPlayer}</p></div>
        <table>

          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>

        {isDraw && (
          <>
            <p>A draw, want to play again ?</p>
            <button className='button' onClick={() => handleRestart()}>Play Again</button>
          </>
        )}
        {winner && (
          <>
            <p>{`${winner === 'x' ? firstPlayer : secondPlayer} is the winner`}</p>
            <button className='button' onClick={() => handleRestart()}>Play Again</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <div className='top'>
        <h1>Umoja - Tic Tac Toe </h1>
      </div>
      <header className="App-header">
        <div>
          {manageView === 'player1' && (Welcome())}
          {manageView === 'player2' && (AddParticipant())}
          {manageView === 'game' && (PlayGame())}
        </div>
        {/* {
          view === views.CONNECT_ACCOUNT &&
          <ConnectAccount connect={reachFunctions.connect} />
        }

        {
          view === views.DEPLOY_OR_ATTACH &&
          <SelectRole deploy={reachFunctions.deploy} attach={() => setView(views.PASTE_CONTRACT_INFO)} />
        }

        {
          (view === views.DEPLOYING || view === views.ATTACHING) &&
          <Loader />
        }

        {
          view === views.PASTE_CONTRACT_INFO &&
          <PasteContractInfo attach={reachFunctions.attach} />
        }

        {
          view === views.WAIT_FOR_ATTACHER &&
          <WaitForAttacher info={contractInfo} />
        }

        {
          view === views.TEST_VIEW &&
          <TestView />
        } */}
      </header>
    </div>
  );
}

export default App;
