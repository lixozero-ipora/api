/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1623626684187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'social_name', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'city', type: 'varchar' },
          { name: 'cep', type: 'varchar' },
          { name: 'phone_number', type: 'varchar' },
          { name: 'is_deactivated', type: 'boolean' },
          { name: 'created_at', type: 'timestamps' },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
