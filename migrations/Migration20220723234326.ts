import { Migration } from '@mikro-orm/migrations';

export class Migration20220723234326 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "accounts" add column "account_type" varchar(255);');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "accounts" alter column "account_type" type jsonb using ("account_type"::jsonb);',
    );
  }
}
