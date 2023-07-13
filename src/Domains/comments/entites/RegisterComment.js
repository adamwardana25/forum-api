/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class RegisterComment {
  constructor(payload) {
    this._veryfyPayload(payload);

    const { content, owner, threadId } = payload;

    this.content = content;
    this.owner = owner;
    this.threadId = threadId;
  }

  _veryfyPayload({ content, owner, threadId }) {
    if (!content || !owner || !threadId) {
      throw new Error('REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof owner !== 'string' || typeof threadId !== 'string') {
      throw new Error('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterComment;
