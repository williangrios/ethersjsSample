
import { ethers } from 'ethers';
import { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [connected, setConnectedd] = useState(false);

  //contract
  const addressContract = '0xcdc444c418EFb2F9A4E427F35bc66E3cc4bE39b4'


  //abi
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newName",
          "type": "string"
        }
      ],
      "name": "setName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  async function handleSave(){
    const provider = returnProvider();
    const contractDeployed = new ethers.Contract(addressContract, abi, provider.getSigner());
    const resp = await contractDeployed.setName(name);
    console.log(resp)
    alert('Nome alterado com sucesso')
  }

  async function connectMetaMask (){
    if(typeof window.ethereum !== "undefined"){
        try
        {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            setConnectedd(true)
        }
        catch (error) {
            console.log(error);
            setConnectedd(false)
        }
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
    }
    else {
        setConnectedd(false)
      }
  }

  function returnProvider(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }

  async function getValue(){
    const provider = returnProvider();
    const contractDeployed = new ethers.Contract(addressContract, abi, provider);
    const name = await contractDeployed.name();
    alert (`O nome gravado é ${name}`)
  }

  return (
    <div className="App">
      <span>Grave seu nome na blockchain</span>
      {connected ? (
        <div className='divHorizontal'>
          <span>Digite seu nome abaixo para salvar na blockchain</span>
          <input type='text'value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSave}>Salvar na blockchain</button>
        </div>
        ) : (
          <button onClick={connectMetaMask}>Conecte sua carteira</button>
        )}
      <div className='divHorizontal'>
          <button onClick={getValue}>Busque o valor existente na blockchain</button>
       
        
      </div>
    </div>
  );
}

export default App;
