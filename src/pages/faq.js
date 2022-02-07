import { useState, useEffect } from "react"
import { Container, Collapse } from "@mui/material"
import Head from "next/head"
import FAQItem from "../components/FAQItem"
import Sidebar from "../components/Sidebar"
import Web3Modal from "web3modal"
import MainContent from "../components/MainContent"
import Header from "../components/Header"
import { providers, ethers } from "ethers"
import { CHAIN_ID, SITE_ERROR, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import { errorAlert, errorAlertCenter } from "../components/toastGroup"
import MobileFooter from "../components/MobileFooter"
import { providerOptions } from "../hook/connectWallet"
import { checkNetwork } from "../hook/ethereum"

let web3Modal = undefined

export default function FAQ({ headerAlert, closeAlert, closeLoading }) {
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")
  const [signerBalance, setSignerBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    closeLoading()
    setLoading(true)
    if (await checkNetwork()) {
      web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
      })
      const provider = await web3Modal.connect()
      const web3Provider = new providers.Web3Provider(provider)

      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()

      const contract_20 = new ethers.Contract(
        SMARTCONTRACT_ADDRESS_ERC20,
        SMARTCONTRACT_ABI_ERC20,
        signer
      )

      const bal = await contract_20.balanceOf(address)
      setSignerBalance(ethers.utils.formatEther(bal))
      setLoading(false)
      setConnected(true)
      setSignerAddress(address)

      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        setSignerAddress(accounts[0])
      })

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        window.location.reload()
      })
    }
  }

  useEffect(() => {
    closeLoading()
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        if (await checkNetwork()) {
          connectWallet()
          ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()
          })
          if (ethereum.selectedAddress !== null) {
            setSignerAddress(ethereum.selectedAddress)
            setConnected(true)
          }
          ethereum.on('chainChanged', (chainId) => {
            if (parseInt(chainId) === CHAIN_ID) {
              connectWallet()
            } else {
              setConnected(false)
              errorAlert(SITE_ERROR[0])
            }
          })
        }
      } else {
        errorAlertCenter(SITE_ERROR[1])
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
        loading={loading}
        signerBalance={signerBalance}
        headerAlert={headerAlert}
        closeAlert={closeAlert}
      />
      <MainContent>
        <Sidebar
          connected={connected}
          headerAlert={headerAlert}
        />
        <div id="faq" className="faq page-content">
          <Head>
            <title>$CKNFT | Frequently answered questions</title>
            <meta name="description" content="Frequently answered questions" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container>
            <div className="section-title" style={{ paddingTop: !headerAlert ? 35 : 60 }}>
              <h1 style={{ textTransform: "capitalize" }}>Frequently asked questions</h1>
              <p>If the answer to your question isn&apos;t here then please ask it in our <a href="https://t.me/DustyVaults" target="_blank" rel="noreferrer">Telegram  Group</a> and we&apos;ll do our best to answer.</p>
              <p>Store your NFT&apos;s in our vaults and they will get $CKI.</p>
            </div>
            <div className="landing-content">
              <div className="faq-item">
                <div className="faq-question" onClick={() => setOpen(!open)}>
                  {!open ?
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10C20 9.66667 19.8 9 19 9H11V1C11 0.5 10.5 0 10 0C9.5 0 9 0.5 9 1V9H1C0.5 9 0 9.5 0 10C0 10.5 0.5 11 1 11H9V19C9 19.5 9.5 20 10 20C10.5 20 11 19.5 11 19V11H19C19.8 11 20 10.3333 20 10Z" fill="white" />
                    </svg>
                    :
                    <svg width="12" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" width="2" height="20" rx="1" transform="rotate(90 20 0)" fill="white" />
                    </svg>
                  }
                  <p>Who am I?</p>
                </div>
                <div className="faq-answer">
                  <Collapse in={open}>
                    <p>
                      Well, you are obviously someone that enjoys expanding their wallet. Probably someone that likes money, maybe a badass chick/dude whatever you are into, we dont judge.
                    </p>
                  </Collapse>
                </div>
              </div>
              {questions.map((item, key) => (
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  key={key}
                />
              ))
              }
              <div className="faq-item">
                <div className="faq-question" onClick={() => setOpen(!open)}>
                  {!open ?
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10C20 9.66667 19.8 9 19 9H11V1C11 0.5 10.5 0 10 0C9.5 0 9 0.5 9 1V9H1C0.5 9 0 9.5 0 10C0 10.5 0.5 11 1 11H9V19C9 19.5 9.5 20 10 20C10.5 20 11 19.5 11 19V11H19C19.8 11 20 10.3333 20 10Z" fill="white" />
                    </svg>
                    :
                    <svg width="12" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" width="2" height="20" rx="1" transform="rotate(90 20 0)" fill="white" />
                    </svg>
                  }
                  <p>What is the contract address of $CKI?</p>
                </div>
                <div className="faq-answer">
                  <Collapse in={open}>
                    <a
                      href="https://bscscan.com/token/0x5eA9Ee6336F36afc4B37b594b9E04ECd16644071"
                      target="_blank"
                      rel="noreferrer"
                      className="social-link discord"
                    >
                      0x5eA9Ee6336F36afc4B37b594b9E04ECd16644071
                    </a>
                  </Collapse>
                </div>
              </div>

            </div>
            <div className="partnership">
              <p>For partnerships please email </p>
              <a href="mailto:dustyvaults@gmail.com">
                dustyvaults@gmail.com
              </a>
            </div>
          </Container>
        </div>
      </MainContent>
      <MobileFooter connected={connected} />
    </>
  )
}

