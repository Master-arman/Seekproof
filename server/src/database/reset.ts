import { runRollback } from './rollback';
import { runMigrations } from './migrate';
import { runSeeds } from './seed';

async function resetDatabase() {
  console.log('🔄 ==========================================');
  console.log('🔄 [SeekProof Reset] Starting Full Database Reset');
  console.log('🔄 ==========================================');

  try {
    console.log('\n--- Step 1: Rolling back database ---');
    await runRollback();

    console.log('\n--- Step 2: Executing migrations ---');
    await runMigrations();

    console.log('\n--- Step 3: Seeding initial data ---');
    await runSeeds();

    console.log('\n🎉 [SeekProof Reset] Complete database reset and re-seed finished successfully!');
  } catch (error: any) {
    console.error('❌ [SeekProof Reset] Database reset failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  resetDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
