/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
class GetThreadAndCommentsUseCase {
  constructor({ threadRepository, commentRepository }) {
    this.threadRepository = threadRepository;
    this.commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;

    const thread = await this.threadRepository.getThreadById(threadId);

    const comments = await this.commentRepository.getCommentsByThreadId(threadId);

    const modifiedComments = comments.map((comment) => {
      const { is_delete, ...rest } = comment;
      const content = is_delete ? '**komentar telah dihapus**' : comment.content;
      return {
        ...rest,
        content,
      };
    });

    thread.comments = modifiedComments;
    return thread;
  }
}

module.exports = GetThreadAndCommentsUseCase;
