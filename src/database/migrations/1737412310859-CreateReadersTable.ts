import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReadersTable1737412310859 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "readers",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "birthdate",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: true,
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
        await queryRunner.dropTable("readers");
    }
}