import { TProtocolName } from "@/types/protocol";

export const protocolNameToImage = (name: TProtocolName) => {
  switch (name.toLowerCase()) {
    case TProtocolName.AAVE:
      return "/assets/icons/protocols/aave.png";
    case TProtocolName.COMPOUND:
      return "/assets/icons/protocols/compound.png";
    case TProtocolName.Balancer:
      return "/assets/icons/protocols/balancer.png";
    case TProtocolName.NILE:
      return "/assets/icons/protocols/nile.png";
    case TProtocolName.HOP:
      return "/assets/icons/protocols/hop.webp";
    case TProtocolName.HOPBEEFY:
      return "/assets/icons/protocols/hop.webp";
    case TProtocolName.BEEFY:
      return "/assets/icons/protocols/beefy.png";
    case TProtocolName.SEAMLESS:
      return "/assets/icons/tokens/seam.png";
    case TProtocolName.ZEROLEND:
      return "/assets/icons/protocols/zerolend.svg";
    case TProtocolName.YEARN_V3:
      return "/assets/icons/protocols/yearn-v3.jpeg";
    case TProtocolName.PENDLE:
      return "/assets/icons/protocols/pendle.png";
    case TProtocolName.HARVEST_FINANCE:
      return "/assets/icons/protocols/harvest.png";
    case TProtocolName.YEARN:
      return "/assets/icons/protocols/yearn-v3.jpeg";
    case TProtocolName.STARGATE:
      return "/assets/icons/protocols/stargate.png";
    case TProtocolName.BENQI:
      return "/assets/icons/protocols/benqi.png";
    case TProtocolName.LENDLE:
      return "/assets/icons/protocols/lendle.png";
    default:
      return "";
  }
};
