import * as migration_20250115_192723_migration from './20250115_192723_migration';
import * as migration_20250116_210226_migration from './20250116_210226_migration';
import * as migration_20250116_210528_migration from './20250116_210528_migration';
import * as migration_20250116_211302_migration from './20250116_211302_migration';

export const migrations = [
  {
    up: migration_20250115_192723_migration.up,
    down: migration_20250115_192723_migration.down,
    name: '20250115_192723_migration',
  },
  {
    up: migration_20250116_210226_migration.up,
    down: migration_20250116_210226_migration.down,
    name: '20250116_210226_migration',
  },
  {
    up: migration_20250116_210528_migration.up,
    down: migration_20250116_210528_migration.down,
    name: '20250116_210528_migration',
  },
  {
    up: migration_20250116_211302_migration.up,
    down: migration_20250116_211302_migration.down,
    name: '20250116_211302_migration'
  },
];
