# frozen_string_literal: true

class R::ResearchersController < R::BaseController
  before_action :set_researcher, only: %i[show edit update destroy]
  skip_before_action :redirect_if_not_complete, only: %i[edit update]

  # GET /r
  def home
    @researcher = Current.user.researcher

    new_connections = @researcher.connections.accepted.order(updated_at: :desc).as_json
    in_progress_connections = @researcher.connections.active.order(updated_at: :desc).as_json

    props = {
      researcher: @researcher.as_json,
      studies: @researcher.studies.as_json,
      new_connections:,
      in_progress_connections:
    }

    render inertia: 'r/Researchers/home', props:
  end

  # GET /r/researchers/1
  def show
    render inertia: 'r/Researchers/show', props: { researcher: @researcher.as_json }
  end

  # GET /r/researchers/new
  def new
    @researcher = Researcher.new(user_id: params[:user_id])

    render inertia: 'r/Researchers/edit', props: { researcher: @researcher.as_json }
  end

  # GET /r/researchers/1/edit
  def edit
    return redirect_to "/r/researchers/#{params[:id]}" unless allowed_to?(:update?, @researcher)

    render inertia: 'r/Researchers/edit', props: { researcher: @researcher.as_json, is_complete: @researcher.complete? }
  end

  # PATCH/PUT /r/researchers/1
  def update
    return head :unauthorized unless allowed_to?(:update?, @researcher)

    headshot = researcher_params[:headshot]
    researcher_data = researcher_params.except(:headshot)

    if @researcher.update(researcher_data) && attach_headshot_if_present(headshot)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  # DELETE /r/researchers/1
  def destroy
    return head :unauthorized unless allowed_to?(:destroy?, @researcher)

    @researcher.destroy
    redirect_to researchers_url, notice: t.success, status: :see_other
  end

  private

  def attach_headshot_if_present(headshot)
    return true if headshot.blank?

    @researcher.headshot.attach(headshot)
  end

  def set_researcher
    @researcher = Researcher.find(params[:id])
  end

  def researcher_params
    params.fetch(:researcher).permit(
      :titles,
      :institution,
      :university_profile_url,
      :bio,
      :research_interests,
      :headshot
    )
  end
end
