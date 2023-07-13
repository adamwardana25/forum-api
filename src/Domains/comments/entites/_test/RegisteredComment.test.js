/* eslint-disable no-undef */
const RegisteredComment = require('../RegisteredComment');

describe('a RegisteredComment', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const paylod = {
      content: 'dolorem',
    };

    // Action and Assert
    expect(() => new RegisteredComment(paylod)).toThrowError('REGISTERED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did ot meet data type specification', () => {
    // Arrange
    const payload = {
      id: {},
      content: true,
      owner: ['user-123'],
    };

    // Action and Assert
    expect(() => new RegisteredComment(payload)).toThrowError('REGISTERED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create registeredThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'dolorem',
      owner: 'owner-123',
    };

    // Action
    const registeredComment = new RegisteredComment(payload);

    // Assert
    expect(registeredComment.id).toEqual(payload.id);
    expect(registeredComment.content).toEqual(payload.content);
    expect(registeredComment.owner).toEqual(payload.owner);
  });
});
