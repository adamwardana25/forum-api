/* eslint-disable no-undef */
const RegisterComment = require('../../../Domains/comments/entites/RegisterComment');
const RegisteredComment = require('../../../Domains/comments/entites/RegisteredComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('shoud orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'dolorem',
      owner: 'user-123',
      threadId: 'thread-123',
      date: '2023-06-24T01:18:42.366Z',
    };

    const mockRegisteredComment = new RegisteredComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve(useCasePayload.threadId));
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredComment));

    /** creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const registeredComment = await getCommentUseCase.execute(useCasePayload);

    // Assert
    expect(registeredComment).toStrictEqual(new RegisteredComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    }));

    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(new RegisterComment({
      content: useCasePayload.content,
      owner: useCasePayload.owner,
      threadId: 'thread-123',
    }));
  });
});
