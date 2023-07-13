/* eslint-disable no-undef */
const RegisterComment = require('../RegisterComment');

describe('a RegisterComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'dolorem',
    };

    // Action and Assert
    expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
      owner: [],
      threadId: true,
    };

    // Action and Assert
    expect(() => new RegisterComment(payload)).toThrowError('REGISTER_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registerComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'dolorem',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    // Action
    const { content, threadId, owner } = new RegisterComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(threadId).toEqual(payload.threadId);
  });
});
