import { GithubIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const GithubAppLogin = (): JSX.Element => {
  // Logo and brand data
  const logoImages = [
    {
      src: "/group.png",
      alt: "Group",
      className: "relative w-[29.34px] h-[29.15px]",
    },
    {
      src: "/group-1.png",
      alt: "Group",
      className: "absolute w-[79px] h-[21px] top-0 left-0",
    },
    {
      src: "/vector-3.svg",
      alt: "Vector",
      className: "absolute w-4 h-[21px] top-0 left-[82px]",
    },
    {
      src: "/vector-1.svg",
      alt: "Vector",
      className: "w-3.5 h-[21px] left-[100px] absolute top-0",
    },
    {
      src: "/vector-2.svg",
      alt: "Vector",
      className: "w-4 h-[22px] left-[116px] absolute top-0",
    },
    {
      src: "/vector.svg",
      alt: "Vector",
      className: "w-[11px] h-[21px] left-[135px] absolute top-0",
    },
  ];

  return (
    <main className="flex flex-col h-[900px] items-center justify-center gap-6 p-10 relative">
      <Card className="w-96 border border-solid border-zinc-200 shadow-shadow-sm overflow-hidden">
        <CardContent className="flex flex-col items-center gap-6 p-6">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <img
              className={logoImages[0].className}
              alt={logoImages[0].alt}
              src={logoImages[0].src}
            />

            <div className="relative w-[145.85px] h-[21.64px]">
              {logoImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  className={image.className}
                  alt={image.alt}
                  src={image.src}
                />
              ))}
            </div>
          </div>

          {/* Heading and Subheading */}
          <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative self-stretch mt-[-1.00px] font-text-extra-large-leading-none-semibold font-[number:var(--text-extra-large-leading-none-semibold-font-weight)] text-zinc-950 text-[length:var(--text-extra-large-leading-none-semibold-font-size)] text-center tracking-[var(--text-extra-large-leading-none-semibold-letter-spacing)] leading-[var(--text-extra-large-leading-none-semibold-line-height)] [font-style:var(--text-extra-large-leading-none-semibold-font-style)]">
              GitHub Security Scan Setup
            </h1>

            <p className="relative self-stretch font-text-small-leading-normal-regular font-[number:var(--text-small-leading-normal-regular-font-weight)] text-zinc-500 text-[length:var(--text-small-leading-normal-regular-font-size)] text-center tracking-[var(--text-small-leading-normal-regular-letter-spacing)] leading-[var(--text-small-leading-normal-regular-line-height)] [font-style:var(--text-small-leading-normal-regular-font-style)]">
              Login to configure your workflows
            </p>
          </div>

          {/* Login Button */}
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <Button className="flex h-10 items-center justify-center gap-2 px-4 py-2 relative self-stretch w-full bg-[#5a2a82] rounded-md hover:bg-[#4a2268]">
              <GithubIcon className="w-4 h-4" />
              <span className="relative w-fit font-text-small-leading-normal-medium font-[number:var(--text-small-leading-normal-medium-font-weight)] text-neutral-50 text-[length:var(--text-small-leading-normal-medium-font-size)] tracking-[var(--text-small-leading-normal-medium-letter-spacing)] leading-[var(--text-small-leading-normal-medium-line-height)] whitespace-nowrap [font-style:var(--text-small-leading-normal-medium-font-style)]">
                Login with GitHub
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="flex w-96 items-center justify-center gap-2.5 relative flex-[0_0_auto]">
        <div className="relative w-[221px] mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-transparent text-xs text-center tracking-[0] leading-3">
          <span className="text-neutral-50 leading-[0.1px]">
            By clicking continue, you agree to our{" "}
          </span>

          <span className="text-neutral-50 leading-4 underline">
            Terms of Service
          </span>

          <span className="text-neutral-50 leading-[0.1px]"> and </span>

          <span className="text-neutral-50 leading-4 underline">
            Privacy Policy
          </span>

          <span className="text-neutral-50 leading-[0.1px]">&nbsp;</span>
        </div>
      </div>
    </main>
  );
};
