/* eslint-disable no-underscore-dangle */
const RegisterComment = require('../../Domains/comments/entites/RegisterComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const registerComment = new RegisterComment(useCasePayload);
    await this._threadRepository.verifyAvailableThread(registerComment.threadId);
    return this._commentRepository.addComment(registerComment);
  }
}

module.exports = AddCommentUseCase;
