import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserProfilesTable1699298695049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: `increment`,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'alt_email',
            type: 'varchar',
          },
          {
            name: 'parent_name',
            type: 'varchar',
          },
          {
            name: 'school_name',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female', 'others'],
            enumName: 'genderEnum',
            default: 'male',
          },
        ],
      }),
    );
    await queryRunner.query(
      'ALTER TABLE user_profiles ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_profiles');
  }
}
