import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { NEETVideo } from "./NEETVideo";
import { NEETVideoSchema, estimateTotalDuration } from "./schema";
import { photoelectricEffect } from "./data/example-photoelectric";
import { nandGateShort } from "./data/example-nand-short";
import { raoultLaw } from "./data/example-raoult-law";

const FPS = 30;

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
            photoelectricEffect.scenes,
            FPS
          )}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={photoelectricEffect}
        />

        {/* Long-form: Raoult's Law (Chemistry) */}
        <Composition
          id="Raoult-Law"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(raoultLaw.scenes, FPS)}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={raoultLaw}
        />

        {/* Short-form: NAND Gate Hack */}
        <Composition
          id="NAND-Gate-Short"
          component={NEETVideo}
          schema={NEETVideoSchema}
          durationInFrames={estimateTotalDuration(
            nandGateShort.scenes,
            FPS
          )}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={nandGateShort}
        />
      </Folder>

      {/* ─── Original Demo ────────────────────────── */}
      <Folder name="Demo">
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
      </Folder>
    </>
  );
};
