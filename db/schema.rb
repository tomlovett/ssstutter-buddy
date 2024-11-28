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

ActiveRecord::Schema[7.0].define(version: 2024_10_03_002706) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "participants", force: :cascade do |t|
    t.string "codename"
    t.string "country"
    t.date "birthdate"
    t.string "gender"
    t.string "handedness"
    t.string "etiology"
    t.boolean "default_reveal", default: false, null: false
    t.float "default_distance", default: 50.0
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.string "state"
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

  create_table "studies", force: :cascade do |t|
    t.string "title"
    t.text "short_desc"
    t.text "long_desc"
    t.date "open_date"
    t.date "close_date"
    t.string "study_type"
    t.integer "min_age"
    t.integer "max_age"
    t.string "country"
    t.float "total_hours"
    t.integer "total_sessions"
    t.string "duration"
    t.string "follow_up"
    t.integer "remuneration"
    t.integer "primary_researcher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city"
    t.string "state"
    t.index ["primary_researcher_id"], name: "index_studies_on_primary_researcher_id"
  end

  create_table "study_participations", force: :cascade do |t|
    t.datetime "not_interested"
    t.datetime "registered"
    t.datetime "invited"
    t.string "invitation_response"
    t.boolean "no_show", default: false, null: false
    t.boolean "completed", default: false, null: false
    t.integer "participant_rating"
    t.integer "study_id", null: false
    t.integer "participant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["participant_id"], name: "index_study_participations_on_participant_id"
    t.index ["study_id"], name: "index_study_participations_on_study_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "participants", "users"
  add_foreign_key "researchers", "users"
  add_foreign_key "study_participations", "participants"
  add_foreign_key "study_participations", "studies"
end
