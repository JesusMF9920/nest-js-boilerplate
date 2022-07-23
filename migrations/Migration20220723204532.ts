import { Migration } from '@mikro-orm/migrations';

export class Migration20220723204532 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "accounts" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "salt" varchar(255) not null);',
    );
    this.addSql('alter table "accounts" add constraint "accounts_pkey" primary key ("id");');
  }
}
