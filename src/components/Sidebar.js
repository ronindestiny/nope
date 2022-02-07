import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Skeleton } from "@mui/material"
import { PANCAKE_LINK } from "../../config"
import { importToken } from "../hook/ethereum"
import { SidebarButton } from "./styleHook"
import Moralis from "moralis"

export default function Sidebar({ connected, headerAlert, ...props }) {
  const router = useRouter()
  const goto = (url) => {
    router.push(url)
  }
  const [price, setPrice] = useState(1)
  const [loading, setLoading] = useState(false)
  const getPrice = async () => {
    const options = {
      address: "00x5eA9Ee6336F36afc4B37b594b9E04ECd16644071",
      chain: "bsc",
      exchange: "PancakeSwapv2"
    }
    const price = await Moralis.Web3API.token.getTokenPrice(options)
    setPrice(price.usdPrice, "price")
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const interval_id = setInterval(getPrice, 10000)
    return () => {
      clearInterval(interval_id)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-content" style={{ paddingTop: !headerAlert ? 70 : 95 }}>
        <ul>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/")}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_32_94)">
                  <path d="M16.9231 9.23077V15C16.9231 15.2083 16.8469 15.3886 16.6947 15.5409C16.5424 15.6931 16.3622 15.7692 16.1538 15.7692H11.5384V11.1538H8.46153V15.7692H3.84615C3.63782 15.7692 3.45753 15.6931 3.30529 15.5409C3.15304 15.3886 3.07692 15.2083 3.07692 15V9.23077C3.07692 9.22276 3.07892 9.21074 3.08293 9.19471C3.08694 9.17869 3.08894 9.16667 3.08894 9.15865L9.99999 3.46154L16.911 9.15865C16.9191 9.17468 16.9231 9.19872 16.9231 9.23077ZM19.6033 8.40144L18.8582 9.29086C18.7941 9.36298 18.7099 9.40705 18.6057 9.42308H18.5697C18.4655 9.42308 18.3814 9.39503 18.3173 9.33894L9.99999 2.40385L1.68269 9.33894C1.58654 9.40304 1.49038 9.43109 1.39423 9.42308C1.29006 9.40705 1.20593 9.36298 1.14183 9.29086L0.396635 8.40144C0.332532 8.32131 0.304488 8.22716 0.3125 8.11899C0.320513 8.01082 0.364584 7.92468 0.444712 7.86058L9.08653 0.661057C9.34294 0.452723 9.64743 0.348557 9.99999 0.348557C10.3526 0.348557 10.657 0.452723 10.9134 0.661057L13.8461 3.11298V0.76923C13.8461 0.65705 13.8822 0.564903 13.9543 0.492787C14.0264 0.420672 14.1186 0.384614 14.2308 0.384614H16.5384C16.6506 0.384614 16.7428 0.420672 16.8149 0.492787C16.887 0.564903 16.9231 0.65705 16.9231 0.76923V5.67308L19.5553 7.86058C19.6354 7.92468 19.6795 8.01082 19.6875 8.11899C19.6955 8.22716 19.6674 8.32131 19.6033 8.40144Z" fill="#DFAE00" />
                </g>
                <defs>
                  <clipPath id="clip0_32_94">
                    <rect width="20" height="15.7692" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Home</span>
            </SidebarButton>
          </li>
          {connected &&
            <li>
              <SidebarButton fullWidth onClick={() => goto("/nfts-list")}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66666 6.75V9.25C4.66666 9.66422 4.33087 10 3.91666 10H0.75C0.335781 10 0 9.66422 0 9.25V6.75C0 6.33578 0.335781 6 0.75 6H3.91666C4.33087 6 4.66666 6.33578 4.66666 6.75ZM0 11.75V14.25C0 14.6642 0.335781 15 0.75 15H3.91666C4.33087 15 4.66666 14.6642 4.66666 14.25V11.75C4.66666 11.3358 4.33087 11 3.91666 11H0.75C0.335781 11 0 11.3358 0 11.75ZM3.91666 1H0.75C0.335781 1 0 1.33578 0 1.75V4.25C0 4.66422 0.335781 5 0.75 5H3.91666C4.33087 5 4.66666 4.66422 4.66666 4.25V1.75C4.66666 1.33578 4.33087 1 3.91666 1ZM6.41666 15H15.25C15.6642 15 16 14.6642 16 14.25V11.75C16 11.3358 15.6642 11 15.25 11H6.41666C6.00244 11 5.66666 11.3358 5.66666 11.75V14.25C5.66666 14.6642 6.00244 15 6.41666 15ZM5.66666 1.75V4.25C5.66666 4.66422 6.00244 5 6.41666 5H15.25C15.6642 5 16 4.66422 16 4.25V1.75C16 1.33578 15.6642 1 15.25 1H6.41666C6.00244 1 5.66666 1.33578 5.66666 1.75ZM6.41666 10H15.25C15.6642 10 16 9.66422 16 9.25V6.75C16 6.33578 15.6642 6 15.25 6H6.41666C6.00244 6 5.66666 6.33578 5.66666 6.75V9.25C5.66666 9.66422 6.00244 10 6.41666 10Z" fill="#DFAE00" />
                </svg>
                <span>My NFTs</span>
              </SidebarButton>
            </li>
          }
          <li>
            <SidebarButton fullWidth onClick={() => goto("/faq")}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 8C15.75 12.2812 12.2799 15.75 8 15.75C3.72009 15.75 0.25 12.2812 0.25 8C0.25 3.72134 3.72009 0.25 8 0.25C12.2799 0.25 15.75 3.72134 15.75 8ZM8.20797 2.8125C6.50494 2.8125 5.41875 3.52991 4.56581 4.80494C4.45531 4.97012 4.49228 5.19291 4.65066 5.313L5.735 6.13519C5.89766 6.25853 6.12941 6.22919 6.25578 6.06887C6.81403 5.36081 7.19681 4.95022 8.0465 4.95022C8.68491 4.95022 9.47456 5.36109 9.47456 5.98016C9.47456 6.44816 9.08822 6.6885 8.45788 7.04191C7.72275 7.454 6.75 7.96691 6.75 9.25V9.375C6.75 9.58209 6.91791 9.75 7.125 9.75H8.875C9.08209 9.75 9.25 9.58209 9.25 9.375V9.33334C9.25 8.44391 11.8496 8.40687 11.8496 6C11.8496 4.18744 9.96941 2.8125 8.20797 2.8125ZM8 10.5625C7.20734 10.5625 6.5625 11.2073 6.5625 12C6.5625 12.7926 7.20734 13.4375 8 13.4375C8.79266 13.4375 9.4375 12.7926 9.4375 12C9.4375 11.2073 8.79266 10.5625 8 10.5625Z" fill="#DFAE00" />
              </svg>
              <span>F.A.Q</span>
            </SidebarButton>
          </li>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/partners")}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.44445 8C9.44445 8 6.0939 10.93 5.14446 11.7956C4.40946 12.4639 5.63334 13.7389 6.33057 13.1578C8.18223 11.6106 9.93779 10.4633 9.93779 10.4633L10.1417 10.7556C9.41445 11.1944 7.53446 12.3433 6.5589 13.2211C5.82334 13.8822 6.98501 15.195 7.72168 14.535C8.7339 13.6272 11.0522 11.9989 11.0522 11.9989L11.2567 12.2122C10.6567 12.5894 9.71668 13.29 8.48723 14.4111C7.74723 15.0861 8.83112 15.7917 9.46723 15.2633C11.1983 13.8267 11.2628 12.8283 13.1678 12.0133C16.075 10.77 9.44445 8 9.44445 8Z" fill="#EF9645" />
                <path d="M16.655 2.90889C17.1445 2.66556 17.5733 2.98889 17.825 3.49389C18.0739 4 19.2317 6.28 19.4656 6.75444C19.7017 7.22778 19.5717 7.92278 19.0661 8.17278C18.56 8.42444 17.825 8.75833 17.3483 9.56833C17.09 10.0094 16.0172 11.1722 13.11 12.4178C11.2061 13.23 9.68502 14.6056 9.07613 15.0844C8.5839 15.4722 7.59113 14.7306 8.33002 14.0567C9.56002 12.9344 10.5 12.2339 11.0995 11.8578L10.895 11.6433C10.895 11.6433 8.46113 13.3411 7.42946 14.2267C6.7289 14.8294 5.79724 13.6972 6.53335 13.0367C7.50946 12.1589 9.25668 10.84 9.9839 10.4011L9.78057 10.1072C9.78057 10.1072 7.87502 11.3467 6.02224 12.8961C5.4039 13.4128 4.44057 12.2522 5.17502 11.5828C6.12502 10.7189 7.97668 9.17 9.11557 8.52778L9.00668 8.18944C9.00668 8.18944 7.2189 9.19222 5.67557 10.6861C5.12335 11.22 4.02335 10.2317 4.82835 9.41222C6.75168 7.45555 9.24946 6.29611 9.9139 5.84944C10.8061 5.24944 11.2756 4.875 10.8061 4.66444C10.0983 4.34611 8.91946 3.23 8.46724 2.32555C7.88224 1.15555 8.71168 0.231111 9.63668 1.15555C10.2217 1.74055 11.3917 2.91 12.5606 2.91C14.1322 2.91 14.3728 3.495 15.485 3.495C16.0706 3.49389 16.655 2.90889 16.655 2.90889" fill="#FFCC4D" />
                <path d="M13.9156 6.42611C13.73 6.42667 13.1161 6.34278 12.4245 6.02333C11.8283 5.74889 11.3661 5.25111 10.9817 4.83333C11.0033 4.92278 10.9456 5.03 10.8245 5.15555C11.2028 5.59555 11.7817 6.09778 12.2989 6.34778C12.9 6.63944 13.585 6.78667 13.8939 6.77389C14.2117 6.76055 14.1078 6.42833 13.9156 6.42611V6.42611ZM15.1195 11.1928C13.8617 10.6072 12.8628 10.1183 14.5783 10.8261C15.2878 11.1178 16.3528 9.68167 15.3089 9.20555C13.2078 8.24667 6.66668 4.66667 6.66668 4.66667C6.66668 4.66667 3.1289 8.79833 3.56668 9.06333C4.00501 9.32667 4.18779 11.2017 6.7139 12.8511C9.10168 14.4111 10.5889 15.0817 11.1478 15.3611C12.3183 15.9461 13.0795 14.4289 12.1661 14.0211C10.5922 13.3178 10.6472 13.275 12.9539 14.2333C13.8078 14.5889 14.5256 12.9833 13.6233 12.5772C12.2778 11.9722 12.1567 11.8989 14.3117 12.87C15.1089 13.2272 16.0189 11.6122 15.1195 11.1928V11.1928Z" fill="#EF9645" />
                <path d="M3.9389 3.15444C3.82587 3.08607 3.70045 3.04067 3.56984 3.02084C3.43923 3.001 3.30598 3.00713 3.17774 3.03887C3.0495 3.07061 2.92879 3.12733 2.8225 3.20579C2.71621 3.28425 2.62645 3.38291 2.55835 3.49611C2.26668 3.98 0.987238 6.09778 0.71446 6.55167C0.441127 7.005 0.512238 7.70667 0.995571 7.99833C1.4789 8.29056 2.35502 8.81889 2.79335 9.08278C3.23168 9.34778 5.02168 11.57 7.60557 13.1267C10.1878 14.6867 11.1422 14.9522 11.7233 15.1806C12.3067 15.4083 13.0772 14.2456 12.1639 13.8383C10.5878 13.1339 9.47724 12.4839 8.9089 12.0578L9.08557 11.7328C9.08557 11.7328 10.6617 12.9106 12.9672 13.8706C13.8211 14.2261 14.5172 12.8961 13.6156 12.4889C12.2695 11.8839 10.6089 10.8811 9.92057 10.3833L10.1128 10.0661C10.1128 10.0661 12.305 11.4517 14.46 12.4228C15.255 12.7811 15.9222 11.4306 15.0228 11.0106C13.7672 10.425 11.9961 9.36889 10.915 8.63444L11.1028 8.35667C11.1028 8.35667 13.1111 9.77389 14.8278 10.4806C15.5372 10.7739 16.3722 9.44667 15.3272 8.96889C13.2278 8.01056 10.8472 6.33333 10.2228 5.83333C9.71279 5.42389 9.56668 4.49278 10.8072 4.07889C12.5617 3.49389 13.1467 2.32444 13.1467 1.73944C13.1467 0.912222 12.3822 0.547222 11.9778 1.15444C10.8072 2.90889 10.2189 2.31111 9.05391 2.90889C7.65724 3.62611 6.01724 4.38778 5.06557 3.81333C4.65835 3.56833 3.9389 3.15444 3.9389 3.15444" fill="#FFDC5D" />
                <path d="M10.5267 4.51167L13.5411 3.005C13.219 2.93822 12.8906 2.90619 12.5617 2.90944C11.3928 2.90944 10.2228 1.74 9.6378 1.155C8.7128 0.230555 7.88335 1.155 8.46835 2.325C8.86558 3.11833 9.82002 4.07389 10.5267 4.51167V4.51167Z" fill="#FFCC4D" />
              </svg>
              <span>Partners</span>
            </SidebarButton>
          </li>
        </ul>
        <div className="token-info">
          <a
            href="https://twitter.com/cobrakaiinu"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <div className="social-icon">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_41_2)">
                  <path d="M19.5991 1.94839C18.8779 2.26816 18.103 2.48427 17.2897 2.5815C18.1199 2.08389 18.7574 1.29591 19.0576 0.357036C18.2683 0.825389 17.4048 1.15537 16.5044 1.33273C15.7709 0.551333 14.726 0.0629883 13.5695 0.0629883C11.349 0.0629883 9.54861 1.86326 9.54861 4.08366C9.54861 4.39884 9.58421 4.70567 9.65273 5.00002C6.3111 4.83229 3.34842 3.2316 1.36526 0.798988C1.01923 1.39283 0.820957 2.08358 0.820957 2.82035C0.820957 4.21533 1.53085 5.44595 2.60967 6.16703C1.97116 6.14703 1.3467 5.97457 0.788422 5.66406C0.788192 5.6809 0.788192 5.69774 0.788192 5.71466C0.788192 7.66276 2.17414 9.28787 4.01345 9.65725C3.42137 9.81827 2.80031 9.84184 2.19772 9.72615C2.70934 11.3235 4.19428 12.486 5.95367 12.5185C4.57759 13.5968 2.84385 14.2397 0.960134 14.2397C0.635541 14.2397 0.315541 14.2206 0.000976562 14.1835C1.78034 15.3243 3.8938 15.99 6.16442 15.99C13.5602 15.99 17.6043 9.86318 17.6043 4.54995C17.6043 4.37556 17.6005 4.20217 17.5927 4.02976C18.3799 3.46072 19.0593 2.7559 19.5991 1.94839" fill="#fff" />
                </g>
                <defs>
                  <clipPath id="clip0_41_2">
                    <rect width="19.6" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>
              twitter
            </span>
          </a>
          <a
            href="https://t.me/DustyVaults"
            target="_blank"
            rel="noreferrer"
            className="social-link discord"
          >
            <div className="social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_45_10)">
                  <path d="M22.0517 2.12925L0.788779 10.3711C-0.0668777 10.7549 -0.356284 11.5235 0.581966 11.9407L6.03681 13.6831L19.2259 5.48986C19.9461 4.9755 20.6833 5.11266 20.0489 5.67849L8.72125 15.9879L8.36542 20.3509C8.695 21.0245 9.29847 21.0277 9.6834 20.6928L12.8174 17.7121L18.1848 21.7521C19.4314 22.494 20.1098 22.0152 20.378 20.6555L23.8985 3.89911C24.2641 2.22544 23.6407 1.488 22.0517 2.12925V2.12925Z" fill="#fff" />
                </g>
                <defs>
                  <clipPath id="clip0_45_10">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span>
              telegram
            </span>
          </a>
          <div>
            <h5>$CKI</h5>
            <p>
              {loading ?
                <Skeleton width={70} sx={{ bgcolor: '#ffffff20' }} height={32} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />
                :
                <>$ {parseFloat(price).toFixed(3)}</>
              }
            </p>
          </div>
          <a
            href= "https://pancakeswap.finance/swap?outputCurrency=0x5eA9Ee6336F36afc4B37b594b9E04ECd16644071"
            target="_blank"
            rel="noreferrer"
            className="buy-link"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 5 }}>
              <path d="M11.6667 1.66663C13.1917 1.6659 14.6708 2.18802 15.8574 3.1459C17.044 4.10378 17.8664 5.43952 18.1873 6.93035C18.5082 8.42118 18.3083 9.97697 17.6209 11.3382C16.9336 12.6995 15.8003 13.784 14.4101 14.4108C13.9657 15.3932 13.2897 16.2532 12.4399 16.917C11.5902 17.5808 10.5922 18.0285 9.53141 18.2219C8.47064 18.4153 7.3788 18.3485 6.34952 18.0272C5.32024 17.7059 4.38425 17.1398 3.62181 16.3774C2.85937 15.6149 2.29325 14.6789 1.97198 13.6497C1.65072 12.6204 1.5839 11.5285 1.77727 10.4678C1.97063 9.407 2.41841 8.40896 3.08219 7.55924C3.74598 6.70953 4.60596 6.0335 5.58838 5.58913C6.11684 4.41987 6.97137 3.42788 8.04951 2.73213C9.12764 2.03639 10.3836 1.66643 11.6667 1.66663V1.66663ZM9.16672 7.49996H7.50005V8.33329C6.95848 8.33198 6.43768 8.5416 6.04804 8.91775C5.6584 9.29389 5.43054 9.80697 5.41277 10.3483C5.395 10.8895 5.58871 11.4165 5.95284 11.8174C6.31697 12.2182 6.82289 12.4616 7.36339 12.4958L7.50005 12.5H9.16672L9.24172 12.5066C9.33779 12.524 9.4247 12.5746 9.48728 12.6495C9.54986 12.7245 9.58415 12.819 9.58415 12.9166C9.58415 13.0143 9.54986 13.1088 9.48728 13.1837C9.4247 13.2587 9.33779 13.3092 9.24172 13.3266L9.16672 13.3333H5.83339V15H7.50005V15.8333H9.16672V15C9.70829 15.0013 10.2291 14.7917 10.6187 14.4155C11.0084 14.0394 11.2362 13.5263 11.254 12.985C11.2718 12.4437 11.0781 11.9168 10.7139 11.5159C10.3498 11.115 9.84388 10.8717 9.30338 10.8375L9.16672 10.8333H7.50005L7.42505 10.8266C7.32898 10.8092 7.24207 10.7587 7.17949 10.6837C7.11691 10.6088 7.08262 10.5143 7.08262 10.4166C7.08262 10.319 7.11691 10.2245 7.17949 10.1495C7.24207 10.0746 7.32898 10.024 7.42505 10.0066L7.50005 9.99996H10.8334V8.33329H9.16672V7.49996ZM11.6667 3.33329C10.9606 3.33247 10.2624 3.48158 9.61824 3.77076C8.97407 4.05994 8.39866 4.48261 7.93005 5.01079C8.87194 4.95362 9.81523 5.09704 10.6976 5.43158C11.5799 5.76612 12.3811 6.28416 13.0483 6.95144C13.7155 7.61872 14.2335 8.42004 14.5679 9.3024C14.9024 10.1848 15.0457 11.1281 14.9884 12.07C15.7461 11.3963 16.2811 10.5083 16.5224 9.52355C16.7637 8.53886 16.7 7.50406 16.3397 6.55639C15.9794 5.60873 15.3396 4.79299 14.505 4.21736C13.6704 3.64173 12.6806 3.33341 11.6667 3.33329V3.33329Z" fill="#fecc1e" />
            </svg>
            <span>BUY <span className="token-name">$CKI</span></span>
          </a>
          <button className="add-token" onClick={() => importToken()}>
            <span>Add $CKI to MetaMask</span>
          </button>
        </div>
      </div>
    </div>
  )
}

