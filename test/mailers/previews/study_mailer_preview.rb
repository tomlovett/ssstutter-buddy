# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/study_mailer
class StudyMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/study_mailer/verify_active_warning
  def verify_active_warning
    study = Study.find_by(id: 1) || FactoryBot.create(:study, :active, id: 1)
    researcher = study.researcher

    # Ensure last_verified_active is set for the auto_close_date calculation
    study.update_column(:last_verified_active, 35.days.ago) if study.last_verified_active.nil?

    StudyMailer.with(study:, researcher:).verify_active_warning
  end

  # Preview this email at http://localhost:3000/rails/mailers/study_mailer/verify_active_final_warning
  def verify_active_final_warning
    study = Study.find_by(id: 1) || FactoryBot.create(:study, :active, id: 1)
    researcher = study.researcher

    # Ensure last_verified_active is set for the auto_close_date calculation
    study.update_column(:last_verified_active, 48.days.ago) if study.last_verified_active.nil?

    StudyMailer.with(study:, researcher:).verify_active_final_warning
  end
end
