"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield database_1.default.schema.hasTable("folders"))) {
            yield database_1.default.schema.createTable("folders", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.uuid("owner_id").notNullable();
                table.string("name").notNullable();
                table.dateTime("date_created").notNullable();
                table.dateTime("date_modified").notNullable();
                table.string("color").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("pages"))) {
            yield database_1.default.schema.createTable("pages", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.string("title").notNullable();
                table.uuid("owner_id").notNullable();
                table.uuid("study_pack_id").notNullable();
                table.specificType("ordering", "text []").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("blocks"))) {
            yield database_1.default.schema.createTable("blocks", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.string("draft_key").notNullable();
                table.text("content", "TEXT").notNullable();
                table.string("owner_id").notNullable();
                table.uuid("parent_id").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("users"))) {
            yield database_1.default.schema.createTable("users", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.string("email_address").notNullable().unique();
                table.string("password").notNullable();
                table.string("first_name").notNullable();
                table.string("last_name").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("binders"))) {
            yield database_1.default.schema.createTable("binders", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.uuid("owner_id").notNullable();
                table.uuid("folder_id").notNullable();
                table.string("name").notNullable();
                table.dateTime("date_created").notNullable();
                table.dateTime("date_modified").notNullable();
                table.string("color").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("study_packs"))) {
            yield database_1.default.schema.createTable("study_packs", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.uuid("owner_id").notNullable();
                table.uuid("binder_id").notNullable();
                table.string("name").notNullable();
                table.dateTime("date_created").notNullable();
                table.dateTime("date_modified").notNullable();
                table.string("color").notNullable();
            });
        }
        if (!(yield database_1.default.schema.hasTable("flashcards"))) {
            yield database_1.default.schema.createTable("flashcards", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .unique()
                    .defaultTo(database_1.default.raw("uuid_generate_v4()"));
                table.uuid("owner_id").notNullable();
                table.uuid("study_pack_id").notNullable();
                table.specificType("back_ordering", "text []");
                table.specificType("front_ordering", "text []");
                table.dateTime("date_created").notNullable();
                table.dateTime("date_modified").notNullable();
                table.string("block_link");
            });
        }
    });
}
createTables();
exports.default = createTables;
