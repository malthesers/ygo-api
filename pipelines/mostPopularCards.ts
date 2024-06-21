import { PipelineStage } from 'mongoose'

/**
 * Set of pipeline operations to fetch data for the most popular cards.
 * Combines main, extra and side deck as well as cards appearing multiple places.
 * Counts amount of decks each unique card appears in and populates with card info.
 * Sorts cards in descending order with most popular first.
 */
const mostPopularCardsPipeline: PipelineStage[] = [
  { $match: { decklist: { $exists: true } } },
  {
    $group: {
      _id: null,
      totalDecks: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: 'decks',
      let: { totalDecks: '$totalDecks' },
      pipeline: [
        { $match: { decklist: { $exists: true } } },
        {
          $project: {
            allCards: {
              $concatArrays: ['$decklist.mainDeck', '$decklist.extraDeck', '$decklist.sideDeck'],
            },
          },
        },
        { $unwind: '$allCards' },
        {
          $group: {
            _id: {
              card: '$allCards.card',
              deck: '$_id',
            },
            count: { $sum: '$allCards.count' },
          },
        },
        {
          $group: {
            _id: '$_id.card',
            deckCount: { $sum: 1 },
            totalCount: { $sum: '$count' },
          },
        },
        {
          $lookup: {
            from: 'cards',
            localField: '_id',
            foreignField: '_id',
            as: 'details',
          },
        },
        { $unwind: '$details' },
        {
          $sort: {
            deckCount: -1,
            totalCount: -1,
          },
        },
        {
          $project: {
            _id: 0,
            details: '$details',
            deckCount: '$deckCount',
            totalCount: '$totalCount',
          },
        },
        {
          $addFields: {
            percentage: {
              $multiply: [{ $divide: ['$deckCount', '$$totalDecks'] }, 100],
            },
          },
        },
      ],
      as: 'cards',
    },
  },
  {
    $unwind: '$cards',
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ['$cards', { totalDecks: '$totalDecks' }],
      },
    },
  },
]
export default mostPopularCardsPipeline
