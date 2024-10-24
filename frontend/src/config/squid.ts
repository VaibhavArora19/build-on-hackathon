import { SQUID_BASE_URL } from "@/constants";
import { Squid } from "@0xsquid/sdk";

export const squidConfig = async () => {
  const squid = new Squid({
    baseUrl: SQUID_BASE_URL,
    integratorId: process.env.NEXT_PUBLIC_SQUID_INTEGRATOR_ID as string,
    executionSettings: {
      infiniteApproval: false,
    },
  });

  await squid.init();

  return squid;
};
