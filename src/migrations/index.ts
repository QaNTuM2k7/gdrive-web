import * as migration_20261023_202637_initial from './20261023_202637_initial';

export const migrations = [
  {
    up: migration_20261023_202637_initial.up,
    down: migration_20261023_202637_initial.down,
    name: '20261023_202637_initial'
  },
];
