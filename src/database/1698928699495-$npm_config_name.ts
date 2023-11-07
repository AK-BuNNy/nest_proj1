import {MigrationInterface, QueryRunner, Table } from "typeorm"

export class  $npmConfigName1698928699495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'prod_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'prod_name',
            type: 'varchar',
          },
          {
            name: 'prod_description',
            type: 'varchar',
          },
          {
            name: 'prod_price',
            type: 'int',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
