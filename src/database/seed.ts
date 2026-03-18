import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOne({ where: { email: 'john@example.com' } });
  if (!existing) {
    const hashed = await bcrypt.hash('password123', 10);
    const user = userRepo.create({ email: 'john@example.com', password: hashed });
    await userRepo.save(user);
    console.log('✅ Seeder complete: john@example.com / password123');
  } else {
    console.log('ℹ️ User already exists, skipping seed.');
  }

  await AppDataSource.destroy();
}

seed().catch(console.error);