import b from "buffer";

export interface IDapp {
  name: string;
  url: string;
  description: string;
  icon: string;
  title?: string;
  isBSC: boolean;
  isEth: boolean;
}

export interface IDappCategory {
  name: string;
  displayIos: boolean;
  icon: string;
  color: string;
  iconColor: string;
  dapps: Array<IDapp>;
}

const categories = [
  {
    name: "Crypto in Africa",
    displayIos: false,
    icon: "./images/categories/africa.svg",
    color: "#E5F7DB",
    iconColor: "#A1D186",
    dapps: [
      {
        name: "HumanID bot",
        url: "https://t.me/HumaniqID_bot",
        description: "Pass HumanID and get $1 for a lunch in Dar-Es-Salaam",
        icon: "./images/dapps/humaniq-bot.svg",
        title: "@humaniqID_bot",
        isBSC: true,
        isEth: false,
      },
      {
        name: "Wealth in 7 steps",
        url: "https://t.me/ed_humaniq_bot",
        description: "Courses that changed the lives of millions of people",
        icon: "./images/dapps/education-bot.png",
        title: "@ed_humaniq_bot",
        isBSC: true,
        isEth: false,
      },
      {
        name: "Savy",
        url: "https://savy.finance/",
        description: "Make your first crypto capital  and use it as colleteral",
        icon: "./images/dapps/savy.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "PancakeSwap",
        url: "https://pancakeswap.finance/",
        description: "Swap crypto on Binance Smart Chain. Buy WBGL here",
        icon: "./images/dapps/pancake.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "$1 for lunch",
        url: "https://getlunch.humaniq.com/",
        description: "Develop your HumanID and grab more lunches!",
        icon: "./images/dapps/one-dollar.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "HumanID",
        url: "https://idapp.humaniq.com/",
        description: "Update your HumanID by connecting your wallet",
        icon: "./images/dapps/humaniq-id.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "Humaniq DAO",
        url: "https://rhetorical-bulb-a1b.notion.site/Humaniq-DAO-3311d4d6baa94b0894042d98542498d4",
        description: "Join the project building and earn crypto",
        icon: "./images/dapps/humaniq-dao.png",
        isBSC: true,
        isEth: true,
      },
      {
        name: "BSCscan",
        url: "https://bscscan.com/",
        description: "Explore the Binance Smart Chain blockchain",
        icon: "./images/dapps/bscscan.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "Etherscan",
        url: "https://etherscan.io/",
        description: "Explore the Ethereum Mainnet blockchain",
        icon: "./images/dapps/etherscan.svg",
        isBSC: false,
        isEth: true,
      },
    ],
  },
  {
    name: "Job in crypto",
    displayIos: false,
    icon: "./images/categories/crypto.svg",
    color: "#E5F7DB",
    iconColor: "#A1D186",
    dapps: [
      {
        name: "Humaniq DAO",
        url: "https://rhetorical-bulb-a1b.notion.site/Humaniq-DAO-3311d4d6baa94b0894042d98542498d4",
        description: "Join the project building and earn crypto",
        icon: "./images/dapps/humaniq-dao.png",
        isBSC: true,
        isEth: true,
      },
    ],
  },
  {
    name: "Exchange crypto",
    displayIos: false,
    icon: "./images/categories/arrows.svg",
    color: "#D8F7F7",
    iconColor: "#76D3DF",
    dapps: [
      {
        name: "PancakeSwap",
        url: "https://pancakeswap.finance/",
        description: "Swap crypto on Binance Smart Chain. Buy WBGL here",
        icon: "./images/dapps/pancake.svg",
        isBSC: true,
        isEth: false,
      },
      {
        name: "Uniswap",
        url: "https://uniswap.exchange/",
        description: "Swap crypto on Ethereum. Buy WBGL here",
        icon: "./images/dapps/uniswap.svg",
        isBSC: false,
        isEth: true,
      },
      {
        name: "Localbitcoins",
        url: "https://localbitcoins.com/",
        description: "Exchange your crypto to fiat and back with other users",
        icon: "./images/dapps/localbitcoins.svg",
        isBSC: true,
        isEth: true,
      },
    ],
  },
  {
    name: "Crypto prices",
    displayIos: false,
    icon: "./images/categories/chart.svg",
    color: "#D8F7F7",
    iconColor: "#76D3DF",
    dapps: [
      {
        name: "CoinMarketCap",
        url: "https://coinmarketcap.com/",
        description: "Track the prices and rankings of crypto assets",
        icon: "./images/dapps/coinmarketcap.svg",
        isBSC: true,
        isEth: true,
      },
      {
        name: "CoinGecko",
        url: "https://www.coingecko.com/",
        description: "Track the prices and rankings of crypto assets",
        icon: "./images/dapps/coingecko.svg",
        isBSC: true,
        isEth: true,
      },
      {
        name: "DeFi Pulse",
        url: "https://www.defipulse.com/",
        description: "Track the prices and rankings of crypto assets",
        icon: "./images/dapps/defipulse.svg",
        isBSC: true,
        isEth: true,
      },
    ],
  },
  {
    name: "Create and sell NFT",
    displayIos: false,
    icon: "./images/categories/art.svg",
    color: "#D8F7F7",
    iconColor: "#76D3DF",
    dapps: [
      {
        name: "OpenSea",
        url: "https://opensea.io/",
        description: "Discover, collect, and sell extraordinary NFTs",
        icon: "./images/dapps/opensea.svg",
        isBSC: true,
        isEth: true,
      },
      {
        name: "Rarible",
        url: "https://rarible.com/",
        description: "NFT community-owned marketplace and issuance platform",
        icon: "./images/dapps/rarible.svg",
        isBSC: true,
        isEth: true,
      },
    ],
  },
];

// hide any of the above on iOS when displayIos is false
const filtered = categories;

export default filtered;
