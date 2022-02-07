import { Container } from "@mui/material"
import { GotoButton } from "./styleHook"
import { useRouter } from "next/router"
import { errorAlert } from "./toastGroup"
import { useEffect } from "react"

export default function HeroBanner({
  connected,
  closeLoading,
  ...props
}) {
  const router = useRouter()
  const goto = () => {
    if (connected) {
      router.push("/bank")
    } else {
      errorAlert("Please connect wallet!")
    }
  }
  useEffect(() => {
    closeLoading()
    // eslint-disable-next-line
  }, [])
  return (
    <div className="hero-banner">
      {/* eslint-disable-next-line */}
      <img
        src="./home-banner.webp"
        alt=""
      />
      <Container>
        <h1>Welcome to NFT Bank</h1>
        <p></p>
        <GotoButton onClick={goto}>
          Goto Staking
        </GotoButton>
      </Container>
    </div>
  )
}