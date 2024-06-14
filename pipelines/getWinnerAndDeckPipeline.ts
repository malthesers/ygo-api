import { PipelineStage } from 'mongoose'
import { WinnerStr } from '../interfaces/event'

/**
 * Set of pipeline operations to fetch data for a winner including player, deck and deckType data.
 *
 * @param winner 'winner', 'winner2' or 'winner3' in a string indicating which field to populate.
 * @returns An array of pipeline stages for populating the player, deck and deck.deckType of a winner.
 */
export default function getWinnerAndDeckPipeline(winner: WinnerStr): PipelineStage[] {
  return [
    { $lookup: { from: 'players', localField: `${winner}.player`, foreignField: '_id', as: `${winner}.player` } },
    { $unwind: { path: `$${winner}.player`, preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'decks', localField: `${winner}.deck`, foreignField: '_id', as: `${winner}.deck` } },
    { $unwind: { path: `$${winner}.deck`, preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'decktypes',
        localField: `${winner}.deck.deckType`,
        foreignField: '_id',
        as: `${winner}.deckType`,
      },
    },
    { $addFields: { [`${winner}.deck.deckType`]: `$${winner}.deckType` } },
    { $unwind: { path: `$${winner}.deck.deckType`, preserveNullAndEmptyArrays: true } },
    { $project: { [`${winner}.deckType`]: 0 } },
  ]
}
