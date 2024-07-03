import { PublicKey } from "@solana/web3.js";
import { ApplySystem } from "@magicblock-labs/bolt-sdk";

import { MagicBlockEngine } from "../engine/MagicBlockEngine";
import {
  SYSTEM_COMMAND_PROGRAM_ID,
  COMPONENT_GAME_PROGRAM_ID,
} from "./gamePrograms";

export async function gameSystemCommand(
  engine: MagicBlockEngine,
  entityPda: PublicKey,
  playerIndex: number,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  strengthPercent: number
) {
  const applySystem = await ApplySystem({
    authority: engine.getSessionPayer(),
    systemId: SYSTEM_COMMAND_PROGRAM_ID,
    entities: [
      {
        entity: entityPda,
        components: [
          {
            componentId: COMPONENT_GAME_PROGRAM_ID,
          },
        ],
      },
    ],
    args: {
      player_index: playerIndex,
      source_x: sourceX,
      source_y: sourceY,
      target_x: targetX,
      target_y: targetY,
      strength_percent: strengthPercent,
    },
  });
  await engine.processSessionEphemeralTransaction(
    "SystemCommand",
    applySystem.transaction
  );
}
