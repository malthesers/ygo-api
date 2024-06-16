import { PipelineStage } from 'mongoose'

/**
 * Set of pipeline operations to fetch data for the most popular deck types.
 * Groups decks by type, sorts by amount and includes a count property for number of occurences.
 */
const mostPopularDeckTypesPipeline: PipelineStage[] = [
  { $group: { _id: '$deckType', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $lookup: { from: 'decktypes', localField: '_id', foreignField: '_id', as: 'deckType' } },
  {
    $lookup: {
      from: 'decks',
      let: { deckTypeId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$deckType', '$$deckTypeId'] } } },
        { $sort: { placement: 1 } },
        { $limit: 1 },
        { $lookup: { from: 'events', localField: 'event', foreignField: '_id', as: 'event' } },
        { $lookup: { from: 'players', localField: 'player', foreignField: '_id', as: 'player' } },
        { $addFields: { event: { $arrayElemAt: ['$event', 0] }, player: { $arrayElemAt: ['$player', 0] } } },
      ],
      as: 'mostSuccessful',
    },
  },
  {
    $project: {
      _id: 0,
      count: 1,
      deckType: { $arrayElemAt: ['$deckType', 0] },
      mostSuccessful: { $arrayElemAt: ['$mostSuccessful', 0] },
    },
  },
]

export default mostPopularDeckTypesPipeline
