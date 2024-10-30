import { TAssetName } from "@/types/asset";
import { TProtocolName } from "@/types/protocol";

export const assetNameToImage = (name: TAssetName | string, protocolName?: TProtocolName | string) => {
  switch (protocolName) {
    case TProtocolName.YEARN_V3:
      return "/assets/icons/tokens/yearn-v3.png";
    case TProtocolName.PENDLE:
      return "/assets/icons/tokens/pendle.png";
    case TProtocolName.BEEFY:
      return "/assets/icons/tokens/beefy.png";
    case TProtocolName.HARVEST_FINANCE:
      return "/assets/icons/tokens/harvest.png";
  }

  console.log("name is", name);
  switch (name.toLowerCase()) {
    case TAssetName.WETH:
      return "/assets/icons/tokens/weth.png";
    case TAssetName.WSTETH:
      return "/assets/icons/tokens/wsteth.png";
    case TAssetName.ETH:
      return "/assets/icons/tokens/eth.png";
    case TAssetName.EZETH:
      return "/assets/icons/tokens/ezeth.png";
    case TAssetName.RSETH:
      return "/assets/icons/tokens/rseth.png";
    case TAssetName.CBETH:
      return "/assets/icons/tokens/cbeth.png";
    case TAssetName.USDC:
      return "/assets/icons/tokens/usdc.png";
    case TAssetName.USDCE:
      return "/assets/icons/tokens/usdc.png";
    case TAssetName.DAI:
      return "/assets/icons/tokens/dai.png";
    case TAssetName.USDT:
      return "/assets/icons/tokens/usdt.png";
    case TAssetName.WBTC:
      return "/assets/icons/tokens/wbtc.png";
    case TAssetName.ARB:
      return "/assets/icons/chains/arbitrum.png";
    case TAssetName.DEGEN:
      return "/assets/icons/tokens/degen.png";
    case TAssetName.RETH:
      return "/assets/icons/tokens/reth.png";
    case TAssetName.FRAX:
      return "/assets/icons/tokens/frax.png";
    case TAssetName.FRXETH:
      return "/assets/icons/tokens/frxeth.webp";
    case TAssetName.LINK:
      return "/assets/icons/tokens/link.png";
    case TAssetName.LUSD:
      return "/assets/icons/tokens/lusd.png";
    case TAssetName.OP:
      return "/assets/icons/chains/op.png";
    case TAssetName.SEAM:
      return "/assets/icons/tokens/seam.png";
    case TAssetName.USDBC:
      return "/assets/icons/tokens/usdbc.png";
    case TAssetName.WEETH:
      return "/assets/icons/tokens/weeth.png";
    case TAssetName.USDB:
      return "/assets/icons/tokens/usdb.png";
    case TAssetName.METIS:
      return "/assets/icons/tokens/metis.png";
    case TAssetName.MUSDC:
      return "/assets/icons/tokens/usdc.png";
    case TAssetName.MUSDT:
      return "/assets/icons/tokens/usdt.png";
    case TAssetName.MDAI:
      return "/assets/icons/tokens/dai.png";
    case TAssetName.WMNT:
      return "/assets/icons/tokens/mantle.png";
    case TAssetName.METH:
      return "/assets/icons/tokens/meth.png";
    case TAssetName.USDE:
      return "/assets/icons/tokens/usde.png";
    case TAssetName.FBTC:
      return "/assets/icons/tokens/fbtc.png";
    case TAssetName.WRSETH:
      return "/assets/icons/tokens/rseth.png";
    default:
      return "/assets/icons/tokens/yearn-v3.png";
  }
};
