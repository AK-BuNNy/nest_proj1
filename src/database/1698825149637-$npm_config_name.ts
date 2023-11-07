import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class  $npmConfigName1698825149637 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'int',
          },
          {
            name: 'password',
            type: 'varchar',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}


export class ModifyIdColumn1698825149637 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id');
    await queryRunner.addColumn('users', new TableColumn({
      name: 'id',
      type: 'int',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'increment',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id');
    await queryRunner.addColumn('users', new TableColumn({
      name: 'id',
      type: 'int',
      isPrimary: true,
    }));
  }
}
