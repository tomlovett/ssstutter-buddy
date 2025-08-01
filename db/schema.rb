# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_01_023240) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "connections", force: :cascade do |t|
    t.integer "participant_rating"
    t.integer "study_id", null: false
    t.integer "participant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pin", default: ""
    t.string "status", default: "connected"
    t.text "participant_feedback"
    t.index ["participant_id"], name: "index_connections_on_participant_id"
    t.index ["study_id"], name: "index_connections_on_study_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "participant_id", null: false
    t.bigint "study_id", null: false
    t.string "status", default: "invited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "status_explanation"
    t.index ["participant_id", "study_id"], name: "index_invitations_on_participant_id_and_study_id", unique: true
    t.index ["participant_id"], name: "index_invitations_on_participant_id"
    t.index ["study_id"], name: "index_invitations_on_study_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "country"
    t.string "state"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.integer "priority", default: 0
    t.bigint "participant_id"
    t.bigint "study_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["participant_id"], name: "index_locations_on_participant_id"
    t.index ["study_id"], name: "index_locations_on_study_id"
  end

  create_table "participants", force: :cascade do |t|
    t.string "codename"
    t.date "birthdate"
    t.string "gender"
    t.string "handedness"
    t.string "etiology"
    t.boolean "default_reveal", default: false, null: false
    t.float "default_distance", default: 50.0
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "weekly_digest_opt_out", default: false, null: false
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "researchers", force: :cascade do |t|
    t.string "university_profile_url"
    t.text "bio"
    t.string "research_interests"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "institution"
    t.string "titles"
    t.index ["user_id"], name: "index_researchers_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "studies", force: :cascade do |t|
    t.string "title"
    t.text "short_desc"
    t.text "long_desc"
    t.date "open_date"
    t.date "close_date"
    t.string "methodologies"
    t.integer "min_age"
    t.integer "max_age"
    t.float "total_hours"
    t.integer "total_sessions"
    t.string "duration"
    t.string "follow_up"
    t.integer "remuneration"
    t.integer "researcher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "digital_only", default: false, null: false
    t.boolean "digital_friendly", default: false, null: false
    t.datetime "paused_at"
    t.datetime "published_at"
    t.datetime "closed_at"
    t.text "autosend_url"
    t.text "autosend_message"
    t.string "location_type", default: "in_person"
    t.index ["researcher_id"], name: "index_studies_on_researcher_id"
  end

  create_table "user_invitations", force: :cascade do |t|
    t.string "email", null: false
    t.bigint "invited_by_id", null: false
    t.datetime "accepted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_user_invitations_on_email", unique: true
    t.index ["invited_by_id"], name: "index_user_invitations_on_invited_by_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "activation_pin"
    t.datetime "confirmed_at"
    t.datetime "email_verified_at"
    t.boolean "digest_opt_out", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "connections", "participants"
  add_foreign_key "connections", "studies"
  add_foreign_key "invitations", "participants"
  add_foreign_key "invitations", "studies"
  add_foreign_key "locations", "participants"
  add_foreign_key "locations", "studies"
  add_foreign_key "participants", "users"
  add_foreign_key "researchers", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "user_invitations", "users", column: "invited_by_id"
end
