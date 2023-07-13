/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadAndCommentsUseCase = require('../../../../Applications/use_case/GetThreadAndCommentsUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const threadPayload = {
      title: request.payload.title,
      body: request.payload.body,
      owner: request.auth.credentials.id,
    };
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(threadPayload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadHandler(request, h) {
    const threadId = {
      threadId: request.params.threadId,
    };
    const getThreadAndCommentsUseCase = this._container.getInstance(GetThreadAndCommentsUseCase.name);
    const thread = await getThreadAndCommentsUseCase.execute(threadId);

    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
