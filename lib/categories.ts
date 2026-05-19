export const categories = [
  { id: 'all', name: 'All', slug: 'all' },
  { id: 'bedding', name: 'Bedding', slug: 'bedding' },
  { id: 'bathrobes', name: 'Bathrobes', slug: 'bathrobes' },
  { id: 'toiletries', name: 'Toiletries', slug: 'toiletries' },
  { id: 'candles', name: 'Candles', slug: 'candles' },
  { id: 'minibar', name: 'Minibar', slug: 'minibar' },
  { id: 'pillows', name: 'Pillows', slug: 'pillows' },
] as const;

export type CategoryId = typeof categories[number]['id'];
