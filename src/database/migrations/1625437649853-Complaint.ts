/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

/**
 * Data types in NoSQL pattern.
 * If changes to an SQL consider changing here and in model the Data Types
 */

export class Complaint1625437649853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
          },
          {
            name: 'latitude',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'occurrences',
            type: 'integer',
            isNullable: false,
            default: 1,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('complaints')
  }
}
