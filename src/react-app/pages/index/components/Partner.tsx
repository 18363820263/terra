import PartnerLogo from "./PartnerLogo";
import LogoVisa from "@/assets/imgs/partner/visa.png";
import LogoBlancBlock from "@/assets/imgs/partner/blanc-block.png";
import LogoHashKey from "@/assets/imgs/partner/hashkey-global.png";
import LogoTrubit from "@/assets/imgs/partner/tru-bit.svg";
import LogoOCBC from "@/assets/imgs/partner/ocbc.png";
import LogoBOC from "@/assets/imgs/partner/boc-hk.png";
import LogoMastercard from "@/assets/imgs/partner/mastercard.png";
import LogoHexPay from "@/assets/imgs/partner/hexpay.png";
import LogoCobo from "@/assets/imgs/partner/cobo.svg";

export function Partner() {
  return (
    <div className="relative">
      {/* First row - scroll right */}
      <div className="flex items-center gap-6 overflow-hidden pb-4 whitespace-nowrap">
        <div className="animate-scroll-right flex items-center gap-6">
          <PartnerLogo icon={LogoVisa} />
          <PartnerLogo icon={LogoBlancBlock} />
          <PartnerLogo icon={LogoHashKey} />
          <PartnerLogo icon={LogoTrubit} />
          <PartnerLogo icon={LogoOCBC} />
          <PartnerLogo icon={LogoBOC} />
          <PartnerLogo icon={LogoCobo} />
          <PartnerLogo icon={LogoMastercard} />
          {/* Duplicate logos for seamless scrolling */}
          <PartnerLogo icon={LogoVisa} />
          <PartnerLogo icon={LogoBlancBlock} />
          <PartnerLogo icon={LogoHashKey} />
          <PartnerLogo icon={LogoTrubit} />
          <PartnerLogo icon={LogoOCBC} />
          <PartnerLogo icon={LogoBOC} />
          <PartnerLogo icon={LogoCobo} />
          <PartnerLogo icon={LogoMastercard} />
        </div>
      </div>
      {/* Second row - scroll left */}
      <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
        <div className="animate-scroll-left flex items-center gap-6">
          <PartnerLogo icon={LogoHashKey} />
          <PartnerLogo icon={LogoOCBC} />
          <PartnerLogo icon={LogoBOC} />
          <PartnerLogo icon={LogoCobo} />
          <PartnerLogo icon={LogoMastercard} />
          <PartnerLogo icon={LogoHexPay} />
          <PartnerLogo icon={LogoBlancBlock} />
          <PartnerLogo icon={LogoVisa} />
          {/* Duplicate logos for seamless scrolling */}
          <PartnerLogo icon={LogoHashKey} />
          <PartnerLogo icon={LogoOCBC} />
          <PartnerLogo icon={LogoBOC} />
          <PartnerLogo icon={LogoCobo} />
          <PartnerLogo icon={LogoMastercard} />
          <PartnerLogo icon={LogoHexPay} />
          <PartnerLogo icon={LogoBlancBlock} />
          <PartnerLogo icon={LogoVisa} />
        </div>
      </div>
      

    </div>
  );
}