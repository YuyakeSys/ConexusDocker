# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      render json: { message: 'Instructions have been sent to your email.' }, status: :ok
    else
      render json: resource.errors, status: :unprocessable_entity
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  def update
  self.resource = resource_class.reset_password_by_token(update_params)

  if resource.errors.empty?
    resource.unlock_access! if unlockable?(resource)
    if Devise.sign_in_after_reset_password
      sign_in(resource_name, resource)
      render json: { message: 'Password updated successfully.' }, status: :ok
    else
      render json: { message: 'Password updated but not signed in.' }, status: :ok
    end
  else
    set_minimum_password_length
    render json: resource.errors, status: :unprocessable_entity
  end
end
  
  private

  def update_params
    params.permit(:password, :password_confirmation, :reset_password_token)
  end

  def resource_params
    params.require(:user).permit(:email)
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

end
