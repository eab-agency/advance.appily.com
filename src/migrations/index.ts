import * as migration_20250115_192723_migration from './20250115_192723_migration';

export const migrations = [
  {
    up: migration_20250115_192723_migration.up,
    down: migration_20250115_192723_migration.down,
    name: '20250115_192723_migration'
  },
];
