import { PipelineStage } from 'mongoose'

/**
 * Set of pipeline operations to fetch data .
 *
 * @returns An array of pipeline stages for p.
 */
export default function getMostPopularCards(): PipelineStage[] {
  return [{ $match: { decklist: { $exists: true } } }]
}
