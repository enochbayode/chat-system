// importing the required modules
const fetch = require("node-fetch");

// defining the utils class
class Utils {
  constructor() {
    // messages
    this.messages = {
      IMAGE_UPLOAD_ERROR: 'Please check your file(s) and try again',
      FILE_UPLOAD_ERROR: 'Please check your file(s) and try again',
      FILE_EXISTENCE_ERROR: 'Please check your file(s) and try again',
      DATA_ERROR: 'Some fields are empty',
      UPDATE_DATA_ERROR: 'You need to send over the required data',
      UPDATE_AFTER_VERIFICATION_ERROR: 'Cannot update name after verification',
      URL_ERROR: 'That URL is invalid',
      DUPLICATE_ERROR: 'Data provided is already in use',
      EMAIL_DUPLICATE_ERROR: 'Email provided is already in use',
      USERNAME_DUPLICATE_ERROR: 'Username provided is already in use',
      PHONE_NUMBER_DUPLICATE_ERROR: 'Phone number provided is already in use',
      USAGE_ERROR: 'That slug is already in use',
      ACCOUNT_EXISTENCE_ERROR: 'No account associated with that data',
      ACCOUNT_EXISTS_ERROR:'account exists already',
      EXISTENCE_ERROR: "We couldn't find what you requested",
      AUTHORIZATION_ERROR: "You aren't authorized for that action",
      VALIDATION_ERROR: 'please provide valid credentials',
      UNKNOWN_ERROR: 'Something completely went wrong',
      PASSWORD_MATCH_ERROR: "Your password doesn't match our records",
      CONFIRM_PASSWORD_ERROR:"passwords dont match",
      DATA_VALIDATION_ERROR: 'Invalid characters in data sent',
      BAD_DATA_ERROR: "You've got some errors in your sent data",
      INTEREST_DATA_ERROR: "You've got some errors in the interests data sent",
      LOGIN_SUCCESS: 'Sign In successful',
      ACCOUNT_UPDATE_SUCCESS: 'Account has been successfully updated',
      LOGOUT_SUCCESS: 'Sign Out successful',
      REGISTER_SUCCESS: 'Your account has been successfully created',
      REGISTER_FAILURE: 'unable to register user',
      INVALID_TOKEN_ERROR: 'Invalid authentication token provided',
      TOKEN_ERROR: 'Authentication token required',
      UPDATE_ERROR: 'You are not allowed to make that update',
      DOB_ERROR: 'The DOB data sent contains invalid data objects',
      PASSWORD_STRENGTH_ERROR: "Your password isn't strong enough",
      PASSWORD_RECOVERY_INITIATED:
        'A recovery OTP has been sent to your email address',
      PASSWORD_RECOVERY_SUCCESS:
        'Your password has been successfully recovered',
      OTP_ERROR: 'Invalid or expired OTP provided',
      QUERY_SUCCESS: 'Request data successfully queried',
      REQUEST_SUCCESS: 'Your request was successfully executed',
      COURSE_CREATE_SUCCESS: 'Your course has been published',
      OPERATION_DUPLICATE_ERROR: "You've already executed that action",
      FACEBOOK_LOGIN_ERROR: 'You need to login using Facebook',
      VERIFICATION_ERROR:'unable to verify user',
      TRANSACTION_ERROR:'unable to register transaction',
      TRANSACTION_SUCCESS:'wallet-funded',
      FUND_WALLET_ERROR:'unable to fund wallet',
      GOOGLE_LOGIN_ERROR: 'You need to login using Google',
      REGULAR_LOGIN_ERROR: 'You need to login using your email and password',
      ACCOUNT_DISABLED: 'Your account has been disabled.',
      DELETE_SUCCESS: 'Delete operation successful',
      CREATE_SUCCESS: 'Create operation successful',
      UPDATE_SUCCESS: 'Update operation successful',
      COUPON_EXISTENCE_ERROR: 'Invalid or expired coupon code',
      AGE_ERROR:'You are not up to the required age',
      COUPON_INACTIVE: 'That coupon is currently inactive',
      ACCOUNT_INACTIVE: 'That account is currently inactive',
      MAIL_SUCCESS: 'Your mail has been sent and is currently being delivered',
      PACKAGE_SUMMITED_SUCCESS: 'Request to send package submitted successfully',
      ITEM_FETCHED_SUCCESS: 'Items fetched successfully',
      ITEM_FETCHED_FAIL: 'Items not fetched',
      ITEM_EXISTENCE_ERROR: 'Item not found',
      NO_ORDER_FOUND: 'No order found',
      NO_MESSAGE: "No message available"
    };
  }

  /**
   *
   * @param {*} that JSON object
   * @returns {object} boolean whether the object is empty or not
   */
  isEmpty(that) {
    for (const key in that) {
      if (key) {
        return false;
      }
    }
  }

  /**
   * @description This is used to return the error or success message
   *
   * @param {*} message the error or success identifier
   * @returns {string} The corresponding error or success message
   */
  getMessage(message) {
    return this.messages[message] || message.toLowerCase();
  }

}

module.exports = {
    Utils,
};
