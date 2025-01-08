import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BooksTable1736342500739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "publication_date",
            type: "date",
          },
          {
            name: "isbn",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "page_count",
            type: "int",
          },
          {
            name: "language",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books");
  }
}
