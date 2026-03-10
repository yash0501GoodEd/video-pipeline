import "./index.css";
import { Composition, Folder } from "remotion";
// import { HelloWorld } from "./HelloWorld";
// import { Logo } from "./HelloWorld/Logo";
import { NEETVideo } from "./NEETVideo";
import { NEETVideoSchema, estimateTotalDuration } from "./schema";
import { photoelectricEffect } from "./data/example-photoelectric";
import { nandGateShort } from "./data/example-nand-short";
import { raoultLaw } from "./data/example-raoult-law";
import { bioGiftZiftShort } from "./data/example-gift-zift-short";
import { neetpgCarpalTunnelShort } from "./data/neetpg-carpal-tunnel-short";
import { neetpgCarpalTunnelLong } from "./data/neetpg-carpal-tunnel-long";

const FPS = 30;

// Run all configs through the schema parser so that Zod's .default()
// values are applied before being passed to Remotion Studio's Schema
// Editor. Without this, optional/missing string fields are `undefined`
// which causes the "Cannot read properties of undefined (reading
// 'startsWith')" crash in ZodSwitch.js.
const parsedPhotoelectric = NEETVideoSchema.parse(photoelectricEffect);
const parsedNandShort = NEETVideoSchema.parse(nandGateShort);
const parsedRaoultLaw = NEETVideoSchema.parse(raoultLaw);
const parsedBioGiftZift = NEETVideoSchema.parse(bioGiftZiftShort);
const parsedCarpalShort = NEETVideoSchema.parse(neetpgCarpalTunnelShort);
const parsedCarpalLong = NEETVideoSchema.parse(neetpgCarpalTunnelLong);

// const FPS = 30;

export const RemotionRoot = () => {
  return (
    <>
      {/* ─── NEET Video Templates ─────────────────── */}
      <Folder name="NEET-Videos">
        {/* Long-form: Photoelectric Effect */}
        <Composition
          id="Photoelectric-Effect"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            parsedPhotoelectric.scenes,
            FPS
          )}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={parsedPhotoelectric}
        />

        {/* Long-form: Raoult's Law (Chemistry) */}
        <Composition
          id="Raoult-Law"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(parsedRaoultLaw.scenes, FPS)}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={parsedRaoultLaw}
        />

        {/* Short-form: NAND Gate Hack */}
        <Composition
          id="NAND-Gate-Short"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            parsedNandShort.scenes,
            FPS
          )}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={parsedNandShort}
        />

        {/* Short-form: GIFT vs ZIFT (Biology) */}
        <Composition
          id="GIFT-ZIFT-Short"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            parsedBioGiftZift.scenes,
            FPS
          )}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={parsedBioGiftZift}
        />
      </Folder>

      {/* ─── NEET PG Question Explanations ────────── */}
      <Folder name="NEET-PG">
        {/* Short-form: Carpal Tunnel Syndrome */}
        <Composition
          id="CTS-Short"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            parsedCarpalShort.scenes,
            FPS
          )}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={parsedCarpalShort}
        />

        {/* Long-form: Carpal Tunnel Syndrome — Complete Analysis */}
        <Composition
          id="CTS-Long"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            parsedCarpalLong.scenes,
            FPS
          )}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={parsedCarpalLong}
        />
      </Folder>

      {/* ─── Original Demo ────────────────────────── */}
      {/* <Folder name="Demo">
        <Composition
          id="HelloWorld"
          component={HelloWorld}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "black",
          }}
        />
        <Composition
          id="OnlyLogo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder> */}
    </>
  );
};