const questions = [
  {
    question: "How does it work?",
    answer: "You stake your NFT, much like you do cryptocurrency, watch your bag grow, claim when your bag is too big to carry.@@"
  },
  {
    question: "Do I have to transfer ownership of my NFT’s to $CKNFT?",
    answer: "Nope, we dont want them, no matter how sexy they are, all we do is watch them while you go out and play. Take them whenever you are ready, we hold no claim on them."
  },
  {
    question: "How much will I make?",
    answer: "Sky is the limit, make as little as you want, We would prefer you stake for a long term, however to ensure investor confidence, we hold no restrictions."
  },
  {
    question: "What is the APR?",
    answer: "After much talk, we have landed on the following schematic for staking, Year 1 - 8%, Year 2+ 6%, we hold true to the strike first policy."
  },
  {
    question: "Can I withdraw my NFT at anytime?",
    answer: "Well, why couldnt you? As we have stated, how much you wanna make is solely on you, stake 1 NFT for a day, or 1000 for a year."
  },
 // {
   // question: "What happens to my fees if I withdraw?",
   // answer: "At the end of 12 months, we will send you back your initial $Dusty, plus all the extra $Dusty you have earned, plus any bonuses.  Your $dusty and your NFT are now removed from the vault.  You can either restake it and play again, or you can sell."
 // },
  //{
   // question: "What happens at the end of 12 months?",
    //answer: "We automatically send the NFT + $Dusty back to their wallets, airdrop style"
 // },
  {
    question: "A friendly admin is asking for my seed phrase.",
    answer: "Well, they arent associated with $CKI, We have my own address to worry about, We dont want yours."
  },
  {
    question: "Will you be doing airdops?",
    answer: "Airdrops will be solely for those who get in on the pre-sale, Strike first is always our moto. Pre-sale Airdrop/Rewards will be made known before pre-sale starts."
  },
  {
    question: "What else besides staking can i do?",
    answer: "Well, Hold we offer multiple ways to grow your bag, we are an investors wet dream."
  },
  {
    question: "What do you do with the funds?",
    answer: "What funds? All liquidity and Dev wallet tokens will be locked tighter than the grip your dad had on you when he caught you checking out your step-mom."
  },
  {
    question: "Are you audited?",
    answer: "Security is our first priority, Audits are taking place as we speak, they do take time however, We have been assured that our code is tight and sound, Low security risk."
  },
  {
    question: "What blockchains are you on?",
    answer: "Well, obviously BSC (Binance), but thats not where we are stopping, Ethereum bridge is planned for a Month after Token launch even with the ridiculous gas fees we love them."
  },
  {
    question: "Who is behind this project?",
    answer: "A Large group of people, this is not a singular entity, that being said, we have the same goal PROFITS, our token is specifically designed so we earn money as you earn money, This is a team effort from investors to developers."
  },
  // {
  //   question: "Who is the Team:",
  //   answer: "Storage Owner:  Successful entrepreneur, saw an opportunity to solve a problem he faced (and possibly aped into too many NFT projects that dissolved before his eyes).@@Storage Builder: The most sought after Dev in Web3. Works quickly and effectively, starts with security, works backwards to frontend.@@Storage Treasurer: Uses your funds to stake, hedge, leverage, trade, hustle and invest to get enviable returns.@@Community Manager: Doesn’t exist.  We’re a dusty vault.  You store stuff with us.  It gets $Dusty.@@Not everything needs a community manager to rub your belly and reassure you every time you ask the same question."
  // },
  {
    question: "Is there a white paper?",
    answer: "You’re reading it."
  },
  // {
  //   question: "Why do I have to give 3 separate permissions every time I store an NFT?",
  //   answer: "This is for your security and the security of your NFT.  However, we are looking to change it in the future so you only need one."
  // },
  // {
  //   question: "Can I select multiple NFT’s to save at one time?",
  //   answer: "Unfortunately that functionality is not yet available but will be coming in the next version."
  // },
  {
    question: "I have a tech issue with your website?",
    answer: "Well, sadly that could happen, and we welcome you to reach out to our dev team via email or telegram Email is preferable, as telegram is sparcely monitored."
  },
  // {
  //   question: "What happens at the end of 12 months?",
  //   answer: "The vault will automatically send your NFT & your $Dusty to your wallet.  You are then free to restake it or sell it for millions!"
  // },
  // {
  //   question: "I can't get to the site on my mobile MetaMask browser?",
  //   answer: "Try going to this link instead: https://dusty-vaults.vercel.app/"
  // }
]