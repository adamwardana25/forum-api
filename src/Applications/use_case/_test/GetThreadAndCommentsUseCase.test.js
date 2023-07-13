/* eslint-disable no-unused-vars */
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadAndCommentsUseCase = require('../GetThreadAndCommentsUseCase');

/* eslint-disable no-undef */
describe('GetThreadAndCommentsUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating get comments and thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const mockRegisteredThread = {
      id: 'thread-123',
      title: 'lorem',
      body: 'ipsum',
      date: '2023-06-24T01:18:42.366Z',
      username: 'dicoding',
    };

    const mockRegisteredComment1 = {
      id: 'comment-123',
      username: 'dicoding1',
      date: '2023-06-24T01:18:42.366Z',
      content: 'dolorem',
      is_delete: false,
    };

    const mockRegisteredComment2 = {
      id: 'comment-456',
      username: 'dicoding2',
      date: '2023-06-24T01:18:42.366Z',
      content: 'dolorem',
      is_delete: true,
    };

    const comments = [mockRegisteredComment1, mockRegisteredComment2];

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(comments));

    /** creating use case instance */
    const getThreadAndCommentsUseCase = new GetThreadAndCommentsUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const result = await getThreadAndCommentsUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.getThreadById)
      .toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId)
      .toBeCalledWith(useCasePayload.threadId);
    expect(result).toEqual({
      id: 'thread-123',
      title: 'lorem',
      body: 'ipsum',
      date: '2023-06-24T01:18:42.366Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding1',
          date: '2023-06-24T01:18:42.366Z',
          content: 'dolorem',
        },
        {
          id: 'comment-456',
          username: 'dicoding2',
          date: '2023-06-24T01:18:42.366Z',
          content: '**komentar telah dihapus**',
        },
      ],
    });
  });
});
