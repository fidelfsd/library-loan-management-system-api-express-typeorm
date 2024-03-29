import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateLoansTable1707778696891 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "loans",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "loan_date",
                  type: "datetime",
               },
               {
                  name: "due_date",
                  type: "datetime",
               },
               {
                  name: "return_date",
                  type: "datetime",
                  isNullable: true,
               },
               {
                  name: "user_id",
                  type: "int",
               },
               {
                  name: "book_id",
                  type: "int",
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
               },
               {
                  columnNames: ["book_id"],
                  referencedTableName: "books",
                  referencedColumnNames: ["id"],
               },
            ],
            uniques: [
               new TableUnique({
                  name: "user_loandate_book_unique",
                  columnNames: ["user_id", "loan_date", "book_id"],
               }),
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("loans");
   }
}
